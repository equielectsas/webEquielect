"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/**
 * WhatsApp Bot Widget • Equielect
 * - Estilo WhatsApp (sin degradados / sin opacidad verde encima)
 * - Contestadora automática: responde saludos e intenciones rápidas
 * - "Abrir chat" SOLO aparece si el bot detecta que quiere asesor (y NO auto)
 * - Si el usuario escribe "asesor" / "quiero hablar con un asesor":
 *   1) pide el nombre
 *   2) muestra loader
 *   3) abre WhatsApp automáticamente (sin botón)
 * - Mensaje a WhatsApp: CORTO (sin historial) + Nombre
 * - Guarda conversación en localStorage
 */

const COMPANY = "Equielect";
const SUBTITLE = "Más que negocios, hacemos amigos.";
const WA_AVATAR = "/assets/chat/logo_whats.png"; // png ideal con transparencia

const CONTACT = {
  whatsappNumber: "573146453033", // ✅ SIN +, con indicativo
  defaultMessage: "Hola, necesito ayuda con mi compra en Equielect.",
};

const LS_KEY = "equielect_whatsapp_bot_widget_v3";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function normalize(s = "") {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function buildWaLink(number, message) {
  const clean = String(number).replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message || "")}`;
}

// Loader pequeño (bolitas) estilo WhatsApp
function DotsLoader() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:120ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:240ms]" />
    </span>
  );
}

export default function WhatsAppBotWidget() {
  const [open, setOpen] = useState(false);
  const [hideUI, setHideUI] = useState(false);

  // mensajes del widget
  const [messages, setMessages] = useState([]); // {id, role:'bot'|'user', text}
  const [input, setInput] = useState("");

  // typing del bot
  const [typing, setTyping] = useState(false);

  // ✅ pedir nombre (solo cuando toca hablar con asesor)
  const [askName, setAskName] = useState(false);
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  // ✅ si se activa, al recibir nombre abre WA automático
  const [autoHandoff, setAutoHandoff] = useState(false);

  // ✅ mostrar botón "Abrir chat" solo cuando el bot lo permita
  const [showOpenChat, setShowOpenChat] = useState(false);

  // ✅ tema (para mensaje corto a WhatsApp)
  const [topic, setTopic] = useState("general"); // general | quote | order | invoice | warranty

  // ✅ loader antes de abrir whatsapp
  const [connecting, setConnecting] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const greetedRef = useRef(false);

  // =========================
  // Mensajes cortos a WhatsApp (SIN HISTORIAL)
  // =========================
  const buildShortWhatsAppMessage = (customerName) => {
    const nm = (customerName || "").trim();

    // base fijo: encabezado + nombre
    const baseHeader = `Mensaje personalizado BOT WEB\n\nNombre: ${nm || "No especifica"}\n\n`;

    if (topic === "quote") {
      return (
        baseHeader +
        "Quisiera saber más información sobre una cotización.\n" +
        "¿Un asesor puede ayudarme?"
      );
    }

    if (topic === "order") {
      return (
        baseHeader +
        "Hola, necesito ayuda con mi pedido.\n" +
        "¿Un asesor puede ayudarme?"
      );
    }

    if (topic === "invoice") {
      return (
        baseHeader +
        "Hola, necesito ayuda con una factura.\n" +
        "¿Un asesor puede ayudarme?"
      );
    }

    if (topic === "warranty") {
      return (
        baseHeader +
        "Hola, necesito ayuda con garantía/devolución.\n" +
        "¿Un asesor puede ayudarme?"
      );
    }

    // general
    return (
      baseHeader +
      "Hola, necesito ayuda con mi compra en Equielect.\n" +
      "¿Un asesor puede ayudarme?"
    );
  };

  const openWhatsApp = (customerName) => {
    const msg = buildShortWhatsAppMessage(customerName);
    window.open(buildWaLink(CONTACT.whatsappNumber, msg), "_blank", "noopener,noreferrer");
  };

  const autoOpenWhatsApp = (customerName) => {
    setConnecting(true);

    // agrega un mensaje "conectando" visual
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "bot",
        text: "__CONNECTING__", // marcador para dibujar loader
      },
    ]);

    // pequeño delay para que el usuario vea el loader
    setTimeout(() => {
      setConnecting(false);

      // opcional: reemplazar el marcador por texto final
      setMessages((prev) =>
        prev.map((m) =>
          m.text === "__CONNECTING__"
            ? { ...m, text: "Conectándote con un asesor por WhatsApp…" }
            : m
        )
      );

      openWhatsApp(customerName);
    }, 700);
  };

  // =========================
  // BOT (reglas simples)
  // =========================
  const replyFor = (raw) => {
    const t = normalize(raw);

    // detectar asesor
    const wantsAdvisor =
      t === "asesor" ||
      t.includes("un asesor") ||
      t.includes("quiero hablar con un asesor") ||
      t.includes("hablar con un asesor") ||
      t.includes("asesoria") ||
      t.includes("asesoría") ||
      t.includes("agente") ||
      t.includes("humano");

    const isHello =
      t === "hola" ||
      t.includes("buenas") ||
      t.includes("buenos dias") ||
      t.includes("buenas tardes") ||
      t.includes("buenas noches") ||
      t.includes("saludos") ||
      t.includes("ola");

    // intents
    const isOrder = t.includes("pedido") || t.includes("estado") || t.includes("seguimiento") || t.includes("guia");
    const isInvoice = t.includes("factura") || t.includes("dian") || t.includes("radian") || t.includes("nit");
    const isQuote = t.includes("cotiz") || t.includes("precio") || t.includes("dispon") || t.includes("stock");
    const isWarranty =
      t.includes("garant") || t.includes("devol") || t.includes("cambio") || t.includes("dañado") || t.includes("danado");

    // set topic
    if (isQuote) setTopic("quote");
    else if (isOrder) setTopic("order");
    else if (isInvoice) setTopic("invoice");
    else if (isWarranty) setTopic("warranty");
    else setTopic("general");

    // saludo
    if (isHello) {
      setShowOpenChat(false);
      return (
        "Hola, 👋\n" +
        "Te damos la bienvenida a Equielect.\n\n" +
        "Soy una contestadora automática (no soy un humano).\n" +
        "Cuéntame en qué podemos ayudarte y en breve te conectamos con un asesor."
      );
    }

    // asesor → pedir nombre + auto abrir WA
    if (wantsAdvisor) {
      setShowOpenChat(false); // NO mostrar botón
      setAskName(true);       // pedir nombre
      setAutoHandoff(true);   // al recibir nombre, abrir automático
      setNameTouched(false);

      return (
        "Perfecto ✅\n" +
        "Antes de conectarte con un asesor, dime tu nombre por favor."
      );
    }

    // pedidos
    if (isOrder) {
      setShowOpenChat(true); // aquí sí puede salir el botón si quiere
      return (
        "Perfecto ✅\n" +
        "Para ayudarte con tu pedido, envíame el número de pedido y la ciudad de entrega.\n\n" +
        "Si deseas hablar con un asesor, escribe: “asesor”."
      );
    }

    // factura
    if (isInvoice) {
      setShowOpenChat(true);
      return (
        "Claro 🧾\n" +
        "Indícame el número de pedido y el correo/NIT (si aplica).\n\n" +
        "Si deseas hablar con un asesor, escribe: “asesor”."
      );
    }

    // cotización
    if (isQuote) {
      setShowOpenChat(true);
      return (
        "¡Listo! 🔎\n" +
        "Dime:\n" +
        "• Producto o referencia\n" +
        "• Cantidad\n" +
        "• Ciudad\n\n" +
        "Si ya quieres un asesor, escribe: “asesor”."
      );
    }

    // garantía
    if (isWarranty) {
      setShowOpenChat(true);
      return (
        "Entendido 🔁\n" +
        "Cuéntame qué pasó y, si tienes, el número de pedido.\n\n" +
        "Si ya quieres un asesor, escribe: “asesor”."
      );
    }

    // fallback
    setShowOpenChat(false);
    return (
      "Gracias. 🙌\n" +
      "Recibí tu mensaje.\n" +
      "Si quieres un asesor, escribe: “asesor”."
    );
  };

  const pushBot = (userText) => {
    setTyping(true);
    setTimeout(() => {
      const text = replyFor(userText);
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text }]);
      setTyping(false);
    }, 300);
  };

  const sendLocal = (text) => {
    const raw = (text ?? input).trim();
    if (!raw) return;

    // ✅ Si estamos pidiendo el nombre para abrir WhatsApp automático
    if (askName && autoHandoff) {
      const candidate = raw.trim();
      setName(candidate);
      setAskName(false);

      // validar mínimo
      if (candidate.length < 3) {
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "user", text: raw },
          {
            id: uid(),
            role: "bot",
            text: "Escribe tu nombre (mínimo 3 letras), por favor 🙂",
          },
        ]);
        setInput("");
        return;
      }

      // confirma y abre WA automático con loader
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "user", text: raw },
        { id: uid(), role: "bot", text: "¡Listo! Te estoy conectando con un asesor…" },
      ]);

      setInput("");
      setAutoHandoff(false);

      autoOpenWhatsApp(candidate);
      return;
    }

    // flujo normal
    setMessages((prev) => [...prev, { id: uid(), role: "user", text: raw }]);
    setInput("");
    pushBot(raw);
  };

  // =========================
  // BOTÓN "ABRIR CHAT" (solo cuando showOpenChat === true)
  // - pide nombre SOLO al dar clic aquí (no auto)
  // =========================
  const onOpenChatClick = () => {
    // pedir nombre (si no lo tenemos)
    if (!name || name.trim().length < 3) {
      setAskName(true);
      setAutoHandoff(false); // este es manual (con botón)
      setNameTouched(true);

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "bot",
          text: "Antes de abrir WhatsApp, dime tu nombre por favor 🙂",
        },
      ]);
      return;
    }

    openWhatsApp(name);
  };

  // si pidieron nombre por botón (askName true pero autoHandoff false), capturarlo
  useEffect(() => {
    // no hace nada aquí; se captura en sendLocal por el else normal,
    // así que para el caso manual pedimos nombre y el usuario lo escribe,
    // luego podemos habilitar botón de abrir chat nuevamente:
  }, [askName, autoHandoff]);

  // Si estamos pidiendo nombre manual (por botón), cuando el usuario escriba,
  // queremos guardarlo. Para eso: al recibir mensaje, si askName true y autoHandoff false,
  // en vez de abrir WA, guardamos nombre y avisamos.
  // ✅ Implementado aquí: interceptamos en un effect cuando cambie messages (último user)
  useEffect(() => {
    if (!askName || autoHandoff) return; // solo manual
    // buscar último mensaje de usuario
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser?.text) return;

    const candidate = lastUser.text.trim();
    if (candidate.length < 3) return;

    // solo setear si aún no se seteó nombre
    if (!name) {
      setName(candidate);
      setAskName(false);
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "bot", text: "Perfecto ✅ Ahora puedes tocar “Abrir chat”." },
      ]);
    }
  }, [messages, askName, autoHandoff, name]);

  // =========================
  // LOAD / SAVE
  // =========================
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed?.messages)) {
          setMessages(parsed.messages);
        }
        if (typeof parsed?.name === "string") setName(parsed.name);
        if (typeof parsed?.topic === "string") setTopic(parsed.topic);
        return;
      }
    } catch (_) {}

    setMessages([
      {
        id: uid(),
        role: "bot",
        text:
          "Hola, 👋\n" +
          "Te damos la bienvenida a Equielect, gracias por contactarnos.\n" +
          "Atenderemos tu mensaje en orden de llegada y en el menor tiempo posible.\n\n" +
          "Soy una contestadora automática. Si deseas un asesor, escribe: “asesor”.",
      },
    ]);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ messages, name, topic }));
    } catch (_) {}
  }, [messages, name, topic]);

  // autoscroll
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open, connecting]);

  // focus al abrir
  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    if (!greetedRef.current) greetedRef.current = true;
  }, [open]);

  // listener carrito
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

  // =========================
  // STYLES (sin degradados / sin overlay)
  // =========================
  const WA_GREEN = "#25D366";
  const WA_HEADER = "#075E54";
  const WA_BG = "#0b141a";
  const WA_BOT = "#2a2f32";

  const panelClass =
    "fixed z-[9999] overflow-hidden flex flex-col " +
    "right-4 bottom-[92px] rounded-2xl " +
    "w-[calc(100vw-2rem)] max-w-[360px] h-[460px] " +
    "sm:right-5 sm:bottom-[96px] sm:w-[380px] sm:h-[520px] " +
    "shadow-2xl border border-black/10";

  return (
    <>
      {/* FAB */}
      {!hideUI && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="fixed bottom-5 right-5 z-[9999] w-[58px] h-[58px] rounded-full shadow-xl grid place-items-center overflow-hidden"
          style={{ backgroundColor: WA_GREEN }}
          aria-label="Abrir WhatsApp"
          type="button"
        >
          {open ? (
            <span className="text-2xl leading-none text-white">×</span>
          ) : (
            <Image
              src={WA_AVATAR}
              alt="WhatsApp"
              width={45}
              height={45}
              className="w-[45px] h-[45px] object-contain"
              priority
            />
          )}
        </button>
      )}

      {/* Panel */}
      {!hideUI && open && (
        <div className={panelClass} style={{ backgroundColor: WA_BG }}>
          {/* Header */}
          <div className="px-3 py-2.5 text-white flex items-center justify-between" style={{ backgroundColor: WA_HEADER }}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-white/20">
                <Image
                  src={WA_AVATAR}
                  alt="WhatsApp"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
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
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/10"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((m) => {
              const isUser = m.role === "user";

              // loader bubble especial
              if (m.role === "bot" && m.text === "__CONNECTING__") {
                return (
                  <div key={m.id} className="flex justify-start">
                    <div
                      className="max-w-[92%] px-3.5 py-2.5 text-[13px] shadow-sm"
                      style={{
                        borderRadius: 16,
                        borderBottomLeftRadius: 8,
                        backgroundColor: WA_BOT,
                        color: "rgba(255,255,255,.9)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span>Conectando</span>
                        <DotsLoader />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[92%] px-3.5 py-3 text-[13px] leading-relaxed shadow-sm"
                    style={{
                      borderRadius: 16,
                      borderBottomLeftRadius: isUser ? 16 : 8,
                      borderBottomRightRadius: isUser ? 8 : 16,
                      backgroundColor: isUser ? "#005c4b" : WA_BOT,
                      color: "#fff",
                    }}
                  >
                    <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex justify-start">
                <div
                  className="max-w-[92%] px-3.5 py-2.5 text-[13px] shadow-sm"
                  style={{
                    borderRadius: 16,
                    borderBottomLeftRadius: 8,
                    backgroundColor: WA_BOT,
                    color: "rgba(255,255,255,.85)",
                  }}
                >
                  Escribiendo…
                </div>
              </div>
            )}

            {/* ✅ Botón grande “Abrir chat” SOLO si showOpenChat es true (y NO mientras pide nombre auto) */}
            {showOpenChat && !autoHandoff && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenChatClick}
                  className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-extrabold"
                  style={{ backgroundColor: WA_GREEN, color: "#fff" }}
                  aria-label="Abrir chat en WhatsApp"
                  title="Abrir chat en WhatsApp"
                >
                  <span className="inline-block text-lg">➤</span>
                  Abrir chat
                </button>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="p-2.5 border-t border-white/10" style={{ backgroundColor: WA_BG }}>
            <div className="flex gap-2 items-center">
              <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSend) sendLocal();
              }}
              placeholder={askName ? "Escribe tu nombre…" : "Escribe tu mensaje…"}
              className="flex-1 rounded-full px-3.5 py-2.5 outline-none text-[16px] sm:text-[13px]"
              style={{
                backgroundColor: "#111b21",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.14)",
                WebkitTextSizeAdjust: "100%",
              }}
            />

              <button
                type="button"
                onClick={() => sendLocal()}
                disabled={!canSend}
                className="px-4 py-2.5 rounded-full text-[13px] font-extrabold transition"
                style={{
                  backgroundColor: canSend ? WA_GREEN : "rgba(255,255,255,.12)",
                  color: canSend ? "#fff" : "rgba(255,255,255,.55)",
                  cursor: canSend ? "pointer" : "not-allowed",
                }}
                aria-label="Enviar"
                title="Enviar"
              >
                Enviar
              </button>
            </div>

            <div className="mt-2 text-[11px]" style={{ color: "rgba(255,255,255,.65)" }}>
              Estás hablando con una contestadora automática. En breve te conectamos con un asesor por WhatsApp.
            </div>
          </div>
        </div>
      )}
    </>
  );
}