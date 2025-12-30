"use client";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
        La página que buscas no existe.
      </h2>
      <p className="text-lg sm:text-xl text-center text-gray-600 max-w-lg">
        Es posible que el enlace sea incorrecto o que el contenido haya sido
        movido.
      </p>

      <div className="mt-8">
        <Link href="/">
          <button className="px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 font-medium text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
            Volver al inicio
          </button>
        </Link>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          ¿Necesitas ayuda o asistencia?{" "}
          <Link
            href="/contactanos"
            className="text-gray-800 underline hover:text-gray-600"
          >
            Contáctanos
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
