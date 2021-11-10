import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  LogBox,
  Image,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PrimaryButton } from "../shared/Button";
import COLORS from "../styles/colors";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-material-dropdown-v2-fixed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
LogBox.ignoreAllLogs(true);
const { width } = Dimensions.get("screen");
const cardWidth = width - 40;

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
  // console.log(getDetails("foodItems"));

  const customerName = item.customerName;
  const idNumber = item.idNumber;
  const tableNumber = item.tableNumber;
  const [state, setstate] = useState(item.state);
  const [showDropDown, setShowDropDown] = useState(false);

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

  const updateDetails = async (_id) => {
    const token = await AsyncStorage.getItem("token");
    fetch("https://galaxy-rest-be.herokuapp.com/order/update/" + _id, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
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
      });
  };

  const OrdersCard = ({ item }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={styles.OrdersCard}>
          <Image
            source={{ uri: item[0] }}
            style={{
              height: 80,
              width: 80,
              resizeMode: "center",
              justifyContent: "center",
              borderRadius: 45,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item[1]}</Text>

            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Rs.{item[3]}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item[2]}</Text>
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />

        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
          Update Order Status
        </Text>
        <View style={styles.tableNumCon}>
          <Text
            style={{ fontSize: 20, color: COLORS.white, fontWeight: "bold" }}
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
        <View style={{ paddingLeft: 45 }}>
          <Text
            style={{ fontSize: 19, fontWeight: "bold", color: COLORS.orange }}
          >
            Order Details
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.commonCard}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.primary,
                fontWeight: "bold",
              }}
            >
              Total Price -
            </Text>
            <Text style={{ fontSize: 18, color: "black" }}>
              - Rs. {calculateTotal()}
            </Text>
          </View>
          <View style={styles.commonCard}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.primary,
                fontWeight: "bold",
              }}
            >
              Customer Name -
            </Text>
            <Text style={{ fontSize: 18, color: "black" }}>
              - {item.customerName}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={foodDetails}
            renderItem={({ item }) => <OrdersCard item={item} />}
            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <PrimaryButton title={"SAVE"} onPress={() => updateDetails(item._id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    height: "100%",
    flexDirection: "row",
    paddingLeft: 20,
    backgroundColor: "white",
    alignItems: "center",
    height: 56,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  OrdersCard: {
    height: 85,
    borderRadius: 10,
    elevation: 4,
    width: cardWidth,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commonCard: {
    height: 50,
    borderRadius: 10,
    elevation: 4,
    width: cardWidth,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tableNumCon: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
  },
  button: {
    width: "90%",
    paddingLeft: 45,
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 10,
    elevation: 10,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default OrderDetails;
