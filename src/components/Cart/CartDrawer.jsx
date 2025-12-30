"use client";
import React from "react";
import { useCart } from "@/context/Cart/CartContext";

const formatCOP = (n) =>
  Number(n).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

export default function CartDrawer({ open, onClose }) {
  const { items, total, incQty, decQty, removeItem, clear } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[100] h-full w-[360px] bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderRadius: 0 }}
      >
        {/* Header */}
        <div className="bg-[#1c355e] text-white px-4 py-4 flex items-center justify-between">
          <div className="font-extrabold">Tu carrito</div>
          <button className="text-white/90 hover:text-white" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <div className="border border-gray-200 p-4 text-sm text-gray-600">
              Tu carrito está vacío.
            </div>
          ) : (
            <div className="grid gap-3">
              {items.map((it) => (
                <div key={it.id} className="border border-gray-200 p-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 border border-gray-200 bg-gray-50 overflow-hidden">
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="text-xs text-gray-500 font-semibold">{it.brand}</div>
                      <div className="text-sm font-bold text-[#1c355e] line-clamp-2">{it.name}</div>
                      <div className="text-sm font-extrabold mt-1">{formatCOP(it.price)}</div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="w-8 h-8 border border-gray-300 font-bold hover:bg-gray-50"
                          onClick={() => decQty(it.id)}
                        >
                          -
                        </button>
                        <div className="min-w-[36px] text-center font-bold">{it.qty}</div>
                        <button
                          className="w-8 h-8 border border-gray-300 font-bold hover:bg-gray-50"
                          onClick={() => incQty(it.id)}
                        >
                          +
                        </button>

                        <button
                          className="ml-auto text-xs font-bold text-red-600 hover:underline"
                          onClick={() => removeItem(it.id)}
                        >
                          Quitar
                        </button>
                      </div>

                      <div className="mt-2 text-xs text-gray-600">
                        Subtotal:{" "}
                        <span className="font-bold">
                          {formatCOP(it.qty * Number(it.price))}
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
            <span className="text-sm font-semibold text-gray-700">Total</span>
            <span className="text-lg font-extrabold text-[#1c355e]">{formatCOP(total)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className="border border-gray-300 font-bold py-2 hover:bg-gray-50"
              onClick={clear}
            >
              Vaciar
            </button>
            <button className="bg-[#ffcd00] font-extrabold py-2 hover:opacity-90">
              Comprar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
