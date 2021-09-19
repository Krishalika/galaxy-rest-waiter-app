import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from "react-native";
// import NumericInput from "react-native-numeric-input";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../src/consts/colors";
import foods from "../src/consts/Foods";
import { PrimaryButton } from "../components/Button";

const OrderDetails = ({ navigation }) => {};

// return (
//   <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
//     <View style={styles.header}>
//       <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
//       <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
//     </View>
//   </SafeAreaView>
// );
