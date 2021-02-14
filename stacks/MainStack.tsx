import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/Main";
import Card from "../screens/Card";

const MainStackNavigator = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <MainStackNavigator.Screen name="Main" component={Main} />
        <MainStackNavigator.Screen name="Card" component={Card} />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
