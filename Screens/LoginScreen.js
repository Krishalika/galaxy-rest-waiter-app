import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { PrimaryButton } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
// async removeItemValue(key) {
//     try {
//         await AsyncStorage.removeItem(key);
//         return true;
//     }
//     catch(exception) {
//         return false;
//     }
// }
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
      // marginVertical: 10,
      marginHorizontal: 25,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 250,
      marginBottom: 100,
    },
    tInput: {
      marginTop: 18,
      alignSelf: "center",
      height: 50,
      width: 260,
      backgroundColor: "white"
      // fontFamily: "nunito-bold",
    },
  });
  const sendCred = async (props) => {
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
          // props.navigation.replace("Home");
          props.navigation.navigate("Home");
          // props.navigation.replace("homeScreen");
        } catch (e) {
          //console.log("error hai", e);
          // Alert(e);
          Toast.show({
            topOffset: 40,
            visibilityTime: 1500,
            position: "top",
            type: "error",
            text1: "Email or password is incorrect!",
          });
        }
      });
  };
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log("success");
      props.navigation.navigate("Home");
      //props.navigation.replace("Home");
    } else {
      console.log("error");
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: "top",
        type: "error",
        text1: "Email or password is incorrect!",
      });
      //props.navigation.replace("LoginScreen");
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);
  return (
    <>
      <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior="position" backgroundColor='white'> */}
        <StatusBar backgroundColor="#03498f" barStyle="light-content" />

        {/* <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginTop: 30,
            color: "#08b8e1",
            // fontFamily: "nunito-bold",
          }}
        >
          Welcome
        </Text> */}
        <View style={styles.logo}>
          <Image
            style={styles.headerLogo}
            source={require("../assets/logo.png")}
          />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.commonCard}>
            {/* <View > */}
            <View>
              <TextInput
                label="Email"
                // mode="outlined"
                value={email}
                style={styles.tInput}
                theme={{ colors: { primary: "#08b8e1" } }}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                label="Password"
                // mode="outlined"
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
        </TouchableWithoutFeedback>
        <PrimaryButton
          title={"LOGIN"}
          mode="contained"
          onPress={() => sendCred(props)}

          // onPress={sendCred(prop)}
          // disabled={quantity > 0 ? false : true}
        />
        {/* <Button
          mode="contained"
          style={{
            marginTop: 38,
            alignSelf: "center",
            height: 30,
            width: "60%",
            backgroundColor: "#08b8e1",
          }}
          onPress={() => sendCred(props)}
          // onPress={() => props.navigation.navigate("Home")}
        >
          <Text
            style={{
              fontSize: 13,
              // fontFamily: "nunito-bold",
              color: "#03498f",
            }}
          >
            Login
          </Text>
        </Button> */}
      </View>
    </>
  );
};

export default LoginScreen;
