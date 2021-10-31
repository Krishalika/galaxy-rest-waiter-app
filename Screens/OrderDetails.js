import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LogBox,
  Alert,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PrimaryButton } from "../components/Button";
import COLORS from "../src/consts/colors";
import Toast from "react-native-toast-message";

//import { Dropdown } from "react-native-material-dropdown";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
//import DropDown from "react-native-paper-dropdown";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-native-paper";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

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

  const foodDetails = [];
  for (let i = 0; i < length; i++) {
    const detailList = [];

    detailList.push(getDetails("foodItems")[i].item.img);
    detailList.push(getDetails("foodItems")[i].item.name);
    detailList.push(getDetails("foodItems")[i].qty);
    detailList.push(getDetails("foodItems")[i].item.price);
    detailList.push(getDetails("foodItems")[i].item.code);

    foodDetails.push(detailList);
  }

  const calculateTotal = () => {
    let totalPrice = 0;
    foodItems.forEach((el) => {
      totalPrice += el["soldPrice"] * el["qty"];
    });
    return totalPrice;
  };

  console.log("Total price: ", calculateTotal());
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
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "success",
          text1: "Order status updated successfully!",
        });
        console.log("Order status updated");
        //Alert.alert(`order details are updated, REFRESH ORDERS PAGE`);
      })
      .catch((err) => {
        console.log("Error");
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "error",
          text1: "Something went wrong!",
        });
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

  const OrdersCard = ({ item }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={styles.OrdersCard}>
          {/* <View style={styles.tableNumCon}> */}
          {/* <Text
              style={{ fontWeight: "bold", fontSize: 20, color: COLORS.white }}
            >
              {item[0]}
            </Text> */}
          <Image
            source={{ uri: item[0] }}
            style={{
              height: 80,
              width: 80,
              resizeMode: "center",
              justifyContent: "center",
              borderRadius: 45,
              paddingLeft: 15,
            }}
          />
          {/* </View> */}
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {/* {item.cusName} */}
              {item[1]}
            </Text>

            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item[2]}</Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Rs.{item[3]}
            </Text>
            {/* <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#808080" }}
            >
              {item.customerEmail}
            </Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#A9A9A9" }}
            >
              {item.customerContactNumber}
            </Text> */}
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: COLORS.primary,
              }}
            >
              {item[4]}
            </Text>
          </View>
          <View style={{ marginRight: 20, alignItems: "center" }}></View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
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
          <Text>Total Price: {calculateTotal()}</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            // data={ReservationsList}
            data={foodDetails}
            renderItem={({ item }) => <OrdersCard item={item} />}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          />
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
    // paddingBottom: -100,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  OrdersCard: {
    height: 100,
    borderRadius: 10,
    elevation: 10,
    width: 360,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  content: {
    backgroundColor: COLORS.light,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default OrderDetails;
