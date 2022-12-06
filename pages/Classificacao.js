import React from "react";
import { View, Text } from "react-native";

import styles from "../styles";

import { db } from "../config/config";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: [],
    };
  }

  componentDidMount() {
    db.ref("usuarios").on("value", (snapshot) => {
      let data = snapshot.val();
      let dados = Object.values(data);
      dados = dados.filter((dado) => dado.time);
      dados.sort((a, b) => {
        const timeA = a.time.s + a.time.m * 60;
        const timeB = b.time.s + b.time.m * 60;

        return timeA < timeB ? -1 : 1;
      });

      this.setState({ usuarios: dados });
    });
  }

  showTime(time) {
    return `${String(time.m).padStart(2, "0")}:${String(time.s).padStart(
      2,
      "0"
    )}`;
  }

  render() {
    return (
      <View>
        {this.state.usuarios.length == 0 ? (
          <Text>Nenhum usuário encontrado</Text>
        ) : (
          this.state.usuarios.map((usuario, index) => (
            <View
              style={{
                ...styles.cCard,
                backgroundColor: index % 2 == 0 ? "lightgray" : "white",
              }}
            >
              <Text style={styles.cText}>{usuario.usuario}</Text>
              <Text style={styles.cText}>{this.showTime(usuario.time)}</Text>
            </View>
          ))
        )}
      </View>
    );
  }
}
