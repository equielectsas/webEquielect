"use client";
import { useReducer } from "react";
import { initialState, productReducer } from "./ProductReducer";
import { ProductContext } from "./ProductContext";

export const AppProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
