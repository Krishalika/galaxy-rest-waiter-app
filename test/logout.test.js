import React from "react";
import Logout from "../screens/Logout";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getByLabelText } = render(
    <Logout />
  );

});