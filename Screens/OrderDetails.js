import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LogBox,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PrimaryButton } from "../components/Button";
import COLORS from "../src/consts/colors";
// import { Dropdown } from "react-native-material-dropdown";
import {Dropdown} from "react-native-material-dropdown-v2";
LogBox.ignoreAllLogs(true);
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
  const [state, setstate] = useState("Processing");

  const getDetails = (type) => {
    switch (type) {
      case "customerName":
        return item.customerName;
      case "idNumber":
        return item.idNumber;
      case "foodItems":
        return item.foodItems;
      case "tableNumber":
        return item.tableNumber;
    }
    return "";
  };

  console.log(item._id);
  console.log(state);
  console.log(getDetails("customerName"));
  console.log(getDetails("foodItems"));

  const updateDetails = () => {
    fetch("https://galaxy-rest-be.herokuapp.com/order/update" + item._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: getDetails("customerName"),
        idNumber: getDetails("idNumber"),
        foodItems: getDetails("foodItems"),
        state: "Processing",
        tableNumber: getDetails("tableNumber"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        Alert.alert(`order details are updated, REFRESH ORDERS PAGE`);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

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
            onChangeText={(text) => setstate(text)}
            value={state}
          />
        </View>

        <View style={styles.button}>
          <PrimaryButton title={"SAVE"} />
        </View>
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
