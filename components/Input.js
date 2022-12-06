import React from "react";
import { TextInput, Text, View } from "react-native";

import styles from "../styles";

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          value: ""
        }
    }

    clear() {
      this.setState({
        value: ""
      })
    }

    render() {
        return (
            <View>
                {this.props.label ? (
                    <Text style={styles.input.label}>{this.props.label}</Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    secureTextEntry={this.props.password || false}
                    placeholder={this.props.placeholder}
                    onChangeText={(texto) => {this.props.onChange(texto); this.setState({value: texto})}}
                    value={this.state.value}
                />
            </View>
        );
    }
}
