import * as React from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "../Screens/Home";
import Orders from "../Screens/Orders";
import Reservations from "../Screens/Reservations";
import Cart from "../Screens/Cart";
import COLORS from "../src/consts/colors";
import DetailsScreen from "../Screens/DetailsScreen";
import LoginScreen from "../Screens/LoginScreen";
import OrderDetails from "../Screens/OrderDetails";
import Logout from "../Screens/Logout";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import login from "../Screens/login";

function CustomDrawerContent(props) {
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
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();
const logout = (props) => {
  AsyncStorage.removeItem("token").then(() => {
    navigation.replace("login");
  });
};
function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      style={styles.drawerItem}
    >
      <Drawer.Screen
        // name="LoginScreen"
        name="login"
        component={LoginScreen}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
          drawerIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          title: "Orders",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
          drawerIcon: () => <Feather name="list" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Reservations"
        component={Reservations}
        options={{
          title: "Reservations",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
          drawerIcon: () => <AntDesign name="table" size={24} color="black" />,
        }}
      />

      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "Cart",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
          drawerIcon: () => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={Logout}
        style={{ bottom: 0, position: "absolute" }}
        options={{
          title: "Logout",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
          drawerIcon: () => (
            <MaterialIcons name="logout" size={24} color="black" />
          ),
        }}
      /> */}
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
    fontWeight: "bold",
  },
});

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
