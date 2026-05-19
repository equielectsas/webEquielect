"use client";

import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";

const normalizeLetters = (str) =>
  String(str || "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-zñ]/g, "");

const vowelRatio = (str) => {
  const letters = normalizeLetters(str);
  if (letters.length === 0) return 0;
  const vowels = letters.replace(/[^aeiou]/g, "").length;
  return vowels / letters.length;
};

const hasLongConsonantRun = (str) => {
  const letters = normalizeLetters(str);
  return /[bcdfghjklmnñpqrstvwxyz]{5,}/.test(letters);
};

const hasRandomMixedCase = (str) => {
  const letters = String(str || "").replace(/[^a-zA-Z]/g, "");
  if (letters.length < 6) return false;

  let transitions = 0;
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
    const currUpper = letters[i] === letters[i].toUpperCase();
    if (prevUpper !== currUpper) transitions++;
  }

  return transitions / (letters.length - 1) > 0.35;
};

const looksLikeGibberish = (str, { minLength = 10, minVowelRatio = 0.18 } = {}) => {
  const letters = normalizeLetters(str);
  if (letters.length < minLength) return false;
  if (vowelRatio(str) < minVowelRatio) return true;
  if (hasLongConsonantRun(str)) return true;
  if (/(.)\1{3,}/.test(letters)) return true;
  return false;
};

const isValidPersonName = (value) => {
  const name = String(value || "").trim();
  if (name.length < 2 || name.length > 50) return false;
  if (!/^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u.test(name)) return false;

  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 5) return false;

  for (const word of words) {
    if (word.length < 2 || word.length > 25) return false;
    if (hasRandomMixedCase(word)) return false;
    if (looksLikeGibberish(word, { minLength: 9, minVowelRatio: 0.18 })) return false;
  }

  return true;
};

const isValidEmail = (value) => {
  const email = String(value || "").trim().toLowerCase();
  if (!email || email.length > 254) return false;

  const basic =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
  if (!basic.test(email)) return false;

  const [local, domain] = email.split("@");
  if (!local || !domain || local.length < 2 || local.length > 64) return false;

  const labels = domain.split(".");
  if (labels.length < 2) return false;

  const tld = labels[labels.length - 1];
  if (!/^[a-z]{2,6}$/i.test(tld)) return false;

  const localLetters = local.replace(/[0-9.+_-]/g, "");
  if (localLetters.length >= 14 && looksLikeGibberish(localLetters, { minLength: 14, minVowelRatio: 0.2 })) {
    return false;
  }
  if (hasRandomMixedCase(localLetters)) return false;

  return true;
};

const isValidMessage = (value) => {
  const msg = String(value || "").trim();
  if (msg.length < 10 || msg.length > 2000) return false;

  const words = msg.split(/\s+/).filter((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length > 0);
  if (words.length < 2) return false;

  if (!/\s/.test(msg)) {
    if (hasRandomMixedCase(msg) || looksLikeGibberish(msg, { minLength: 8, minVowelRatio: 0.2 })) {
      return false;
    }
  }

  if (words.length < 3 && msg.length < 20) return false;

  if (looksLikeGibberish(msg, { minLength: 20, minVowelRatio: 0.15 })) return false;
  if (hasRandomMixedCase(msg) && words.length < 4) return false;

  return true;
};

export default function ContactoPage() {
  const API_BASE = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "http://localhost:3900",
    []
  );

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const e = {};
    if (!isValidPersonName(data.name)) {
      e.name =
        "Ingresa tu nombre real (solo letras, sin texto aleatorio ni símbolos).";
    }
    if (!isValidPersonName(data.lastname)) {
      e.lastname =
        "Ingresa tu apellido real (solo letras, sin texto aleatorio ni símbolos).";
    }
    if (!data.email || !isValidEmail(data.email)) {
      e.email =
        "Ingresa un correo electrónico real (ej. nombre@empresa.com), no texto inventado.";
    }
    if (data.phone) {
      const digits = String(data.phone).replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 15) {
        e.phone = "El teléfono debe tener entre 7 y 15 dígitos.";
      } else if (/^(\d)\1{5,}$/.test(digits)) {
        e.phone = "Ingresa un número de teléfono válido.";
      }
    }
    if (!isValidMessage(data.message)) {
      e.message =
        "Escribe un mensaje claro con al menos 2 palabras (mín. 10 caracteres).";
    }
    return e;
  };

  const markTouched = (name) => setTouched((p) => ({ ...p, [name]: true }));

const handleSubmit = async (ev) => {
  ev.preventDefault();
  setLoading(true);

  const formData = new FormData(ev.target);
  const data = Object.fromEntries(formData);

  const e = validate(data);
  setErrors(e);
  setTouched({
    name: true,
    lastname: true,
    email: true,
    phone: true,
    message: true,
  });

  if (Object.keys(e).length > 0) {
    setLoading(false);
    return;
  }

  try {
    await axios.post(`${API_BASE}/mensajes/enviar`, data, {
      headers: { "Content-Type": "application/json" },
    });
    setEnviado(true);
    ev.target.reset();
    setErrors({});
    setTouched({});
  } catch (error) {
    console.error(error);
    alert("Error al enviar el mensaje. Intente de nuevo.");
  } finally {
    setLoading(false);
  }
};

  if (enviado) {
    return (
      <div className="min-h-screen bg-white font-sans selection:bg-[#fae100] selection:text-[#1c355e] flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-16 h-16 text-[#fae100] mx-auto mb-4" />
          <p className="text-[#fae100] font-bold tracking-[0.4em] text-xs uppercase mb-3">
            MENSAJE ENVIADO
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#1c355e] leading-tight">
            ¡Gracias por escribirnos!
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Hemos recibido tu mensaje. Pronto un asesor se comunicará contigo.
          </p>

          <button
            onClick={() => setEnviado(false)}
            className="mt-10 inline-flex items-center gap-3 px-6 py-3 text-sm uppercase tracking-widest font-bold text-[#1c355e] border border-gray-200 bg-white hover:bg-gray-50 transition rounded-xl"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans selection:bg-[#fae100] selection:text-[#1c355e] text-[#1c355e]">
      {/* ✅ HERO: COMO EL BRANDPAGE (w-full h-auto) */}
      <header className="relative w-full bg-white overflow-hidden">
        <div className="relative w-full">
          {/* ✅ Banner responsive: sin recortes y sin “bordes” por altura fija */}
          <img
            src="/assets/banners/contactanosbanner.png"
            alt="Fondo Equielect"
            className="w-full h-auto block select-none"
            loading="eager"
            decoding="async"
            draggable="false"
          />

          {/* ✅ Overlay mínimo para legibilidad (NO blur, NO rellenos) */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Contenido */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <p className="text-[#fae100] font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-4 border-l-4 border-[#fae100] pl-4">
                CONTÁCTANOS
              </p>
              <h1 className="text-[12px] sm:text-3xl md:text-5xl lg:text-6xl font-light text-white max-w-4xl leading-tight">
                Estamos para <span className="font-bold">ayudarte</span>.
              </h1>

              <p className="text-white/80 mt-3 sm:mt-5 max-w-2xl leading-relaxed text-[8px] sm:text-sm md:text-base">
                Productos eléctricos, electrónicos y de telecomunicaciones para soluciones técnicas y novedosas.
              </p>
            </div>
          </div>
        </div>
      </header>
      <style jsx global>{`
  .breadcrumb,
  .breadcrumbs,
  nav[aria-label="breadcrumb"] {
    display: none !important;
  }
`}</style>
      {/* ✅ SECCIÓN FULL WIDTH CON FONDO (FIX RESPONSIVE/ZOOM) */}
      <section className="relative w-full overflow-hidden">
        {/* Patrón en TODO el ancho */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-[0.22]"
          style={{
            backgroundImage: "url('/assets/banners/fondo.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "clamp(420px, 42vw, 900px)",
          }}
        />
        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* INFO COLUMN */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Perfil */}
              <div className="p-8 bg-gray-50 border-l-8 border-[#fae100] shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
                  Equielect S.A.S
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed text-sm md:text-base">
                  Ofrecemos una extensa gama de productos eléctricos, electrónicos y de
                  telecomunicaciones que les permite a nuestros clientes implementar soluciones
                  técnicas y novedosas en sus proyectos.
                </p>
              </div>

              {/* Dirección */}
              <div className="p-8 bg-white/95 backdrop-blur-md shadow-xl border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
                  Dirección
                </p>
                <div className="mt-5 flex items-start gap-3 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-[#fae100] mt-0.5" />
                  <div className="leading-relaxed">
                    <p className="font-semibold text-[#1c355e]">Carrera 72 No. 30-53</p>
                    <p>Medellín – Colombia</p>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="p-8 bg-white/95 backdrop-blur-md shadow-xl border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
                  Contacto
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <a
                    href="tel:+576044443133"
                    className="flex items-center gap-3 hover:opacity-80 transition"
                  >
                    <Phone className="w-4 h-4 text-[#fae100]" />
                    <span className="font-semibold text-[#1c355e]">
                      Conmutador (604) 444 3133
                    </span>
                  </a>

                  <a
                    href="mailto:equielect@equielect.com.co"
                    className="flex items-center gap-3 hover:opacity-80 transition"
                  >
                    <Mail className="w-4 h-4 text-[#fae100]" />
                    <span className="font-semibold text-[#1c355e]">
                      equielect@equielect.com.co
                    </span>
                  </a>
                </div>
              </div>

              {/* Horarios */}
              <div className="p-8 bg-[#1c355e] text-white shadow-xl border border-[#1c355e]">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/70">
                  Horarios de atención
                </p>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#fae100] mt-0.5" />
                    <div className="leading-relaxed">
                      <p className="font-semibold">Lunes a Viernes</p>
                      <p className="text-white/85">7:30 am a 5:45 pm (jornada continua)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#fae100] mt-0.5" />
                    <div className="leading-relaxed">
                      <p className="font-semibold">Sábados</p>
                      <p className="text-white/85">8:00 am – 12 m</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* FORM */}
            <main className="lg:col-span-8">
              <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100">
                <div className="p-8 md:p-10 border-b border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
                    Formulario
                  </p>
                  <h2 className="mt-3 text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
                    Envíanos tu mensaje
                  </h2>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Completa los datos y cuéntanos qué necesitas.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field
                      label="Nombre"
                      name="name"
                      required
                      maxLength={50}
                      autoComplete="given-name"
                      onBlur={() => markTouched("name")}
                      error={touched.name ? errors.name : ""}
                    />
                    <Field
                      label="Apellido"
                      name="lastname"
                      required
                      maxLength={50}
                      autoComplete="family-name"
                      onBlur={() => markTouched("lastname")}
                      error={touched.lastname ? errors.lastname : ""}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      onBlur={() => markTouched("email")}
                      error={touched.email ? errors.email : ""}
                    />
                    <Field
                      label="Teléfono"
                      name="phone"
                      type="tel"
                      maxLength={20}
                      placeholder="Opcional"
                      autoComplete="tel"
                      onBlur={() => markTouched("phone")}
                      error={touched.phone ? errors.phone : ""}
                    />
                  </div>

                  <Textarea
                    label="Mensaje"
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder="Escribe tu solicitud con el mayor detalle posible."
                    onBlur={() => markTouched("message")}
                    error={touched.message ? errors.message : ""}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Al enviar, aceptas ser contactado por Equielect para atender tu solicitud.
                    </p>

                    <button
                      disabled={loading}
                      className="group inline-flex items-center justify-center gap-4 bg-[#1c355e] text-white px-10 py-4 rounded-xl hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">
                        {loading ? "Enviando..." : "Enviar"}
                      </span>
                      {loading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#fae100] group-hover:scale-150 transition-transform" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- UI helpers ---------------- */

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  maxLength,
  autoComplete,
  onBlur,
  error,
}) {
  return (
    <div className="group">
      <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-gray-400 group-focus-within:text-[#fae100] transition-colors">
        {label} {required ? <span className="text-[#fae100]">*</span> : null}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onBlur={onBlur}
        className={[
          "w-full border-b py-3 outline-none bg-transparent transition-colors",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-[#1c355e]",
          "placeholder:text-gray-300",
        ].join(" ")}
      />

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function Textarea({
  label,
  name,
  required = false,
  rows = 4,
  placeholder = "",
  maxLength,
  onBlur,
  error,
}) {
  return (
    <div className="group">
      <label className="text-[10px] uppercase tracking-[0.35em] font-bold text-gray-400 group-focus-within:text-[#fae100] transition-colors">
        {label} {required ? <span className="text-[#fae100]">*</span> : null}
      </label>

      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={onBlur}
        className={[
          "w-full border-b py-3 outline-none bg-transparent transition-colors resize-none",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-[#1c355e]",
          "placeholder:text-gray-300",
        ].join(" ")}
      />

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
