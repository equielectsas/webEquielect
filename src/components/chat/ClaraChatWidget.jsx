"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/**
 * Clara • Equielect S.A.S (bot por reglas)
 * - Texto libre + detección por palabras clave (intents)
 * - Respuestas predefinidas + botones opcionales
 * - Guarda conversación en localStorage
 */

const BOT_NAME = "Clara";
const COMPANY = "Equielect S.A.S";

// ✅ Avatar (tu imagen)
const CLARA_AVATAR = "/assets/chat/clara.png";

// ✅ Ajusta estos datos:
const CONTACT = {
  whatsappNumber: "573001112233", // <- pon tu número (con indicativo, sin +)
  whatsappMessage: "Hola, necesito ayuda con mi compra en Equielect.",
  supportEmail: "soporte@equielect.com", // <- pon tu correo
  phone: "+57 300 111 2233", // <- opcional
  hours: "Lun–Vie 8:00 a.m. – 5:30 p.m. | Sáb 8:00 a.m. – 12:00 m.",
  city: "Medellín, Colombia",
};

const LS_KEY = "clara_equielect_chat_v1";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function stripAccents(s = "") {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeText(s = "") {
  return stripAccents(String(s)).toLowerCase().trim();
}

function containsAny(text, arr) {
  return arr.some((k) => text.includes(k));
}

function extractOrderId(text) {
  const m =
    text.match(/(?:pedido|orden|order)\s*#?\s*([a-z0-9-]{4,})/i) ||
    text.match(/#\s*([a-z0-9-]{4,})/i);
  return m?.[1] || null;
}

function extractEmail(text) {
  const m = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return m?.[0] || null;
}

function extractPhone(text) {
  const m = text.match(/(\+?\d[\d\s-]{7,}\d)/);
  return m?.[1]?.trim() || null;
}

export default function ClaraChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {id, role: 'user'|'bot', text, options?}
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // ✅ cuando el carrito esté abierto, ocultamos el bot
  const [hideUI, setHideUI] = useState(false);

  // ✅ para saludar una sola vez al abrir (si quieres)
  const greetedRef = useRef(false);

  const listRef = useRef(null);

  // ✅ Knowledge base (palabras clave)
  const KB = useMemo(
    () => ({
      greeting: [
        "hola",
        "buenas",
        "buenos dias",
        "buenas tardes",
        "buenas noches",
        "hey",
        "holi",
        "saludos",
      ],
      help: [
        "necesito ayuda",
        "ayuda",
        "me ayudas",
        "soporte",
        "tengo una duda",
        "duda",
        "consulta",
        "informacion",
        "información",
      ],
      order: [
        "pedido",
        "orden",
        "order",
        "compra",
        "mi compra",
        "mi pedido",
        "estado del pedido",
        "seguimiento",
        "tracking",
        "guia",
        "guía",
      ],
      shipping: [
        "envio",
        "envío",
        "entrega",
        "domicilio",
        "transportadora",
        "mensajeria",
        "mensajería",
        "cuanto se demora",
        "tiempo de entrega",
      ],
      invoice: [
        "factura",
        "facturacion",
        "facturación",
        "nit",
        "radian",
        "dian",
        "comprobante",
        "documento",
        "credito",
        "crédito",
      ],
      returns: [
        "garantia",
        "garantía",
        "devolucion",
        "devolución",
        "cambio",
        "reclamo",
        "reclamar",
        "defecto",
        "dañado",
        "danado",
      ],
      product: [
        "producto",
        "precio",
        "cotizacion",
        "cotización",
        "disponible",
        "stock",
        "referencia",
        "catalogo",
        "catálogo",
        "marca",
        "compatibilidad",
      ],
      payment: [
        "pago",
        "pagar",
        "tarjeta",
        "transferencia",
        "pse",
        "nequi",
        "daviplata",
        "credito",
        "crédito",
      ],
      hours: ["horario", "horarios", "atienden", "atencion", "atención", "abren", "cierran"],
      location: [
        "direccion",
        "dirección",
        "ubicacion",
        "ubicación",
        "donde quedan",
        "sede",
        "ciudad",
        "medellin",
        "medellín",
      ],
      human: ["asesor", "humano", "persona", "llamar", "whatsapp", "hablar con alguien", "agente"],
      thanks: ["gracias", "muchas gracias", "perfecto", "listo", "ok gracias", "vale gracias"],
    }),
    []
  );

  function detectIntent(rawText) {
    const t = normalizeText(rawText);

    if (!t) return "empty";
    if (containsAny(t, KB.greeting)) return "greeting";
    if (containsAny(t, KB.thanks)) return "thanks";
    if (containsAny(t, KB.human)) return "human";
    if (containsAny(t, KB.order)) return "order";
    if (containsAny(t, KB.shipping)) return "shipping";
    if (containsAny(t, KB.invoice)) return "invoice";
    if (containsAny(t, KB.returns)) return "returns";
    if (containsAny(t, KB.product)) return "product";
    if (containsAny(t, KB.payment)) return "payment";
    if (containsAny(t, KB.hours)) return "hours";
    if (containsAny(t, KB.location)) return "location";
    if (containsAny(t, KB.help)) return "start";

    return "fallback";
  }

  function botResponse(intent, userText = "") {
    const orderId = extractOrderId(userText);
    const email = extractEmail(userText);
    const phone = extractPhone(userText);

    const baseOptions = [
      { label: "📦 Estado de pedido", value: "pedido" },
      { label: "🚚 Envíos", value: "envio" },
      { label: "🧾 Facturación", value: "factura" },
      { label: "🔁 Garantía / devoluciones", value: "garantia" },
      { label: "🔎 Productos / cotización", value: "producto" },
      { label: "👨‍💼 Hablar con un asesor", value: "asesor" },
    ];

    const flows = {
      start: () => ({
        text: `Soy ${BOT_NAME} 😊 ¿En qué te puedo ayudar? Escribe lo que necesites o toca una opción.`,
        options: baseOptions,
      }),

      greeting: () => ({
        text: `¡Hola! 👋 Soy ${BOT_NAME}, asistente de ${COMPANY}. Cuéntame qué necesitas (ej: “pedido”, “factura”, “envío”, “garantía”).`,
        options: baseOptions,
      }),

      thanks: () => ({
        text: `¡Con gusto! 🙌 Si necesitas otra cosa, dime “ayuda” o el tema (pedido, factura, envío, garantía…).`,
        options: baseOptions,
      }),

      order: () => {
        if (orderId) {
          return {
            text:
              `Perfecto ✅ Veo el número de pedido: **${orderId}**.\n` +
              `Para ayudarte mejor, dime:\n` +
              `1) ¿Quieres **estado** o **cambio de dirección**?\n` +
              `2) Si tienes correo asociado, escríbelo aquí.`,
            options: [
              { label: "📍 Ver estado", value: `estado pedido ${orderId}` },
              { label: "✍️ Cambiar dirección", value: `cambiar direccion pedido ${orderId}` },
              { label: "👨‍💼 Asesor", value: "asesor" },
            ],
          };
        }

        return {
          text:
            `📦 Para revisar tu pedido, escríbeme el número.\n` +
            `Ejemplo: “pedido 12345” o “orden #ABCD-1234”.`,
          options: [
            { label: "👨‍💼 Asesor", value: "asesor" },
            { label: "⬅️ Volver", value: "menu" },
          ],
        };
      },

      shipping: () => ({
        text:
          `🚚 Envíos y entregas:\n` +
          `• Tiempo depende de ciudad y disponibilidad.\n` +
          `• Si ya tienes guía, escríbeme: “guía 123…”\n` +
          `• Si es un pedido, envíame: “pedido 12345”`,
        options: [
          { label: "📦 Tengo un pedido", value: "pedido" },
          { label: "👨‍💼 Asesor", value: "asesor" },
          { label: "⬅️ Menú", value: "menu" },
        ],
      }),

      invoice: () => ({
        text:
          `🧾 Facturación:\n` +
          `• Si necesitas factura, dime: “factura” + tu número de pedido.\n` +
          `• Si eres empresa, puedes escribir tu NIT (opcional).\n\n` +
          `Si prefieres, puedes enviarme tu correo para enviarte instrucciones.`,
        options: [
          { label: "📦 Factura de un pedido", value: "factura pedido" },
          { label: "📩 Enviar mi correo", value: "mi correo es" },
          { label: "👨‍💼 Asesor", value: "asesor" },
        ],
      }),

      returns: () => ({
        text:
          `🔁 Garantías / devoluciones:\n` +
          `• Cuéntame el problema (ej: “llegó dañado”, “no funciona”, “cambio”).\n` +
          `• Ideal: número de pedido + fotos.\n\n` +
          `Escribe: “pedido 12345 llegó dañado”.`,
        options: [
          { label: "📦 Tengo pedido", value: "pedido" },
          { label: "👨‍💼 Asesor", value: "asesor" },
          { label: "⬅️ Menú", value: "menu" },
        ],
      }),

      product: () => ({
        text:
          `🔎 Productos / cotización:\n` +
          `Dime:\n` +
          `• Nombre o referencia\n` +
          `• Cantidad\n` +
          `• Ciudad de envío\n\n` +
          `Ejemplo: “Necesito cable UTP cat6, 5 rollos, Medellín”.`,
        options: [
          { label: "📦 Ver catálogo", value: "catalogo" },
          { label: "👨‍💼 Asesor", value: "asesor" },
          { label: "⬅️ Menú", value: "menu" },
        ],
      }),

      payment: () => ({
        text:
          `💳 Pagos:\n` +
          `Puedes pagar según lo que ofrezca tu tienda (tarjeta, transferencia, etc.).\n` +
          `Si me dices tu ciudad y el producto/pedido, te guío al mejor paso.`,
        options: [
          { label: "📦 Tengo un pedido", value: "pedido" },
          { label: "🔎 Quiero cotizar", value: "producto" },
          { label: "👨‍💼 Asesor", value: "asesor" },
        ],
      }),

      hours: () => ({
        text: `🕒 Horarios de atención:\n${CONTACT.hours}`,
        options: baseOptions,
      }),

      location: () => ({
        text: `📍 Ubicación:\n${CONTACT.city}\n\nSi quieres, dime tu ciudad para indicarte cobertura/envíos.`,
        options: baseOptions,
      }),

      human: () => {
        const wa = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
          CONTACT.whatsappMessage
        )}`;

        return {
          text:
            `👨‍💼 Claro. Te dejo contacto directo:\n\n` +
            `• WhatsApp: ${wa}\n` +
            `• Email: ${CONTACT.supportEmail}\n` +
            (CONTACT.phone ? `• Tel: ${CONTACT.phone}\n` : "") +
            `\nTambién puedes escribir aquí tu pedido y lo dejo listo para el asesor.`,
          options: [
            { label: "📦 Escribir mi pedido", value: "pedido" },
            { label: "⬅️ Menú", value: "menu" },
          ],
        };
      },

      fallback: () => ({
        text:
          `Te entendí a medias 😅\n` +
          `¿Tu duda es sobre **pedido**, **envío**, **factura**, **garantía** o **productos**?\n` +
          `Puedes escribirlo tal cual: “pedido”, “envío”…`,
        options: baseOptions,
      }),

      menu: () => ({
        text: `Perfecto. Elige una opción o escribe tu duda 👇`,
        options: baseOptions,
      }),
    };

    if (email) {
      return {
        text: `✅ Gracias. Guardé tu correo: **${email}**.\nAhora dime el motivo: pedido / factura / envío / garantía / productos.`,
        options: baseOptions,
      };
    }

    if (phone) {
      return {
        text: `✅ Gracias. Guardé tu número: **${phone}**.\nAhora dime el motivo: pedido / factura / envío / garantía / productos.`,
        options: baseOptions,
      };
    }

    const fn = flows[intent] || flows.fallback;
    return fn();
  }

  function pushBot(intent, userText = "") {
    setTyping(true);

    setTimeout(() => {
      const res = botResponse(intent, userText);
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "bot", text: res.text, options: res.options || [] },
      ]);
      setTyping(false);
    }, 350);
  }

  function handleSend(text) {
    const raw = (text ?? input).trim();
    if (!raw) return;

    setMessages((prev) => [...prev, { id: uid(), role: "user", text: raw }]);
    setInput("");

    const intent = detectIntent(raw);
    pushBot(intent, raw);
  }

  function handleOptionClick(value) {
    handleSend(value);
  }

  // ✅ cargar conversación
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      }
    } catch (_) {}

    setMessages([
      {
        id: uid(),
        role: "bot",
        text: `👋 Hola, soy ${BOT_NAME}, asistente de ${COMPANY}. ¿En qué te puedo ayudar hoy?`,
        options: [
          { label: "📦 Pedido", value: "pedido" },
          { label: "🚚 Envío", value: "envio" },
          { label: "🧾 Factura", value: "factura" },
          { label: "🔁 Garantía", value: "garantia" },
          { label: "🔎 Productos", value: "producto" },
          { label: "👨‍💼 Asesor", value: "asesor" },
        ],
      },
    ]);
  }, []);

  // ✅ persistir
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(messages));
    } catch (_) {}
  }, [messages]);

  // ✅ autoscroll
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  // ✅ al abrir el chat por primera vez, opcional: saludar (sin spamear)
  useEffect(() => {
    if (open && !greetedRef.current) {
      greetedRef.current = true;
      // si quieres saludar SOLO cuando abren (y no en el mount), descomenta:
      // setMessages((prev) => prev.length ? prev : [{
      //   id: uid(),
      //   role: "bot",
      //   text: `👋 Hola, soy ${BOT_NAME}. ¿En qué te puedo ayudar?`,
      //   options: [
      //     { label: "📦 Pedido", value: "pedido" },
      //     { label: "🚚 Envío", value: "envio" },
      //     { label: "🧾 Factura", value: "factura" },
      //     { label: "🔁 Garantía", value: "garantia" },
      //     { label: "🔎 Productos", value: "producto" },
      //     { label: "👨‍💼 Asesor", value: "asesor" },
      //   ],
      // }]);
    }
  }, [open]);

  // ✅ AQUÍ VA EL LISTENER DEL CARRITO (IMPORTANTE: dentro del componente)
  useEffect(() => {
    const onCart = (e) => {
      const cartOpen = !!e?.detail?.open;
      setHideUI(cartOpen);

      // ✅ si abren el carrito, cierro el chat
      if (cartOpen) setOpen(false);
    };

    window.addEventListener("ui:cart", onCart);
    return () => window.removeEventListener("ui:cart", onCart);
  }, []);

  // ✅ Panel tipo WhatsApp (más pequeño y sin salirse)
  const panelClass =
    "fixed z-[9999] bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col " +
    "right-4 bottom-[92px] rounded-2xl " +
    "w-[calc(100vw-2rem)] max-w-[330px] h-[460px] " +
    "sm:right-5 sm:bottom-[96px] sm:w-[360px] sm:h-[480px]";

  return (
    <>
      {/* ✅ si el carrito está abierto, ocultamos TODO el bot */}
      {!hideUI && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="fixed bottom-5 right-5 z-[9999] w-[56px] h-[56px] rounded-full shadow-xl bg-equielect-blue text-white grid place-items-center hover:opacity-95 active:scale-[0.98] overflow-hidden"
          aria-label="Abrir chat"
          type="button"
        >
          {open ? (
            <span className="text-xl leading-none">×</span>
          ) : (
            <Image
              src={CLARA_AVATAR}
              alt="Clara"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          )}
        </button>
      )}

      {/* ✅ Ventana */}
      {!hideUI && open && (
        <div className={panelClass}>
          {/* Header */}
          <div className="bg-equielect-blue text-white px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-white/10">
                <Image
                  src={CLARA_AVATAR}
                  alt="Clara"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="leading-tight">
                <div className="font-semibold text-[13px]">
                  {BOT_NAME} • {COMPANY}
                </div>
                <div className="text-[11px] text-white/80">Asistente virtual</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/10"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
            style={{ background: "#f7f8fc" }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-equielect-yellow text-equielect-blue rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                  }`}
                >
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {m.text?.split("**").map((part, idx) =>
                      idx % 2 === 1 ? <strong key={idx}>{part}</strong> : <span key={idx}>{part}</span>
                    )}
                  </div>

                  {m.role === "bot" && Array.isArray(m.options) && m.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.options.map((op) => (
                        <button
                          key={op.value}
                          type="button"
                          onClick={() => handleOptionClick(op.value)}
                          className="text-[11px] px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2 text-[13px] text-gray-600 shadow-sm">
                  {BOT_NAME} está escribiendo…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-2.5">
            <div className="flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Escribe… (ej: pedido 12345)"
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-[13px] outline-none focus:border-gray-400"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="px-4 py-2 rounded-full bg-equielect-blue text-white text-[13px] font-semibold hover:opacity-95 active:scale-[0.99]"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
