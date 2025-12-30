"use client";
import { useReducer } from "react";
import { initialState, cotizacionReducer } from "./CotizacionReducer";
import { CotizacionContext } from "./CotizacionContext";

export const AppCotizacionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cotizacionReducer, initialState);

  return (
    <CotizacionContext.Provider value={{ state, dispatch }}>
      {children}
    </CotizacionContext.Provider>
  );
};
