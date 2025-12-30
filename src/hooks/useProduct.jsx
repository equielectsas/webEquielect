"use client";
import { useContext } from "react";
import { ProductContext } from "@/context/Products/ProductContext";

const useProduct = () => {
  return useContext(ProductContext);
};

export default useProduct;
