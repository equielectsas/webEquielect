"use client";

import React, { useMemo, useState } from "react";

const DEFAULT_WA_PHONE = "+573146453033";

export default function SchneiderCampPage() {
  // ✅ Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptData, setAcceptData] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  // ✅ Validación UX
  const [touched, setTouched] = useState(false);

  // ✅ UX states botón
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canContinue = useMemo(() => {
    const okName = fullName.trim().length >= 5;
    const okPhone = phone.replace(/\D/g, "").length >= 10;
    return okName && okPhone && acceptData && acceptPrivacy;
  }, [fullName, phone, acceptData, acceptPrivacy]);

const onContinue = async () => {
  setTouched(true);
  if (!canContinue || isSubmitting) return;

  try {
    setIsSubmitting(true);
    setIsSuccess(false);

    const cleanPhone = phone.replace(/\D/g, "");

    const payload = {
      fullName: fullName.trim(),
      phone: cleanPhone,
      acceptData,
      acceptPrivacy,
      source: "schneider-campaign",
      createdAtClient: new Date().toISOString(),
    };

    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/schneider-leads`;
    console.log("URL API:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    let result;

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error("Respuesta no JSON:", text);
      throw new Error("La API no respondió en formato JSON.");
    }

    if (!response.ok) {
      throw new Error(result.message || "No se pudo guardar la información.");
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    const msg =
      `Hola Equielect, quiero cotizar productos Schneider Electric.` +
      `\n\nNombre: ${fullName.trim()}` +
      `\nContacto: ${cleanPhone}` +
      `\n\n¿Me ayudas con disponibilidad, precios y tiempos de entrega?`;

    setTimeout(() => {
      window.open(
        `https://wa.me/${DEFAULT_WA_PHONE}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setTimeout(() => setIsSuccess(false), 1200);
    }, 250);
  } catch (error) {
    console.error("Error enviando formulario Schneider:", error);
    setIsSubmitting(false);
    alert(error.message || "Ocurrió un error al guardar el formulario.");
  }
};

  const nameError = touched && fullName.trim().length < 5;
  const phoneError = touched && phone.replace(/\D/g, "").length < 10;
  const checksError = touched && (!acceptData || !acceptPrivacy);

  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        .breadcrumb,
        .breadcrumbs,
        nav[aria-label="breadcrumb"] {
          display: none !important;
        }
      `}</style>

      {/* ✅ HERO tipo ContactoPage: w-full h-auto (sin recortes) */}
      <header className="relative w-full bg-white overflow-hidden">
        <div className="relative w-full">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/assets/campaña/mobile/campaña_mobile.jpg"
            />
            <source
              media="(min-width: 641px) and (max-width: 1024px)"
              srcSet="/assets/campaña/tablet/campaña_tablet.jpg"
            />
            <source
              media="(min-width: 1025px)"
              srcSet="/assets/campaña/windows/campaña_windows.png"
            />

            {/* Fallback */}
            <img
              src="/assets/campaña/mac/campaña_mac.png"
              alt="Campaña Schneider"
              className="w-full h-auto block select-none"
              loading="eager"
              decoding="async"
              draggable="false"
            />
          </picture>
        </div>
      </header>

      {/* Form */}
      <section className="relative overflow-hidden pb-10">
        {/* Fondo con opacidad */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/banners/fondo.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            opacity: 0.22,
          }}
        />
        <br></br>
        <br></br>
        {/* Contenido (sube un poco sobre el banner) */}
        <div className="relative max-w-3xl mx-auto px-4 -mt-10 sm:-mt-14">
          <div className="rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 bg-white/90 backdrop-blur-[1px]">
            <div className="mb-6">
              <br></br>
              <br />
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Continúa con un asesor
              </h1>
              <p className="text-sm text-slate-600">
                Completa tus datos y confirma las autorizaciones para seguir a
                WhatsApp.
              </p>
            </div>

            <div className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Nombre completo
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="Ej: Juan Pérez"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    nameError
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:ring-2 focus:ring-slate-200"
                  }`}
                />
                {nameError && (
                  <p className="mt-2 text-xs text-red-600">
                    Escribe tu nombre completo (mínimo 5 caracteres).
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Número de contacto
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched(true)}
                  inputMode="tel"
                  placeholder="Ej: 3123456789"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    phoneError
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 focus:ring-2 focus:ring-slate-200"
                  }`}
                />
                {phoneError && (
                  <p className="mt-2 text-xs text-red-600">
                    Ingresa un número válido (mínimo 10 dígitos).
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-500">
                  Solo se incluirá en el mensaje de WhatsApp.
                </p>
              </div>

              {/* Checks */}
              <div
                className={`rounded-xl border p-4 ${
                  checksError ? "border-red-300" : "border-slate-200"
                }`}
              >
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptData}
                      onChange={(e) => setAcceptData(e.target.checked)}
                      onBlur={() => setTouched(true)}
                      className="mt-1 h-4 w-4"
                    />
                    <span className="text-sm text-slate-700">
                      Acepto el{" "}
                      <span className="font-bold">
                        tratamiento de mis datos
                      </span>
                      .
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      onBlur={() => setTouched(true)}
                      className="mt-1 h-4 w-4"
                    />
                    <span className="text-sm text-slate-700">
                      Acepto las{" "}
                      <span className="font-bold">
                        políticas de privacidad
                      </span>
                      .
                    </span>
                  </label>
                </div>

                {checksError && (
                  <p className="mt-3 text-xs text-red-600">
                    Debes aceptar ambas opciones para continuar.
                  </p>
                )}
              </div>

              {/* Botón */}
              <button
                type="button"
                onClick={onContinue}
                disabled={!canContinue || isSubmitting}
                className={[
                  "w-full rounded-xl px-6 py-4 font-extrabold transition flex items-center justify-center gap-2",
                  "bg-[#25D366] text-white",
                  canContinue && !isSubmitting
                    ? "hover:opacity-95 active:scale-[0.99]"
                    : "",
                  !canContinue || isSubmitting
                    ? "opacity-80 cursor-not-allowed"
                    : "",
                ].join(" ")}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    <span>Enviando…</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="white"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>Listo</span>
                  </>
                ) : (
                  "Continuar con asesor"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}