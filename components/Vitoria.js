import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";
import Botao from "./Botao";

export default class Vitoria extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.fundoModal}>
                <View style={styles.modal}>
                    <Image
                        style={styles.modal.image}
                        source={{
                            uri: "https://media.tenor.com/74l5y1hUdtwAAAAj/pokemon.gif",
                        }}
                    />
                    <Text style={styles.modal.text.venceu}>Você venceu!</Text>
                    <Text style={styles.modal.text}>Tempo:</Text>
                    <Text style={styles.modal.text}>{this.props.time}</Text>
                    <View style={styles.btnGroup}>
                        <Botao width="48%" onPress={this.props.tenteNovamente}>
                            Tente Novamente
                        </Botao>
                        <Botao width="48%" onPress={this.props.classificacao}>
                            Classificação
                        </Botao>
                    </View>
                </View>
            </View>
        );
    }
}
