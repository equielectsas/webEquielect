"use client";

import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Trash2, MessageCircle } from "lucide-react";
import { useQuote } from "@/context/Quote/QuoteContext";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573136056450"; 
// 👉 Pon acá el número real en formato internacional (sin +): 57XXXXXXXXXX

function buildWhatsappText(items) {
  const lines = items.map((p, i) => {
    const code = p.code ? ` | Código: ${p.code}` : "";
    const brand = p.brand ? ` | Marca: ${p.brand}` : "";
    return `- ${p.title}${brand}${code} | Cant: ${p.qty}`;
  });

  return [
    "Hola Equielect",
    "Quiero cotizar estos productos:",
    "",
    ...lines,
    "",
    "Gracias.",
  ].join("\n");
}

export default function QuoteDrawer({ open, onClose }) {
  const { items, removeItem, setQty, clear } = useQuote();

  const mounted = typeof window !== "undefined";

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const whatsappLink = useMemo(() => {
    const text = buildWhatsappText(items);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [items]);

  if (!mounted) return null;

  return createPortal(
    <div className={`fixed inset-0 z-[9999] ${open ? "" : "pointer-events-none"}`}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel left */}
      <aside
        className={`absolute left-0 top-0 h-full w-[320px] sm:w-[380px] bg-white shadow-2xl transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <p className="text-equielect-blue font-extrabold text-lg">Cotización</p>
              <p className="text-xs text-gray-500">Productos seleccionados</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>

          {/* content */}
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed p-4 text-center text-gray-500">
                Aún no has agregado productos a cotización.
              </div>
            ) : (
              items.map((p) => (
                <div key={p.id} className="border rounded-xl p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{p.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {p.brand ? `Marca: ${p.brand}` : ""}
                        {p.code ? `  ·  Código: ${p.code}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(p.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Cantidad</span>
                      <input
                        type="number"
                        min={1}
                        value={p.qty || 1}
                        onChange={(e) => setQty(p.id, e.target.value)}
                        className="w-20 border rounded-lg px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* footer */}
          <div className="p-4 border-t space-y-2">
            <a
              href={items.length ? whatsappLink : "#"}
              onClick={(e) => {
                if (!items.length) e.preventDefault();
              }}
              target="_blank"
              rel="noreferrer"
              className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 font-bold ${
                items.length
                  ? "bg-[#25D366] text-white hover:opacity-95"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <MessageCircle size={18} />
              Ir a cotizar por WhatsApp
            </a>

            <button
              onClick={clear}
              className={`w-full rounded-xl py-3 font-semibold border ${
                items.length ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!items.length}
            >
              Limpiar lista
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
