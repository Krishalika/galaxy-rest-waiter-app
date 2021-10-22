import React from "react";
import ReservationsForm from "../screens/ReservationsForm";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getByLabelText, getAllByPlaceholderText } = render(
    <ReservationsForm />
  );

  getByLabelText("CustomerName");
  getByLabelText("Price");
  getAllByPlaceholderText("Table Number");
  getAllByPlaceholderText("Customer Name");
  getAllByPlaceholderText("Total Price");
});

it("it should handle valid input submission", async () => {
  fetch.mockResponseOnce(JSON.stringify({ passes: true }));

  const pushMock = jest.fn();
  const { getByTestId } = render(
    <ReservationsForm navigation={{ replace: pushMock }} />
  );

  fireEvent.changeText(
    getByTestId("ReservationsForm.customerName"),
    "Rathnayake"
  );
  fireEvent.changeText(getByTestId("ReservationsForm.price"), "4300");
  fireEvent.press(getByTestId("ReservationsForm.Button"));

  await act(flushMicrotasksQueue);
});
