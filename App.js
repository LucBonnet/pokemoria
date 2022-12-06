
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "./components/Menu";
import Jogo from "./pages/Jogo.js";
import Classificacao from "./pages/Classificacao.js";

const Navegacao = createNativeStackNavigator();
export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Navegacao.Navigator>
                    <Navegacao.Screen
                         options={{ headerShown: false }}
                        name="Menu"
                        component={Menu}
                    />
                    <Navegacao.Screen
                        options={{ headerShown: false }}
                        name="Jogo"
                        component={Jogo}
                    />
                    <Navegacao.Screen
                        name="Classificação"
                        component={Classificacao}
                    />
                </Navegacao.Navigator>
            </NavigationContainer>
        );
    }
}
