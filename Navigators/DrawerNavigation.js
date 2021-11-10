import * as React from "react";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../Screens/Home";
import Orders from "../Screens/Orders";
import Reservations from "../Screens/Reservations";
import Cart from "../Screens/Cart";
import COLORS from "../styles/colors";
import DetailsScreen from "../Screens/DetailsScreen";
import LoginScreen from "../Screens/LoginScreen";
import OrderDetails from "../Screens/OrderDetails";
import ReservationsForm from "../Screens/ReservationsForm";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CustomDrawerContent(props) {
  const logout = () => {
    AsyncStorage.removeItem("token").then(() => {
      // props.navigation.replace("login");
      props.navigation.navigate("LoginScreen");
    });
  };
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
          label="Logout"
          // onPress={() => props.navigation.navigate("LoginScreen")}
          // navigation.navigate('MyDrawer', { screen: 'LoginScreen' });
          onPress={() =>
            props.navigation.navigate("CustomDrawerContent", { screen: "LoginScreen" })
          }

          // onPress={logout}
        /> */}
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      style={styles.drawerItem}
    >
      <Drawer.Screen
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
          title: "Order Details",
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
          title: "Table Reservations",
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

      <Drawer.Screen
        name="ReservationsForm"
        component={ReservationsForm}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      />

      {/* <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: "Logout",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24},
          headerTintColor: "#03498f",
          drawerIcon: () => <AntDesign name="table" size={24} color="black" />,
        }}
      /> */}
      {/* <DrawerContentScrollView>
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate("LoginScreen")}
        />
      </DrawerContentScrollView> */}
      {/* <DrawerContentScrollView >
        <DrawerItemList/>
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate("LoginScreen")}
        />
      </DrawerContentScrollView> */}
      {/* <Drawer.Screen
        name="Cart1"
        component={Cart}
        options={{
          title: "Cart",
          headerStyle: { backgroundColor: "#08b8e1", height: 56 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
          headerTintColor: "#03498f",
          drawerIcon: () => (
            <Icon
              name="logout"
              size={24}
              color="black"
              onPress={logout}
              style={{ marginLeft: 360 }}
            />
          ),
        }}
      /> */}

      {/* <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => props.navigation.navigate("Login")} />
      </DrawerContentScrollView>
    )
  }}> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    left: 20,
  },
  headerLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: "absolute",
  },
  logo: {
    position: "absolute",
    right: 165,
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
