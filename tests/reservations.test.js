import React from "react"
import Reservations from "../screens/Reservations";
import { render, fireEvent, act,waitFor  } from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe('<Reservations />',  () => {
  const mockStore = configureStore([]);
  const push = jest.fn();
  it("renders default elements", async () => {

    const store = mockStore();
    // const {getByTitle}=render(<Provider store={store}><Categories
    //   navigation={
    //     {
    //       setOptions: push
    //     }
    //   }/></Provider>);
    // expect(fetch.mock.calls).toMatchSnapshot();
  });
})