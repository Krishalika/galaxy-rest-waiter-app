import React from "react";
import Cart from "../screens/Cart";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("<Cart />", () => {
  const mockStore = configureStore([]);
  const push = jest.fn();
  it("renders default elements", async () => {
    const store = mockStore();
    const { getAllByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(getAllByText("Your Cart is Empty !").length).toBe(1);
    expect(getByPlaceholderText("Customer Name"));
    expect(getByPlaceholderText("Customer NIC Number"));
    expect(getByPlaceholderText("Table Number"));
    // const {getByTitle}=render(<Provider store={store}><Categories
    //   navigation={
    //     {
    //       setOptions: push
    //     }
    //   }/></Provider>);
    // expect(fetch.mock.calls).toMatchSnapshot();
  });
});
