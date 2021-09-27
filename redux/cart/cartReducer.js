import * as actionTypes from "./cartActions";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  items: [],
};

// state and action -> new state
function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_CART:
      return { ...state, items: [] };
    case actionTypes.ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };
    case actionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        items: state.items.filter((el) => !(el._id === action.item._id)),
      };
    default:
      return state;
  }
}

const persistConfig = {
  keyPrefix: "galaxy-rest-",
  key: "cart-list",
  blacklist: ["loading"],
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, reducer);
