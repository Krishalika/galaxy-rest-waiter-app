import { createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import {combineReducers} from 'redux';

const combinedReducers = combineReducers({ cartReducer });

const store = createStore(combinedReducers);

export default store;
