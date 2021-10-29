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

//import { Dropdown } from "react-native-material-dropdown";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
//import DropDown from "react-native-paper-dropdown";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider} from 'react-native-paper';

LogBox.ignoreAllLogs(true);
const OrderDetails = ({ navigation, route, _id }) => {
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
  const [loading, setLoading] = useState(true);

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
      case "state":
        return item.state;
    }
    return "";
  };

  console.log(item._id);
  console.log(item.state);
  console.log(getDetails("customerName"));
  console.log(getDetails("foodItems"));

  const customerName = item.customerName;
  const idNumber = item.idNumber;
  /////////////
  // const foodItems = item.foodItems;
  const tableNumber = item.tableNumber;
  const [state, setstate] = useState(item.state);
  const [showDropDown, setShowDropDown] = useState(false);

  //const state = "Processing";
  //   const foodItems = [
  //     {
  //         "item": "6155d44dc479c10016c63fa2",
  //         "qty": 1,
  //         "soldPrice": 200
  //     },
  //     {
  //       "item": "614b6ce16851a34a7c29c95d",
  //       "qty": 1,
  //       "soldPrice": 1000
  //     }
  // ]

  const foodItems = [];
  const length = item.foodItems.length;

  for (let i = 0; i < length; i++) {
    var foodDict = {};
    foodDict["item"] = getDetails("foodItems")[i].item._id;
    foodDict["qty"] = getDetails("foodItems")[i].qty;
    foodDict["soldPrice"] = getDetails("foodItems")[i].soldPrice;
    foodItems.push(foodDict);
  }

  console.log("array", foodItems);

  const calculateTotal = () => {
    let totalPrice = 0;
    getDetails("foodItems").forEach((el) => {
      totalPrice += el.soldPrice * el.qty;
    });
    return totalPrice;
  };

  console.log(calculateTotal.length);
  //const getOrderDetails = () => {};

  const updateDetails = async (_id) => {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    fetch("https://galaxy-rest-be.herokuapp.com/order/update/" + _id, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      }),
      body: JSON.stringify({
        customerName,
        idNumber,
        foodItems,
        state,
        tableNumber,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Order status updated");
        //Alert.alert(`order details are updated, REFRESH ORDERS PAGE`);
      })
      .catch((err) => {
        console.log("Error");
        //Alert.alert(err);
      });
  };

  // const updateDetails = () => {
  //   //fetch("https://galaxy-rest-be.herokuapp.com/order/update/{$item._id}" , {

  //   fetch("https://galaxy-rest-be.herokuapp.com/order/update" + item._id, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       customerName: getDetails("customerName"),
  //       idNumber: getDetails("idNumber"),
  //       foodItems: getDetails("foodItems"),
  //       state: "Processing",
  //       tableNumber: getDetails("tableNumber"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       Alert.alert(`order details are updated, REFRESH ORDERS PAGE`);
  //     })
  //     .catch((err) => {
  //       Alert.alert(err);
  //     });
  // };

  // const PopulateOrder = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   console.log(token);
  //   // fetch("http://10.0.2.2:5000/order")
  //   fetch(`https://galaxy-rest-be.herokuapp.com/order/${item._id}`)
  //     .then((res) => res.json())
  //     .then((populate) => {
  //       // setorderItems(results);
  //       console.log(populate);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       Alert.alert(err);
  //     });
  // };
  // useEffect(() => {
  //   PopulateOrder();
  // }, []);

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
          {/* <Provider>
          <DropDown
            label={"Order Status"}
            mode={"outlined"}
            // visible={showDropDown2}
            visible={showDropDown}
            // showDropDown={() =>  setShowDropDown2(true)}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            // onDismiss={() =>  setShowDropDown2(false)}
            value={state}
            activeColor={"#08b8e1"}
            // dropDownItemTextStyle={{fontFamily:'nunito-bold',color:'blue'}}
            setValue={setstate}
            list={statusData}
          />
          </Provider> */}
        </View>
        <View style={styles.button}>
          <Text>Customer Name: {item.customerName}</Text>
        </View>
        <View style={styles.button}>
          <PrimaryButton
            title={"SAVE"}
            onPress={() => updateDetails(item._id)}
          />
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
