import React from "react";
import { NavigationContainer } from "@react-navigation/native";

//components
import DrawerNavigation from "./Navigators/DrawerNavigation";
import BottomTabNavigation from "./Navigators/BottomTabNavigation";

export default function App() {
  return <BottomTabNavigation />;
}
