"use client";
import useProduct from "@/hooks/useProduct";
import ProductListPLP from "@/components/products/ProductListPLP";
import { Suspense } from "react";

const PLPPage = () => {
  const { dispatch } = useProduct();

  return (
    <>
      <Suspense fallback={<p>Cargando productos</p>}>
        <ProductListPLP />
      </Suspense>
    </>
  );
};

export default PLPPage;
