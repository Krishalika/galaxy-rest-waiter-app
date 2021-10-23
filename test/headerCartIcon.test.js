import React from "react";
import HeaderCartIcon from "../shared/headerCartIcon";
import { render, fireEvent, act } from "@testing-library/react-native";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

it("renders default elements", () => {
  const { getAllByText } = render(<HeaderCartIcon />);
  //   getAllByText("0");
  //expect(getAllByText("0").length).toBe(1);
});

// import React from "react";
// import HeaderCartIcon from "../shared/headerCartIcon";
// import { render, fireEvent, act } from "@testing-library/react-native";
// import {Provider} from 'react-redux';
// import configureStore from 'redux-mock-store';

// const flushMicrotasksQueue = () =>
//   new Promise((resolve) => setImmediate(resolve));
//   const mockStore = configureStore([]);

// it("renders default elements", () => {
//     const store = mockStore();

//   const { getByLabelText } = render(
//     <Provider store={store}><HeaderCartIcon /></Provider>
//   );

// });
