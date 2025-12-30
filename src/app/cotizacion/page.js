"use client";
import ProductsList from "@/components/cotizacion/CotizacionPage/ProductsList";

const Cotizacion = () => {
  return (
    <div className="flex flex-col items-start mx-6 md:mx-20 lg:mx-40">
      <h1 className="text-xl mb-5">Cotización</h1>
      <section className="flex flex-col items-start mb-12 w-full">
        <ProductsList />
      </section>
    </div>
  );
};

export default Cotizacion;
