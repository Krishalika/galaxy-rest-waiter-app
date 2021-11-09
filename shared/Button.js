import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import COLORS from "../styles/colors";

const PrimaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SecondaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor: COLORS.white }}>
        <Text style={{ ...style.title, color: COLORS.primary }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ReservationButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.resBtnContainer, backgroundColor: COLORS.primary }}>
        <Text style={{ ...style.title, color: COLORS.white }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    alignSelf:"center",
    marginTop:40
  },
  title: { color: COLORS.white, fontWeight: "bold", fontSize: 18 },
  resBtnContainer: {
    backgroundColor: COLORS.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    alignSelf:"center",
    marginTop:10,
    borderRadius: 30,
  },
});

export { PrimaryButton, SecondaryButton,ReservationButton };
