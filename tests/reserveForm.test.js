import React from "react";
import ReservationsForm from "../Screens/ReservationsForm";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
  const { getByLabelText } = render(<ReservationsForm />);

  getByLabelText("CustomerName");
  getByLabelText("CustomerEmail");
  getByLabelText("CustomerTel");
  getByLabelText("CustomerTable");
  getByLabelText("Price");
});

it("it should handle valid input submission", async () => {
  fetch.mockResponseOnce(JSON.stringify({ passes: true }));

  const pushMock = jest.fn();
  const { getByTestId } = render(
    <ReservationsForm navigation={{ replace: pushMock }} />
  );

  fireEvent.changeText(getByTestId("ReservationsForm.name"), "customer");
  fireEvent.changeText(
    getByTestId("ReservationsForm.email"),
    "customer@gmail.com"
  );
  fireEvent.changeText(getByTestId("ReservationsForm.tel"), "0702143765");
  fireEvent.changeText(getByTestId("ReservationsForm.table"), "1");
  fireEvent.changeText(getByTestId("ReservationsForm.price"), "6000");

  await act(flushMicrotasksQueue);
});
