import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Header from "../Header/Header";

//send props for navigation that it can navigate between screen
export default function About({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="About" navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.text}>About Us</Text>
        <Button title="Go back" onPress={() => navigation.goBack()}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "#03498f",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
});
