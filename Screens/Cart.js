import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Divider } from "react-native-elements";
import Toast from "react-native-toast-message";
import { removeCartItem, resetCart } from "../redux/cart/cartActions";

import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../src/consts/colors";

import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartReducer.items);

  const calculateTotal = () => {
    let totalPrice = 0;
    items.forEach((el) => {
      totalPrice += el.price * el.quantity;
    });
    return totalPrice;
  };

  const calculateItemTotal = () => {
    let totalQty = 0;
    items.forEach((el) => {
      totalQty += el.quantity;
    });
    return totalQty;
  };

  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View
          style={{ height: 100, marginLeft: 10, paddingVertical: 10, flex: 1 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>{item.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{quantity}</Text>
          <View style={styles.actionBtn}>
            <Icon
              name="remove"
              size={25}
              color={COLORS.white}
              onPress={decQuantity}
            ></Icon>
            <Icon
              name="add"
              size={25}
              color={COLORS.white}
              onPress={incQuantity}
            ></Icon>
          </View>
        </View>
      </View>
    );
  };

  const cartIteam = [
    {
      id: "2",
      name: "Cheese Pizza",
      price: "2100.00",
      image: require("../assets/cheesePizza.jpg"),
    },
  ];
  //const [tableNumber, settableNumber] = React.useState();

  const [quantity, setQuantity] = React.useState(1);

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // const [customerName, setcustomerName] = React.useState("");
  // const [idNumber, setidNumber] = React.useState("");
  const customerName = "R.M. Rathnayake";
  const idNumber = "982036705v"
  const tableNumber = "7";
  // const {customerName, idNumber, tableNumber="R.M.Rathnayake";

  const placeOrder = () => {
    const data = {
      customerName,
      idNumber,
      tableNumber,
      foodItems: items.map((el) => {
        return {
          item: el._id,
          qty: el.quantity,
          soldPrice: el.price,
        };
      }),
    };
    axios
      // .post(`http://10.0.2.2:5000/order`, data)

      .post(`https://galaxy-rest-be.herokuapp.com/order`, data)
      .then(({ data }) => {
        dispatch(resetCart());
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "success",
          text1: "Order is placed successfully",
        });
      })
      .catch((e) => {
        console.log(e);
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "error",
          text1: "Order is not placed",
        });
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Header title="Cart" navigation={navigation} style={styles.header} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            alignItems: "center",
            marginLeft: -20,
          }}
        >
          Table
        </Text>
        <TextInput
          required
          keyboardType={"numeric"}
          placeholder="Enter Table Number"
          style={{ width: 150 }}
          value={tableNumber}
        ></TextInput>
      </View>

      <ScrollView style={styles.container}>
        {items.length > 0 ? (
          <>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Order Details
            </Text>
            <View style={{ marginTop: 20 }}>
              {items.map((item, index) => (
                <View
                  key={`${index}_cart_items`}
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: 3,
                      width: 120,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  </View>
                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.quantity}</Text>
                  </View>

                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold", color: COLORS.primary }}>
                      Rs. {item.price} (1)
                    </Text>
                  </View>

                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <TouchableOpacity>
                      <MaterialIcons
                        onPress={() => dispatch(removeCartItem(item))}
                        name="delete"
                        size={24}
                        color="#F7685B"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            <Divider
              style={{ marginBottom: 30, marginTop: 20 }}
              orientation="horizontal"
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Total items ({calculateItemTotal()})
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                Rs. {calculateTotal()}
              </Text>
            </View>
          </>
        ) : (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "#4B76D1", fontSize: 18 }}>
              Your Cart is Empty !
            </Text>
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <Button
          onPress={placeOrder}
          // onPress={items.length > 0 ? placeOrder : ()=>navigation.navigate('Home')}

          disabled={items.length > 0 ? false : true}
          buttonStyle={{ height: 55 }}
          containerStyle={styles.button}
          title="Place Order"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
  },
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    borderRadius: 10,
    elevation: 15,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: 60,
    height: 45,
    resizeMode: "cover",
    borderRadius: 8,
  },
  button: {
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    color: COLORS.primary,
  },
});

export default Cart;
