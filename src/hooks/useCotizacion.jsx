"use client";
import { useContext } from "react";
import { CotizacionContext } from "@/context/Cotizacion/CotizacionContext";

const useCotizacion = () => {
  return useContext(CotizacionContext);
};

export default useCotizacion;
