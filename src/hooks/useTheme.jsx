"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/Theme/ThemeContext";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
