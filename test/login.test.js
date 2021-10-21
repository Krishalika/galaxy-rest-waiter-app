import React from "react";
import LoginScreen from "../screens/login";
import { render, fireEvent, act } from "@testing-library/react-native";

jest.useFakeTimers();


it ("renders", () => {
    render(<LoginScreen/>);
})
// etc.
// const flushMicrotasksQueue = () =>
//   new Promise((resolve) => setImmediate(resolve));

// it("renders default elements", () => {
//   const { getAllByText, getByLabelText, getByTestId } = render(<LoginScreen />);

//   expect(getAllByText("Welcome!").length).toBe(1);
//   expect(getAllByText("Login").length).toBe(1);
//   getByTestId("background");
//   getByLabelText("Email");
//   getByLabelText("Password");
// });

// it("it should handles valid input submission", async () => {
//   fetch.mockResponseOnce(JSON.stringify({ passes: true }));

//   const pushMock = jest.fn();
//   const { getByTestId } = render(
//     <LoginScreen navigation={{ replace: pushMock }} />
//   );

//   fireEvent.changeText(getByTestId("LoginScreen.pwInput"), "pass");
//   fireEvent.changeText(
//     getByTestId("LoginScreen.emailInput"),
//     "email@gmail.com"
//   );
//   fireEvent.press(getByTestId("LoginScreen.Button"));

//   expect(fetch.mock.calls).toMatchSnapshot();
//   await act(flushMicrotasksQueue);

//   expect(pushMock).toBeCalledWith("login");
// });
