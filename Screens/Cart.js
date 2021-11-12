import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import Toast from "react-native-toast-message";
import { removeCartItem, resetCart } from "../redux/cart/cartActions";
import { Provider, TextInput } from "react-native-paper";
import { globalStyles } from "../styles/global";
import COLORS from "../styles/colors";
import { Formik } from "formik";
import Header from "../shared/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SecondaryButton } from "../shared/Button";
const { width } = Dimensions.get("screen");
const inputWidth = width - 80;

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

  const [customerName, setcustomerName] = React.useState("");
  const [idNumber, setidNumber] = React.useState("");
  const [tableNumber, settableNumber] = React.useState("");

  const clearData = () => {
    setcustomerName("");
    setidNumber("");
    settableNumber("");
  };
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
    if (items.length > 0) {
      axios
        .post(`https://galaxy-rest-be.herokuapp.com/order`, data)
        .then(({ data }) => {
          dispatch(resetCart());
          clearData();
          Toast.show({
            topOffset: 40,
            visibilityTime: 1500,
            position: "top",
            type: "success",
            text1: "Order is placed successfully!",
          });
        })
        .catch((e) => {
          console.log(e);
          Toast.show({
            topOffset: 40,
            visibilityTime: 1500,
            position: "top",
            type: "error",
            text1: "Please fill all fields with valid details!",
          });
        });
    } else {
      Toast.show({
        topOffset: 40,
        visibilityTime: 1500,
        position: "top",
        type: "error",
        text1: "Please select order items!",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Cart" navigation={navigation} style={styles.header} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
        }}
      />

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
                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Image
                      source={{ uri: item.img }}
                      style={{
                        height: 55,
                        width: 55,
                        resizeMode: "center",
                        justifyContent: "center",
                        borderRadius: 45,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: 3,
                      width: 120,
                    }}
                  >
                    <Text style={{ fontSize: 16, justifyContent: "center" }}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold" }}>x{item.quantity}</Text>
                  </View>

                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold", color: COLORS.primary }}>
                      Rs. {item.price}
                    </Text>
                  </View>

                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <TouchableOpacity>
                      <MaterialIcons
                        onPress={() => dispatch(removeCartItem(item))}
                        name="delete"
                        size={24}
                        color={COLORS.orange}
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.orange,
                }}
              >
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
            <Text
              style={{ color: COLORS.orange, fontSize: 18, fontWeight: "bold" }}
            >
              Your Cart is Empty !
            </Text>
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
      <View style={styles.details}>
        <Provider>
          <ScrollView>
            <Formik
              initialValues={{
                customerName: "",
                idNumber: "",
                tableNumber: "",
              }}
            >
              {(props) => (
                <View style={{ alignItems: "center" }}>
                  <TextInput
                    style={globalStyles.input}
                    accessibilityLabel="number"
                    testID="Cart.tableNumber"
                    label="Table Number"
                    mode="outlined"
                    keyboardType="numeric"
                    onChangeText={(text) => settableNumber(text)}
                    value={tableNumber}
                    color={COLORS.white}
                  />
                  <View>
                    <TextInput
                      style={globalStyles.input}
                      label="Customer Name"
                      accessibilityLabel="name"
                      testID="Cart.customerName"
                      mode="outlined"
                      onChangeText={(text) => setcustomerName(text)}
                      value={customerName}
                    />
                  </View>
                  <TextInput
                    style={globalStyles.input}
                    label="Customer NIC"
                    accessibilityLabel="nic"
                    testID="Cart.customerNIC"
                    mode="outlined"
                    onChangeText={(text) => setidNumber(text)}
                    value={idNumber}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </Provider>
        <View style={{ alignItems: "center" }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.tInput}
              label="Customer Name"
              accessibilityLabel="CustomerName"
              testID="CartForm.name"
              theme={{ colors: { primary: "#08b8e1" } }}
              onChangeText={(text) => setcustomerName(text)}
              value={customerName}
              clearButtonMode="always"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              height="50"
              style={styles.tInput}
              accessibilityLabel="CustomerNIC"
              testID="CartForm.nic"
              theme={{ colors: { primary: "#08b8e1" } }}
              label="Customer NIC Number"
              onChangeText={(text) => setidNumber(text)}
              value={idNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              height="50"
              style={styles.tInput}
              theme={{ colors: { primary: "#08b8e1" } }}
              label="Table Number"
              keyboardType="numeric"
              onChangeText={(text) => settableNumber(text)}
              value={tableNumber}
            />
          </View>

          <SecondaryButton
            title="PLACE ORDER"
            onPress={placeOrder}
            disabled={items.length > 0 ? false : true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#4e7fb0",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    color: COLORS.primary,
  },
  tInput: {
    alignSelf: "center",
    fontSize: 14,
    height: 50,
    width: inputWidth,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
});

export default Cart;
