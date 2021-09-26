import { createStore } from "redux";
import cartReducer from "./cart/cartReducer";

const combinedReducers = combineReducers({ cartReducer });

const store = createStore(combinedReducers);

export default store;
