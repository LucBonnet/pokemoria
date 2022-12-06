import React from "react";
import { Platform, View, Text, Vibration } from "react-native";
import styles from "../styles";
import Botao from "../components/Botao";
import Card from "../components/Card";
import Vitoria from "../components/Vitoria";

import { db } from "../config";

export default class Jogo extends React.Component {
    constructor(props) {
        super(props);

        this.pokemons = [];
        this.p1 = null;
        this.p2 = null;
        this.pontuacao = 0;
        this.timer = null;
        this.usuarioId = this.props.route.params.usuarioId;
        this.usuario = this.props.route.params.usuario;

        this.cardsRef = [];
        for (let i = 0; i < 20; i++) {
            this.cardsRef.push(React.createRef());
        }
        this.state = {
            cards: [],
            venceu: false,
            time: { m: 0, s: 0 },
        };
    }

    componentDidMount() {
        this.reset();
    }

    reset() {
        this.pokemons = [];
        this.p1 = null;
        this.p2 = null;
        this.pontuacao = 0;

        let cards = this.state.cards;
        cards.forEach((card, index) => {
            if (!card.hidden) this.cardsRef[index].current.flip();
        });

        this.setState({
            cards: cards,
            venceu: false,
            time: { m: 0, s: 0 },
        });

        if (this.timer) clearInterval(this.timer);
        this.timer = null;

        for (let i = 0; i < 10; i++) {
            let id = 0;
            do {
                id = Math.floor(Math.random() * 150 + 1);
            } while (this.pokemons.find((p) => p.id == id));
            let p = {
                id: id,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
            this.pokemons[i] = p;
        }

        setTimeout(() => {
            this.setPokemons();
        }, 200);
    }

    setPokemons() {
        let cards = [];
        this.pokemons.forEach((pokemon) => {
            let pos = -1;
            do {
                pos = Math.floor(Math.random() * 20);
            } while (cards[pos] != undefined);

            cards[pos] = { ...pokemon, hidden: true };

            pos = -1;
            do {
                pos = Math.floor(Math.random() * 20);
            } while (cards[pos] != undefined);

            cards[pos] = { ...pokemon, hidden: true };
        });

        this.setState({
            cards: cards,
            venceu: false,
        });
    }

    startTimer() {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    stopTimer() {
        if (this.timer) clearInterval(this.timer);
    }

    tick() {
        const state = this.state;
        const time = state.time;
        time.s++;
        if (time.s == 60) {
            time.s = 0;
            time.m++;
        }
        this.setState(state);
    }

    cardPressed(id, pos) {
        let cards = this.state.cards;

        if (!this.timer) this.startTimer();

        if (!cards[pos].hidden) return;

        cards[pos].hidden = false;

        if (this.p1 == null) {
            this.p1 = { id, pos };
            this.cardsRef[pos].current.flip();
        } else {
            this.cardsRef[pos].current.flip();
            this.p2 = { id, pos };
            if (this.p1.id != this.p2.id) {
                const card1 = this.cardsRef[this.p1.pos].current;
                const card2 = this.cardsRef[this.p2.pos].current;

                cards[this.p1.pos].hidden = true;
                cards[this.p2.pos].hidden = true;

                setTimeout(() => {
                    card1.flip();
                    card2.flip();
                }, 700);

                Vibration.vibrate(750)
            } else {
                cards[this.p1.pos].hidden = false;
                cards[this.p2.pos].hidden = false;

                this.pontuacao++;
            }

            this.p1 = null;
            this.p2 = null;

            this.verificaPontuacao();
        }

        this.setState({
            cards: cards,
        });
    }

    verificaPontuacao() {
        if (this.pontuacao != 10) return;

        this.stopTimer();
        this.setState({
            venceu: true,
        });

        db.ref("usuarios")
            .orderByChild("usuario")
            .equalTo(this.usuario)
            .once("value", (snapshot) => {
                const data = snapshot.val();
                if (data != null) {
                    const dados = Object.values(data)[0];

                    if (dados.time == null) {
                        db.ref("usuarios/" + this.usuarioId).update({
                            time: this.state.time,
                        });
                    } else {
                        const tempoAnterior = dados.time.s + dados.time.m * 60;
                        const tempoAtual =
                            this.state.time.s + this.state.time.m * 60;

                        if (tempoAtual < tempoAnterior) {
                            db.ref("usuarios/" + this.usuarioId).update({
                                time: this.state.time,
                            });
                        }
                    }
                }
            });
    }

    voltar() {
        this.reset();
        this.props.navigation.navigate("Menu");
    }

    showTime() {
        return `${String(this.state.time.m).padStart(2, "0")}:${String(
            this.state.time.s
        ).padStart(2, "0")}`;
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.timer.view}>
                        <Text
                            style={styles.timer.text}
                        >{`Tempo: ${this.showTime()}`}</Text>
                    </View>
                    <View style={styles.jogo}>
                        {this.state.cards.map((card, index) => {
                            return (
                                <Card
                                    key={`card-${index}`}
                                    onPress={() => {
                                        this.cardPressed(card.id, index);
                                    }}
                                    ref={this.cardsRef[index]}
                                    pokemon={card}
                                />
                            );
                        })}
                    </View>
                    <View style={styles.btnView}>
                        <Botao width="40%" onPress={() => this.voltar()}>
                            voltar
                        </Botao>
                        <Botao width="40%" onPress={() => this.reset()}>
                            reiniciar
                        </Botao>
                    </View>
                </View>
                {this.state.venceu ? (
                    <Vitoria
                        time={this.showTime()}
                        tenteNovamente={() => this.reset()}
                        classificacao={() =>
                            this.props.navigation.navigate("Classificação")
                        }
                    />
                ) : null}
            </>
        );
    }
}
