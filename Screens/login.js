import React, { useState } from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import {
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
console.disableYellowBox = true;
const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();

  const login = (props) => {
    const data2 = {
      password,
      email,
    };
    if (data2.password.length > 4 && data2.email.length > 10) {
      fetch("http://10.0.2.2:5000/waiters/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.text())

        .then(async (data) => {
          try {
            await AsyncStorage.setItem("token", data.token);
            props.navigation.replace("Home");
          } catch (e) {
            Toast.show({
              topOffset: 40,
              visibilityTime: 1500,
              position: "top",
              type: "error",
              text1: "Unknown Error",
            });
          }
        });
    } else {
      if (data2.password && data2.email) {
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "error",
          text1: "Invalid Password or Username",
        });
      } else {
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "error",
          text1: "Fill Password && Username",
        });
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#03498f" barStyle="light-content" />
        <ScrollView>
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <Text
            style={{
              paddingTop: 20,
              fontSize: 25,
              textAlign: "center",
              color: "#08b8e1",
            }}
          >
            Welcome!
          </Text>
          <View style={styles.logo}>
            <Image
              style={styles.headerLogo}
              source={require("../assets/logo.png")}
            />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.action}>
                <FontAwesome
                  style={{ padding: 12 }}
                  name="user-o"
                  color={colors.accent}
                  size={20}
                />
                <TextInput
                  style={globalStyles.input}
                  label="Email"
                  mode="outlined"
                  value={email}
                  style={{
                    height: 40,
                    width: "65%",
                  }}
                  theme={{
                    fonts: {
                      regular: {},
                    },
                    colors: {
                      primary: "#08b8e1",
                      accent: "#03498f",
                      placeholder: "#03498f",
                      text: "#08b8e1",
                    },
                  }}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.action2}>
                <Feather
                  style={{ padding: 12 }}
                  name="lock"
                  color={colors.accent}
                  size={20}
                />
                <TextInput
                  style={globalStyles.input}
                  label="Password"
                  mode="outlined"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  style={{
                    height: 40,
                    width: "65%",
                  }}
                  theme={{
                    fonts: {
                      regular: {},
                    },
                    colors: {
                      primary: "#08b8e1",
                      accent: "#03498f",
                      placeholder: "#03498f",
                      text: "#08b8e1",
                    },
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Button
            mode="contained"
            style={{
              marginTop: 38,
              alignSelf: "center",
              height: 40,
              width: "60%",
              backgroundColor: "#08b8e1",
            }}
            onPress={() => login(props)}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#03498f",
              }}
            >
              Login
            </Text>
          </Button>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerLogo: {
    marginTop: 30,
    height: 100,
    width: 100,
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
  action: {
    flexDirection: "row",
    paddingRight: 40,
    marginTop: 170,
    alignSelf: "center",
  },
  action2: {
    flexDirection: "row",
    marginTop: 20,
    paddingRight: 40,

    alignSelf: "center",
  },
});

export default LoginScreen;
