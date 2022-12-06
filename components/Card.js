import React from "react";
import { Pressable, Image, Animated, Easing, View } from "react-native";

import styles from "../styles";

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.hidden = true;
        this.state = {
            hidden: this.hidden,
            rotate1: new Animated.Value(Number(this.hidden)),
            rotate2: new Animated.Value(Number(!this.hidden)),
        };
    }

    flip() {
        Animated.parallel([
            Animated.timing(this.state.rotate1, {
                toValue: this.hidden ? 0 : 1,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.rotate2, {
                toValue: this.hidden ? 1 : 0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();

        this.hidden = !this.hidden;

        this.setState({
            rotate1: this.state.rotate1,
            rotate2: this.state.rotate2,
        });
    }

    render() {
        const degF = this.state.rotate1.interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "0deg"],
        });

        const degB = this.state.rotate2.interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "0deg"],
        });

        return (
            <Pressable
                style={styles.card}
                onPress={() => {
                    this.props.onPress();
                }}
            >
                <View style={{ ...styles.cardGroup }}>
                    <Animated.View
                        style={{
                            ...styles.cardFront,
                            transform: [{ rotateY: degF }],
                        }}
                    >
                        <Image
                            style={{
                                ...styles.image,
                            }}
                            source={{
                                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
                            }}
                        />
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.cardBack,
                            transform: [{ rotateY: degB }],
                        }}
                    >
                        <Image
                            style={{
                                ...styles.image,
                            }}
                            source={{
                                uri: this.props.pokemon.img,
                            }}
                        />
                    </Animated.View>
                </View>
            </Pressable>
        );
    }
}
