import React, { createContext, useReducer, useContext } from "react";
import foods from "../consts/Foods";
import { cartReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { foods: foods, cart: [] });

  return (
    //cart provider will wrap up all the app
    <Cart.Provider value={{ state, dispatch }}>
      {/* the children come from app.js file where the app starts */}
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  //useContext takes the context, cartContext
  return useContext(Cart);
};
