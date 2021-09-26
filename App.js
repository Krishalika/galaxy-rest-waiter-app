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
import Toast from 'react-native-toast-message';
// import { Provider } from "react-redux";
import Context from "./src/context/Context";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
const Stack = createStackNavigator();

export default function App() {

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <DrawerNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)}/>
      </PersistGate>
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
