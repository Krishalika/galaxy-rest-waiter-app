import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  LogBox,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PrimaryButton } from "../components/Button";
import COLORS from "../src/consts/colors";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-material-dropdown";
import { globalStyles } from "../styles/global";

const OrderDetails = ({ navigation, route }) => {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  const item = route.params;
  const statusData = [
    { value: "In Queue" },
    { value: "Processing" },
    { value: "Prepared" },
    { value: "Closed" },
  ];
  const [state, setstate] = useState("In Queue");
  const [tableNumber, settableNumber] = useState(0);
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Details</Text>
        <View style={styles.tableNumCon}>
          <Text
            style={{ fontSize: 25, color: COLORS.white, fontWeight: "bold" }}
          >
            {item.tableNumber}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.button}>
          <Dropdown
            label="Order status"
            data={statusData}
            // onChangeText={(text) => setStatus(text)}
            value={state}
          />
        </View>

        {/* <View style={styles.details}> */}

        {/* <Text style={styles.detailsText}>{item.tableNumber}</Text> */}

        {/* <Text style={styles.detailsText}>{item._id}</Text> */}
        <View style={styles.button}>
          <PrimaryButton
            title={"SAVE"}
            // onPress={() => navigation.navigate("Cart", foods)}
            //   onPress={addThisToCart}
            //   disabled={quantity > 0 ? false : true}
          />
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 320,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.primary,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  tableNumCon: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 170,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
    width: "90%",
    paddingLeft: 45,
    justifyContent: "center",
  },
});

export default OrderDetails;
