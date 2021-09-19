import React, { createContext, useReducer } from "react";
import { reducer as reducerOrder, initialState } from "../reducer/OrderReducer";

export const OrderContext = createContext();
export const OrderProider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerOrder, initialState);
  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};
