import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./redux/store";
import DrawerNavigation from "./Navigators/DrawerNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const Stack = createStackNavigator();

export default function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DrawerNavigation />
        <Toast ref={(ref) => Toast.setRef(ref)} />
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
