import React from "react";
import Header from "../Header/Header";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getByTestId } = render(
    <Header />
  );
  getByTestId("logo");

});