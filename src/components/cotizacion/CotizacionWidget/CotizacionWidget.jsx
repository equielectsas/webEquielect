"use client";

import { useRouter } from "next/navigation";
import useCotizacion from "@/hooks/useCotizacion";
import { ACTIONS } from "@/constants/ACTIONS";
import CotizacionItem from "./CotizacionItem";

const CotizacionWidget = () => {
  const { state, dispatch } = useCotizacion();
  const { cotizacionProducts } = state;
  const router = useRouter();

  const clearCart = () => {
    dispatch({
      type: ACTIONS.removeAllProductsFromCotizacion,
    });
  };

  return (
    <div className="mx-auto h-lvh max-w-md rounded-xl bg-white p-6 shadow-lg">
      <div className=" flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Resumen Cotización
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {cotizacionProducts.length}{" "}
            {cotizacionProducts.length === 1 ? "producto" : "productos"}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {cotizacionProducts.length > 0 ? (
            <div className="space-y-4">
              {cotizacionProducts.map((product, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-200 hover:-translate-y-1"
                >
                  <CotizacionItem product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">No hay productos en la cotización</p>
              <p className="mt-2 text-sm text-gray-400">
                Agrega productos para comenzar
              </p>
            </div>
          )}
        </div>
      </div>

      {cotizacionProducts.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full bg-white p-6">
          <div className="space-y-3">
            <button
              onClick={() => {
                router.push("/cotizacion");
                dispatch({ type: ACTIONS.turnOffCotizacionState });
              }}
              className="w-full transform bg-[rgb(253,216,53)] px-6 py-3 font-semibold text-gray-800 shadow-md transition-all duration-200 hover:bg-yellow-400 hover:shadow-lg active:scale-95"
            >
              <span className="flex items-center justify-center">
                Crear cotización
                <svg
                  className="ml-2 h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-600 active:scale-95"
            >
              Eliminar productos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CotizacionWidget;
