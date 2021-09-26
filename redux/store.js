import { createStore } from "redux";
import reducer from "./cart/cartReducer";

const store = createStore(reducer);

export default store;
