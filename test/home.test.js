import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../screens/Home";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("<Home />", () => {
  const mockStore = configureStore([]);
  it("renders default elements", () => {
    const store = mockStore();
    const { getAllByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    //   expect(getAllByText("Get Started").length).toBe(1);
    //   expect(getByPlaceholderText("Your Name"))
    //   expect(getByPlaceholderText("Your NIC Number"))
  });
});
