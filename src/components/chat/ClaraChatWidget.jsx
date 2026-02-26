"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/**
 * WhatsApp-style Widget • Equielect
 * - No bot replies
 * - Collects short text + sends to WhatsApp
 * - Green WhatsApp look
 * - Saves last message in localStorage
 */

const COMPANY = "Equielect";
const SUBTITLE = "Un asesor te responderá pronto";
const WA_AVATAR = "/assets/chat/Logo_whatsapp.png"; // tu ícono/imagen

const CONTACT = {
  whatsappNumber: "573001112233", // ✅ SIN +, con indicativo
  defaultMessage: "Hola, necesito ayuda rápida con Equielect.",
};

const LS_KEY = "equielect_whatsapp_widget_v1";

function buildWaLink(number, message) {
  const clean = String(number).replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message || "")}`;
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [hideUI, setHideUI] = useState(false);

  const [input, setInput] = useState("");
  const [lastSent, setLastSent] = useState("");

  const greetedRef = useRef(false);
  const inputRef = useRef(null);

  // ✅ cargar último mensaje
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed?.lastSent === "string") setLastSent(parsed.lastSent);
      }
    } catch (_) {}
  }, []);

  // ✅ persistir
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ lastSent }));
    } catch (_) {}
  }, [lastSent]);

  // ✅ cuando abra, focus y saludo 1 sola vez (opcional)
  useEffect(() => {
    if (!open) return;

    setTimeout(() => inputRef.current?.focus(), 50);

    if (!greetedRef.current) {
      greetedRef.current = true;
      // si quieres que abra con un texto sugerido:
      // setInput(CONTACT.defaultMessage);
    }
  }, [open]);

  // ✅ Listener del carrito (igual que antes)
  useEffect(() => {
    const onCart = (e) => {
      const cartOpen = !!e?.detail?.open;
      setHideUI(cartOpen);
      if (cartOpen) setOpen(false);
    };
    window.addEventListener("ui:cart", onCart);
    return () => window.removeEventListener("ui:cart", onCart);
  }, []);

  const canSend = useMemo(() => input.trim().length >= 2, [input]);

  const sendToWhatsApp = () => {
    const msg = input.trim() || CONTACT.defaultMessage;
    const url = buildWaLink(CONTACT.whatsappNumber, msg);
    setLastSent(msg);
    setInput("");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const panelClass =
    "fixed z-[9999] overflow-hidden flex flex-col " +
    "right-4 bottom-[92px] rounded-2xl " +
    "w-[calc(100vw-2rem)] max-w-[340px] h-[460px] " +
    "sm:right-5 sm:bottom-[96px] sm:w-[380px] sm:h-[500px] " +
    "shadow-2xl border border-[#d7efe3] bg-white";

  return (
    <>
      {/* FAB */}
      {!hideUI && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="fixed bottom-5 right-5 z-[9999] w-[58px] h-[58px] rounded-full shadow-xl bg-[#25D366] text-white grid place-items-center hover:opacity-95 active:scale-[0.98] overflow-hidden"
          aria-label="Abrir WhatsApp"
          type="button"
        >
          {open ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <Image
              src={WA_AVATAR}
              alt="WhatsApp"
              width={58}
              height={58}
              className="w-full h-full object-cover"
              priority
            />
          )}
        </button>
      )}

      {/* Panel */}
      {!hideUI && open && (
        <div className={panelClass}>
          {/* Header WhatsApp */}
          <div
            className="px-3 py-2.5 text-white flex items-center justify-between"
            style={{
              background: "linear-gradient(180deg, #1FA855 0%, #128C7E 100%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/25 bg-white/10">
                <Image
                  src={WA_AVATAR}
                  alt="WhatsApp"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="leading-tight">
                <div className="font-extrabold text-[13px]">{COMPANY}</div>
                <div className="text-[11px] text-white/90">{SUBTITLE}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/15"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3"
            style={{
              background:
                "radial-gradient(1200px 500px at 10% 0%, #e9fff2 0%, #f6fff9 40%, #ffffff 100%)",
            }}
          >
            {/* Mensaje fijo tipo WhatsApp */}
            <div className="flex justify-start">
              <div className="max-w-[92%] rounded-2xl rounded-bl-md px-3.5 py-3 text-[13px] leading-relaxed border border-[#d7efe3] bg-white shadow-sm">
                <div className="font-extrabold text-slate-900">Atención rápida por WhatsApp</div>
                <p className="mt-1 text-slate-600">
                  Escribe tu mensaje y te enviamos a WhatsApp para que un asesor te responda.
                </p>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#25D366]" />
                  Normalmente respondemos en breve.
                </div>
              </div>
            </div>

            {/* Último mensaje enviado */}
            {!!lastSent && (
              <div className="mt-3 flex justify-end">
                <div className="max-w-[92%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm bg-[#DCF8C6] text-slate-900 border border-[#cbeeb1]">
                  <div className="text-[11px] font-bold text-slate-700 mb-1">Último mensaje enviado</div>
                  <div style={{ whiteSpace: "pre-wrap" }}>{lastSent}</div>
                </div>
              </div>
            )}

            {/* Chips rápidos */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Necesito una cotización rápida",
                "Quiero saber disponibilidad",
                "Tengo un pedido y quiero estado",
                "Necesito factura",
                "Garantía / devolución",
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setInput(t)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-[#cfeee0] bg-white hover:bg-[#f2fff8] text-[#0f6a55] font-semibold"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-[#d7efe3] bg-white p-2.5">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canSend) sendToWhatsApp();
                }}
                placeholder="Escribe tu mensaje…"
                className="flex-1 border border-[#cfeee0] rounded-full px-3.5 py-2.5 text-[13px] outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
              />

              <button
                type="button"
                onClick={sendToWhatsApp}
                disabled={!canSend}
                className={`px-4 py-2.5 rounded-full text-[13px] font-extrabold transition ${
                  canSend
                    ? "bg-[#25D366] text-white hover:opacity-95 active:scale-[0.99]"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
                aria-label="Enviar a WhatsApp"
                title="Enviar a WhatsApp"
              >
                Enviar
              </button>
            </div>

            <div className="mt-2 text-[11px] text-slate-500">
              Al continuar, serás redirigido a WhatsApp para hablar con un asesor.
            </div>
          </div>
        </div>
      )}
    </>
  );
}