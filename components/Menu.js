import React from "react";
import {} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../pages/Login";
import Cadastrar from "../pages/Cadastrar";

const Navegacao = createBottomTabNavigator();

export default class App extends React.Component {
    render() {
        return (
            <Navegacao.Navigator>
                <Navegacao.Screen options={{ 
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons 
                      name="account-outline" 
                      color={color} 
                      size={32} 
                    />
                  ) 
                  }} 
                  name="Login" 
                  component={Login} 
                />
                <Navegacao.Screen options={{ 
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons 
                      name="account-plus-outline" 
                      color={color} 
                      size={32} 
                    />
                  ) 
                  }} 
                  name="Cadastrar" 
                  component={Cadastrar} 
                />
            </Navegacao.Navigator>
        );
    }
}
