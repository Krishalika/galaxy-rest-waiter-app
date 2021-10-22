import React from "react";
import DetailsScreen from "../screens/DetailsScreen";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

it("renders default elements", () => {
    const mockStore = configureStore([]);

  const store = mockStore();
  const { getByLabelText, getAllByPlaceholderText,getAllByText } = render(
    <Provider store={store}><DetailsScreen /></Provider>
  );
 expect(getAllByText("Details").length).toBe(1);

  // getByLabelText("CustomerName");
  // getByLabelText("Price");
  // getAllByPlaceholderText("Table Number");
  // getAllByPlaceholderText("Customer Name");
  // getAllByPlaceholderText("Total Price");
});


// const flushMicrotasksQueue = () =>
//   new Promise((resolve) => setImmediate(resolve));

// it("renders default elements", () => {
//   // let store;
//   const mockStore = configureStore([]);

//   const store = mockStore();

//   const { getAllByText } = render(
//     <Provider store={store}>
//       <DetailsScreen />
//     </Provider>
//   );
//   //   const { getByTestId } = render(<Provider store={store}><DetailsScreen /></Provider>
//   //     );
//   expect(getAllByText("Details").length).toBe(1);

  //   getByTestId("picture");
// });

// it("it should handle valid input submission", async () => {
//   fetch.mockResponseOnce(JSON.stringify({ passes: true }));

//   const pushMock = jest.fn();
//   const { getByTestId } = render(
//     <DetailsScreen navigation={{ replace: pushMock }} />
//   );

//   fireEvent.press(getByTestId("DetailsScreen.Button"));

//   await act(flushMicrotasksQueue);

//   //   expect(pushMock).toBeCalledWith("Cart");
// });

// import React from "react";
// import DetailsScreen from "../../screens/DetailsScreen";
// import { render, fireEvent, act } from "@testing-library/react-native";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";

// const flushMicrotasksQueue = () =>
//   new Promise((resolve) => setImmediate(resolve));

// describe("<DetailsScreen />", () => {
//   const mockStore = configureStore([]);
//   it("renders default elements", () => {
//     const store = mockStore();
//     // const { getAllByText, getByPlaceholderText} = render(<Provider store={store}><DetailsScreen/></Provider>);
//     const { getAllByText } = render(
//       <Provider store={store}>
//         <DetailsScreen />
//       </Provider>
//     );

//     expect(getAllByText("Details").length).toBe(1);
//     // expect(getByPlaceholderText("Your Name"))
//     // expect(getByPlaceholderText("Your NIC Number"))
//   });
// });
