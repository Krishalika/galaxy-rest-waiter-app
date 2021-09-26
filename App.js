import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import DetailsScreen from "./Screens/DetailsScreen";
import Cart from "./Screens/Cart";
import Reservations from "./Screens/Reservations";
import { Provider } from "react-redux";
import store from "./redux/store";
//components
import DrawerNavigation from "./Navigators/DrawerNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Provider } from "react-redux";
import Context from "./src/context/Context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <DrawerNavigation />
    </Provider>
  );

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator headerMode="none">
  //       <Stack.Screen name="Login" component={Login} />
  //       {/* <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} /> */}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  // return (
  //   <Context>
  //     <DrawerNavigation />
  //   </Context>
  // );
}
