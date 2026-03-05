"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import ThankYouPage from "@/components/utils/ThankYouPage/ThankYouPage";
import { Card } from "@/utils/tailwind/index";
import ProductItem from "./ProductItem";
import CotizacionForm from "@/components/cotizacion/CotizacionPage/Form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3900";

/**
 * Nota importante:
 * - Antes tenías: const { cotizacionProducts } = state;  -> state NO existía.
 * - Aquí guardamos la cotización en localStorage (cliente) para que no reviente el build.
 * - Si en tu app ya existe un Context/Redux, luego lo conectas; por ahora esto te deja desplegar.
 */
const ProductsList = () => {
  const [cotizacionProducts, setCotizacionProducts] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cargar cotización desde localStorage (si existe)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cotizacionProducts");
      const parsed = raw ? JSON.parse(raw) : [];
      setCotizacionProducts(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCotizacionProducts([]);
    }
  }, []);

  const hasProducts = useMemo(
    () => Array.isArray(cotizacionProducts) && cotizacionProducts.length > 0,
    [cotizacionProducts]
  );

  const sendCotizacion = async (userInfo) => {
    // Si no hay backend en producción, al menos no rompas la UI:
    try {
      const response = await fetch(`${API_URL}/api/cotizacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInfo,
          cotizacionProducts,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setIsSubmitted(true);
        // Opcional: limpiar cotización local
        try {
          localStorage.removeItem("cotizacionProducts");
        } catch {}
      } else {
        console.error("Error:", data?.error || data);
        alert("Error al enviar la cotización");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert(
        "No se pudo conectar con el servidor de cotización (backend)."
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="ml-16">
        <ThankYouPage
          title="¡Cotización enviada con éxito!"
          message="Hemos recibido tu mensaje. En breve nos pondremos en contacto contigo."
          buttonText="Ir al inicio"
          redirectPath="/"
        />
      </div>
    );
  }

  if (!hasProducts) {
    return (
      <div className="ml-10">
        <ThankYouPage
          title="No tienes cotizaciones por hacer"
          message="Para cotizar, navega por las categorías en el sitio, o busca tu producto."
          buttonText="Elegir productos"
          redirectPath="/productos"
        />
      </div>
    );
  }

  return (
    <>
      <Card className="h-full w-full">
        <table className="w-full table text-left">
          <tbody className="w-full">
            {cotizacionProducts.map((product, idx) => (
              <ProductItem key={product?.id ?? product?._id ?? idx} product={product} />
            ))}
          </tbody>
        </table>
      </Card>

      <CotizacionForm sendCotizacion={sendCotizacion} />
    </>
  );
};

export default ProductsList;