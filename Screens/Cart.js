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

const Cart = ({ navigation }) => {
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
  const [TextInputValue, setTextInputValue] = React.useState("");

  const [quantity, setQuantity] = React.useState(1);

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: -5,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Table Number</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 30,
            width: 80,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            backgroundColor: COLORS.primary,
            color: COLORS.white,
          }}
          onChangeText={(text) => setTextInputValue(text)}
          value={TextInputValue}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartIteam}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs. 3000</Text>
            </View>

            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="Place Order" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default Cart;
