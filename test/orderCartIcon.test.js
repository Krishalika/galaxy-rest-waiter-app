import React from "react";
import orderCartIcon from "../shared/orderCartIcon";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getAllByText } = render(
    <orderCartIcon />
  );
//   getAllByText("0");
// expect(getAllByText("0").length).toBe(1);

});