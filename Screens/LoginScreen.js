import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { PrimaryButton } from "../shared/Button";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    headerLogo: {
      marginTop: 50,
      height: 150,
      width: 150,
      borderRadius: 55,
      position: "absolute",
    },
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    logo: {
      alignItems: "center",
    },
    commonCard: {
      height: 250,
      borderRadius: 10,
      elevation: 10,
      width: 360,
      backgroundColor: "white",
      marginHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 250,
      marginBottom: 100,
    },
    tInput: {
      alignSelf: "center",
      height: 50,
      width: 260,
      backgroundColor: "white",
    },
    inputContainer: {
      flexDirection: "row",
      marginTop: 18,
      alignItems: "center",
    },
  });
  const sendCred = async (props) => {
    if (email && password) {
      fetch("https://galaxy-rest-be.herokuapp.com/waiters/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())

        .then(async (data) => {
          try {
            await AsyncStorage.setItem("token", data.token);
            props.navigation.navigate("Home");
          } catch (e) {
            Toast.show({
              topOffset: 40,
              visibilityTime: 1500,
              position: "top",
              type: "error",
              text1: "Email or password is incorrect!",
            });
          }
        });
    } else {
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: "top",
        type: "error",
        text1: "Email or password is incorrect!",
      });
    }
  };
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log("success");
      props.navigation.navigate("Home");
    } else {
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: "top",
        type: "error",
        text1: "Email or password is incorrect!",
      });
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#03498f" barStyle="light-content" />

        <View style={styles.logo}>
          <Image
            style={styles.headerLogo}
            source={require("../assets/logo.png")}
          />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.commonCard}>
            <View>
              <View style={styles.inputContainer}>
                <AntDesign name="mail" size={24} color="black" />
                <TextInput
                  label="Email"
                  value={email}
                  style={styles.tInput}
                  theme={{ colors: { primary: "#08b8e1" } }}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <AntDesign name="lock" size={28} color="black" />
                <TextInput
                  label="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  style={styles.tInput}
                  theme={{ colors: { primary: "#08b8e1" } }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <PrimaryButton
          title={"LOGIN"}
          mode="contained"
          onPress={() => sendCred(props)}
        />
      </View>
    </>
  );
};

export default LoginScreen;
