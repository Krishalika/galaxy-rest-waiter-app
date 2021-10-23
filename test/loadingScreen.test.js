import React from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getByLabelText } = render(
    <LoadingScreen />
  );

});