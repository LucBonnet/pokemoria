import React from "react";
import { Pressable, Text } from "react-native";

import styles from "../styles";

export default class Botao extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? styles.button.pressed
                            : styles.button.bg,
                    },
                    styles.button,
                    {
                        width: this.props.width,
                    },
                ]}
                onPress={() =>
                    this.props.onPress ? this.props.onPress() : () => {}
                }
            >
                <Text style={styles.button.text}>{this.props.children}</Text>
            </Pressable>
        );
    }
}
