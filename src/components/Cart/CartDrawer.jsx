"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { useCart } from "@/context/Cart/CartContext";

const money = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function CartDrawer({ open, onClose }) {
  const { items, total, cartCount, incQty, decQty, removeItem, clear } =
    useCart();

  // ✅ Cerrar con eventos (para esconder/mostrar widgets/bot)
  const closeWithEvents = useCallback(() => {
    // Notifica que el carrito se cerró
    window.dispatchEvent(new Event("cart:close"));
    window.dispatchEvent(new CustomEvent("ui:cart", { detail: { open: false } }));

    onClose?.();
  }, [onClose]);

  // ✅ Cuando abre, dispara eventos
  useEffect(() => {
    if (!open) return;

    window.dispatchEvent(new Event("cart:open"));
    window.dispatchEvent(new CustomEvent("ui:cart", { detail: { open: true } }));
  }, [open]);

  // ✅ Bloquea scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // ✅ ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeWithEvents();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeWithEvents]);

  if (!open) return null;

  return (
    <>
      {/* ✅ OVERLAY (encima de TODO, incluido el header) */}
      <div
        className="fixed inset-0 z-[999998] bg-black/35"
        onClick={closeWithEvents}
        aria-hidden="true"
      />

      {/* ✅ PANEL (encima de TODO) */}
      <aside
        className="
          fixed top-0 right-0 z-[999999]
          h-screen w-[380px] max-w-[92vw]
          bg-white border-l border-gray-200 shadow-2xl
          flex flex-col
        "
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="font-extrabold text-[#1c355e]">
            Carrito ({cartCount})
          </div>

          <button
            type="button"
            onClick={closeWithEvents}
            className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-100"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Lista (scroll) */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-sm text-gray-500">Tu carrito está vacío.</div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="border border-gray-200 p-3">
                  <div className="flex gap-3">
                    {/* Imagen si existe */}
                    <div className="relative w-16 h-16 bg-gray-50 border border-gray-200 flex-shrink-0">
                      {it.image ? (
                        <Image
                          src={it.image}
                          alt={it.name || it.title || "Producto"}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold text-[#1c355e] uppercase">
                        {it.brand || ""}
                      </div>
                      <div className="text-sm font-bold text-gray-900 truncate">
                        {it.name || it.title || "Producto"}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-sm font-extrabold text-gray-900">
                          {money(it.price)}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="text-xs font-bold text-red-500 hover:underline"
                        >
                          Quitar
                        </button>
                      </div>

                      {/* Cantidad */}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decQty(it.id)}
                          className="w-9 h-9 border border-gray-300 font-extrabold"
                        >
                          −
                        </button>
                        <div className="w-10 text-center font-bold">
                          {it.qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => incQty(it.id)}
                          className="w-9 h-9 border border-gray-300 font-extrabold"
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        Subtotal:{" "}
                        <span className="font-bold">
                          {money((it.qty || 0) * (it.price || 0))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-gray-700">Total</div>
            <div className="font-extrabold text-[#1c355e] text-lg">
              {money(total)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={clear}
              className="border border-gray-300 py-3 font-bold"
            >
              Vaciar
            </button>
            <button
              type="button"
              className="bg-[#ffcd00] py-3 font-extrabold"
            >
              Comprar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
