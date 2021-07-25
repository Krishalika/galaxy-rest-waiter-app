import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import Header from "../Header/Header";

//send props for navigation that it can navigate between screen
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Home" navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.text}>Home is here!!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //to center the content
  },
  content: {
    backgroundColor: "#03cafc",
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
