"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent_v1");
    if (!saved) setOpen(true);
  }, []);

  const accept = () => {
    localStorage.setItem(
      "cookie_consent_v1",
      JSON.stringify({ status: "accepted", ts: Date.now() })
    );
    setOpen(false);
  };

  const reject = () => {
    localStorage.setItem(
      "cookie_consent_v1",
      JSON.stringify({ status: "rejected", ts: Date.now() })
    );
    setOpen(false);
  };

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-white border border-gray-200 shadow-lg">
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Texto */}
            <p className="text-sm text-gray-700 leading-relaxed">
              Este sitio utiliza cookies para mejorar su experiencia de navegación. La
              información detallada sobre el uso de cookies en este sitio está disponible en
              nuestro{" "}
              <Link
                href="/politica-privacidad"
                className="font-semibold text-equielect-blue hover:underline underline-offset-4"
              >
                Aviso de Privacidad
              </Link>
              . Utilice las opciones para configurar sus preferencias en cuanto a la recogida
              de cookies.
            </p>

            {/* Acciones (como la imagen) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-3 sm:gap-4">
              <button
                onClick={reject}
                className="px-5 py-2.5 bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                style={{ borderRadius: 8 }}
                type="button"
              >
                Rechazar
              </button>

              <button
                onClick={accept}
                className="px-6 py-2.5 bg-[#1c355e] text-white font-semibold hover:opacity-90 transition"
                style={{ borderRadius: 8 }}
                type="button"
              >
                Aceptar
              </button>

              <button
                onClick={() => alert("Aquí abres tu modal de preferencias")}
                className="text-[#1c355e] font-semibold hover:underline underline-offset-4"
                type="button"
              >
                Preferencias
              </button>

              <button
                onClick={close}
                className="ml-1 p-2 text-gray-500 hover:text-gray-800 transition"
                aria-label="Cerrar"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* helpers de color si ya los tienes global, esto no hace daño */}
      <style jsx global>{`
        .text-equielect-blue {
          color: #1c355e;
        }
      `}</style>
    </div>
  );
}
