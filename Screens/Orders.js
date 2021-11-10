import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  RefreshControl,
  Dimensions,
} from "react-native";
import Header from "../shared/Header";
import COLORS from "../styles/colors";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const { width } = Dimensions.get("screen");
const cardWidth = width - 40;

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


  const getColor = (state) => {
    switch (state) {
      case 'In Queue':
        return COLORS.inqueue;
      case 'Processing':
        return COLORS.processing;
      case 'Prepared':
        return COLORS.orange;
      default:
        return 'black';
    }
  };

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
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 , color:"#808080"}}>
              status updated at:{" "}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {moment(new Date(item.updatedAt)).format("h:mma")}
              {","} {item.updatedAt.substr(0, 10)}
            </Text>
          </View>
          <View>
            <Text
           // style={{color: text === "foo" ? "trueColor" : "falseColor"}}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: getColor(item.state)
              }}
            >
              {item.state} {">>"}
            </Text>
          </View>
          {/* <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              updated at: {moment(new Date(item.updatedAt)).format("h:mma")}
              {","} {item.updatedAt.substr(0, 10)}
            </Text>
          </View> */}
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
          numColumns={1}
          data={orderItems}
          renderItem={({ item }) => <OrderCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20, paddingTop:10 }}
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
    height: 75,
    borderRadius: 10,
    elevation: 15,
    shadowColor: "black",
    width: cardWidth,
    backgroundColor: COLORS.white,
    marginVertical: 7,
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
    backgroundColor:"#4e7fb0",
     // #ff6f3c -> orange color in home page
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
});
