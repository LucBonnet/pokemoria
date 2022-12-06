import React from "react";
import { View, Text } from "react-native";

import Input from "../components/Input";
import Botao from "../components/Botao";

import { db } from "../config";
import styles from "../styles";

export default class Cadastrar extends React.Component {
    constructor(props) {
        super(props);

        this.usuario = "";
        this.senha = "";
        this.state = {
            msg: "",
        };

        this.usuarioInput = React.createRef();
        this.senhaInput = React.createRef();
    }

    cadastrar() {
        this.setState({
            msg: "",
        });

        this.usuarioInput.current.clear();
        this.senhaInput.current.clear();

        db.ref("usuarios")
            .orderByChild("usuario")
            .equalTo(this.usuario)
            .once("value", (snapshot) => {
                let data = snapshot.val();
                if (data != null) {
                    this.setState({
                        msg: "Usuário já cadastrado",
                    });
                } else {
                    db.ref("/usuarios").push({
                        usuario: this.usuario,
                        senha: this.senha,
                    });
                    alert("Usuário cadastrado com sucesso!");
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Input
                        label="Usuário:"
                        ref={this.usuarioInput}
                        onChange={(texto) => (this.usuario = texto)}
                    ></Input>
                    <Input
                        label="Senha:"
                        password
                        ref={this.senhaInput}
                        onChange={(texto) => (this.senha = texto)}
                    ></Input>
                    {this.state.msg != "" ? (
                        <Text style={styles.msg}>{this.state.msg}</Text>
                    ) : null}
                    <Botao onPress={() => this.cadastrar()}>cadastrar</Botao>
                </View>
            </View>
        );
    }
}
