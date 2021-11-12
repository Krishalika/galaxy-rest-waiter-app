import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { PrimaryButton } from "../shared/Button";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../styles/colors";
const { width } = Dimensions.get("screen");
const cardWidth = width - 40;

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    headerLogo: {
      marginTop: 20,
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
      height: 200,
      borderRadius: 10,
      elevation: 10,
      width: cardWidth,
      backgroundColor: "white",
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 230,
      marginBottom: 30,
      borderColor: COLORS.primary,
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
        })
        .catch((err) => {
          console.log("error");
          Toast.show({
            topOffset: 40,
            visibilityTime: 1500,
            position: "top",
            type: "error",
            text1: "Email or password is incorrect!",
          });
        });
    } else {
      console.log("Please enter email & password");
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
      console.log("Error!");
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#03498f" barStyle="light-content" />

        <Text
          style={{
            paddingTop: 40,
            fontSize: 30,
            textAlign: "center",
            color: COLORS.primary,
            fontWeight: "bold",
          }}
        >
          Welcome
        </Text>

        <View style={styles.logo}>
          <Image
            style={styles.headerLogo}
            testID="logo"
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
                  accessibilityLabel="Email"
                  testID="LoginScreen.emailInput"
                  value={email}
                  style={styles.tInput}
                  theme={{ colors: { primary: "#08b8e1" } }}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <AntDesign name="lock" size={24} color="black" />
                <TextInput
                  label="Password"
                  accessibilityLabel="Password"
                  testID="LoginScreen.pwInput"
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
          testID="LoginScreen.Button"
          onPress={() => sendCred(props)}
        />
      </View>
    </>
  );
};

export default LoginScreen;
