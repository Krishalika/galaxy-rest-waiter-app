import React from "react";
import LoginScreen from "../Screens/LoginScreen";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getByLabelText, getByTestId } = render(<LoginScreen />);

  getByTestId("logo");
  getByLabelText("Email");
  getByLabelText("Password");
});

it("it should handle valid input submission", async () => {
  fetch.mockResponseOnce(JSON.stringify({ passes: true }));

  const pushMock = jest.fn();
  const { getByTestId } = render(
    <LoginScreen navigation={{ replace: pushMock }} />
  );

  fireEvent.changeText(getByTestId("LoginScreen.pwInput"), "waiter");
  fireEvent.changeText(
    getByTestId("LoginScreen.emailInput"),
    "waiter@gmail.com"
  );

  await act(flushMicrotasksQueue);
});
