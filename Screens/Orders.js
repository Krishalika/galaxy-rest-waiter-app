import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, RefreshControl } from "react-native";
import Header from "../shared/Header";
import COLORS from "../styles/colors";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Orders({ navigation }) {
  const [orderItems, setorderItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const ListofOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    fetch(`https://galaxy-rest-be.herokuapp.com/order`)
      .then((res) => res.json())
      .then((results) => {
        setorderItems(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

  useEffect(() => {
    ListofOrders();
  }, []);
  const OrderCard = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("OrderDetails", item)}
      >
        <View style={styles.orderCard}>
          <View style={styles.tableNumCon}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: COLORS.white }}
            >
              {item.tableNumber}
            </Text>
          </View>
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
            }}
          ></View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.state}
            </Text>
          </View>
          <View style={{ marginRight: 20, alignItems: "center" }}></View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Order Details"
        navigation={navigation}
        style={styles.header}
      />

      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          numColumns={2}
          data={orderItems}
          renderItem={({ item }) => <OrderCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          keyExtractor={(item, _id) => _id.toString()}
          // onRefresh={() => ListofOrders()}
          // refreshing={loading}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => ListofOrders()}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  content: {
    // backgroundColor: COLORS.light,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  orderCard: {
    height: 90,
    borderRadius: 10,
    elevation: 15,
    width: 170,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  tableNumCon: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
});
