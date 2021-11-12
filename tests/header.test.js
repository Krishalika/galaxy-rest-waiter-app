import React from "react";
import Header from "../shared/Header";
import { render } from "@testing-library/react-native";

it("renders default elements", () => {
  const { getByTestId } = render(<Header />);
  getByTestId("logo");
});
