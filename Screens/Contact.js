import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

//send props for navigation that it can navigate between screen
export default function Contact({ navigation }) {
  return (
    <View>
      <View>
        <Text>Contact Details</Text>
        <Button title="Go back" onPress={() => navigation.goBack()}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //to center the content
  },
  content: {
    backgroundColor: "#c203fc",
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
