"use client";

import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";

const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").toLowerCase());

export default function ContactoPage() {
  const API_BASE = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3900",
    []
  );

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name || data.name.trim().length < 2)
      e.name = "Ingresa tu nombre (mín. 2 caracteres).";
    if (!data.lastname || data.lastname.trim().length < 2)
      e.lastname = "Ingresa tu apellido (mín. 2 caracteres).";
    if (!data.email || !isEmail(data.email)) e.email = "Ingresa un correo válido.";
    if (data.phone && String(data.phone).replace(/\D/g, "").length < 7)
      e.phone = "Si ingresas teléfono, que tenga al menos 7 dígitos.";
    if (!data.message || data.message.trim().length < 10)
      e.message = "Escribe un mensaje más claro (mín. 10 caracteres).";
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
      await axios.post(`${API_BASE}/api/mensajes/enviar`, data, {
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
      {/* HERO (estilo AboutUs) */}
      <header className="relative h-[46vh] md:h-[52vh] bg-[#1c355e] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/banners/contactanosbanner.png"
            alt="Fondo Equielect"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#1c355e] via-[#1c355e]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="text-[#fae100] font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-4 border-l-4 border-[#fae100] pl-4">
            CONTÁCTANOS
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white max-w-4xl leading-tight">
            Estamos para <span className="font-bold">ayudarte</span>.
          </h1>
          <p className="text-white/80 mt-5 max-w-2xl leading-relaxed">
            Productos eléctricos, electrónicos y de telecomunicaciones para soluciones técnicas y
            novedosas.
          </p>
        </div>
      </header>

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
                      <p className="text-white/85">7:00 am a 5:45 pm (jornada continua)</p>
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
                      onBlur={() => markTouched("name")}
                      error={touched.name ? errors.name : ""}
                    />
                    <Field
                      label="Apellido"
                      name="lastname"
                      required
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
                      onBlur={() => markTouched("email")}
                      error={touched.email ? errors.email : ""}
                    />
                    <Field
                      label="Teléfono"
                      name="phone"
                      type="tel"
                      placeholder="Opcional"
                      onBlur={() => markTouched("phone")}
                      error={touched.phone ? errors.phone : ""}
                    />
                  </div>

                  <Textarea
                    label="Mensaje"
                    name="message"
                    required
                    rows={5}
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
