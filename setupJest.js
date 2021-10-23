require('jest-fetch-mock').enableMocks()

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-gesture-handler', () => { return {} })


import { Provider } from 'react-redux'
// import { makeStore } from '../dataLayer'

const TestProvider = ({
  store,
  children
}) => <Provider store={store}>{children}</Provider>

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
}

// export function makeTestStore(opts = {}) {
//   const store = makeStore(opts)
//   const origDispatch = store.dispatch
//   store.dispatch = jest.fn(origDispatch)
//   return store
// }




import { NativeModules as RNNativeModules } from "react-native";
RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
  State: { BEGAN: "BEGAN", FAILED: "FAILED", ACTIVE: "ACTIVE", END: "END" },
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),

};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false
};