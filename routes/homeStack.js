import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Header/Header";
import Home from "../Screens/Home";

const Stack = createStackNavigator();

const HomeStack = () => {
  return <Stack.Navigator></Stack.Navigator>;
};

export default HomeStack;
