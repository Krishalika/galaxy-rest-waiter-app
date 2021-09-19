import React, { createContext, useReducer } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import {
  reducer as reducerReservation,
  initialState,
} from "../reducer/ReservationReducer";

export const ReservationContext = createContext();
export const ReservationProider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerReservation, initialState);
  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};
