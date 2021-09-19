import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation, title }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      {/* <TouchableOpacity style={styles.icons} onPress={openMenu}>
        <Ionicons name="md-menu" size={28} color="black" />
      </TouchableOpacity> */}
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
            source={require("../assets/logo.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //flex: 1,
    marginTop: 26,
    // width: "100%",
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
    justifyContent: "center", //to center texttitle
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#03498f",
    letterSpacing: 1,
    // paddingTop:5,
    alignSelf: "center",
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: -1, height: 1 },
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
    right: 130,
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
