import * as React from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

import Home from "../Screens/Home";
import Orders from "../Screens/Orders";
import Reservations from "../Screens/Reservations";
import DetailsScreen from "../Screens/DetailsScreen";
import Cart from "../Screens/Cart";
import COLORS from "../src/consts/colors";
import OrderDetails from "../Screens/OrderDetails";

function CustomerDrawerContent(props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.drawerHeader}>
        <View>
          <View style={styles.logo}>
            <Image
              style={styles.headerLogo}
              source={require("../assets/logo.png")}
            />
          </View>
          <Text style={styles.drawerHeaderText}>Galaxy Rest</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          icon={() => (
            <Icon
              name={Platform.OS === "ios" ? "ios-close" : "md-close"}
              color="black"
              size={22}
            />
          )}
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        ></DrawerItem> */}
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(props) => <CustomerDrawerContent {...props} />}
      style={styles.drawerItem}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Orders" component={Orders} />
      {/* <Drawer.Screen name="DetailsScreen" component={DetailsScreen} /> */}
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Reservations" component={Reservations} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //to center the content
  },
  drawerHeader: {
    backgroundColor: COLORS.primary,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: "absolute",
  },
  logo: {
    position: "absolute",
    right: 175,
    paddingBottom: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerItem: {
    fontSize: 30,
  },
});

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
