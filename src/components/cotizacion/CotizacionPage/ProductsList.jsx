"use client";

import { useState } from "react";
import ThankYouPage from "@/components/utils/ThankYouPage/ThankYouPage";
import { Card } from "@/utils/tailwind/index";
import useCotizacion from "@/hooks/useCotizacion";
import ProductItem from "./ProductItem";
import CotizacionForm from "@/components/cotizacion/CotizacionPage/Form";

const ProductsList = () => {
  const { state } = useCotizacion();
  const { cotizacionProducts } = state;

  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const sendCotizacion = async (userInfo) => {
    try {
      const response = await fetch("http://localhost:3900/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInfo,
          cotizacionProducts,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Error:", data.error);
        alert("Error al enviar la cotización");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error al conectar con el servidor");
    }
  };
  if (isSubmitted) {
    return (
      <div className="ml-16">
        <ThankYouPage
          title="¡Cotizacion enviada con éxito!"
          message="Hemos recibido tu mensaje. En breve nos pondremos en contacto contigo."
          buttonText="Ir al inicio"
          redirectPath="/"
        />
      </div>
    );
  }

  if (cotizacionProducts.length <= 0)
    return (
      <div className="ml-10">
        <ThankYouPage
          title="No tienes cotizaciones por hacer"
          message="Para cotizar, navega por las categorias en el sitio, o busque su producto"
          buttonText="Elegir productos"
          redirectPath="/productos"
        />
      </div>
    );

  return (
    <>
      <Card className="h-full w-full">
        <table className="w-full table text-left">
          <tbody className="w-full ">
            {cotizacionProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </Card>

      <CotizacionForm sendCotizacion={sendCotizacion} />
    </>
  );
};

export default ProductsList;
