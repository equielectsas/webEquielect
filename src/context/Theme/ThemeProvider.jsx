"use client";
import { useReducer } from "react";
import { initialState, themeReducer } from "./ThemeReducer";
import { ThemeContext } from "./ThemeContext";

export const AppThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
