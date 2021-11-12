import React from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { render } from "@testing-library/react-native";

it("renders default elements", () => {
  render(<LoadingScreen />);
});
