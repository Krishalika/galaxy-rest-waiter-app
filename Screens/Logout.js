import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Button } from "react-native";

export default function Logout({ navigation }) {
  const leave = () => {
    AsyncStorage.removeItem("token").then(() => {
      navigation.navigate("LoginScreen");
    });
  };
  return <View> leave();</View>;
}

const styles = StyleSheet.create({
  btn2: {
    paddingLeft: 10,
  },
});
