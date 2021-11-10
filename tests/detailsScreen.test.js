import React from "react"
import DetailsScreen from "../screens/DetailsScreen";
import { render, fireEvent, act,waitFor  } from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe('<DetailsScreen />',  () => {
  const mockStore = configureStore([]);
  const push = jest.fn();
  it("renders default elements", async () => {

    const store = mockStore();

    // const { getAllByText, getByPlaceholderText} = render(<Provider store={store}><Home/></Provider>);
    // expect(getAllByText("Get Started").length).toBe(1);
    // expect(getByPlaceholderText("Your Name"))
    // expect(getByPlaceholderText("Your NIC Number"))
    
    // const {getByTitle}=render(<Provider store={store}><Categories
    //   navigation={
    //     {
    //       setOptions: push
    //     }
    //   }/></Provider>);
    // expect(fetch.mock.calls).toMatchSnapshot();
  });
})