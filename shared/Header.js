import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.logo}>
          <Image
            style={styles.headerLogo}
            testID="logo"
            source={require("../assets/logo.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    height: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 56,
  },
  headerTitle: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#03498f",
    letterSpacing: 1,

    alignSelf: "center",
    textShadowRadius: 10,
    position: "absolute",
  },
  icons: {
    position: "absolute",
    left: 16,
    top: 15,
  },
  headerLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: "absolute",
  },
  logo: {
    position: "absolute",
    right: -160,
    paddingBottom: 45,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 16,
    top: 15,
    justifyContent: "center",
    color: "#03498f",
    alignContent: "center",
    alignItems: "center",
  },
});

export default Header;
