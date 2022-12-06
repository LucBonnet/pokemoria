import React from "react";
import { View, Text } from "react-native";
import Input from "../components/Input";
import Botao from "../components/Botao";

import styles from "../styles";

import { db } from "../config/config";

export default class Login extends React.Component {
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

  logar() {
    db.ref("usuarios")
      .orderByChild("usuario")
      .equalTo(this.usuario)
      .once("value", (snapshot) => {
        let data = snapshot.val();
        if (data != null) {
          const user = Object.values(data)[0];
          if (user != null) {
            if (user.senha != this.senha) {
              this.setState({
                msg: "Usuário ou senha incorretos",
              });
            } else {
              // Logado
              this.setState({
                msg: "",
              });
              this.usuarioInput.current.clear();
              this.senhaInput.current.clear();

              this.props.navigation.navigate("Jogo", {
                usuarioId: Object.keys(data),
                usuario: this.usuario,
              });
            }
          } else {
            this.setState({
              msg: "Usuário ou senha incorretos",
            });
          }
        } else {
          this.setState({
            msg: "Usuário ou senha incorretos",
          });
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
          <Botao onPress={() => this.logar()}>entrar</Botao>
        </View>
      </View>
    );
  }
}
