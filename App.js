import React from "react";

//components
import DrawerNavigation from "./Navigators/DrawerNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";

const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           // options={{ headerShown: false }}
//         />
//         <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
//         {/* <DrawerNavigation />; */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
//   // return <DrawerNavigation />;
// }

export default function App() {
  return <DrawerNavigation />;
}
