"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_WA_PHONE = "+573146453033";

export default function SchneiderCampPage() {
  // ✅ Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptData, setAcceptData] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [touched, setTouched] = useState(false);

  const canContinue = useMemo(() => {
    const okName = fullName.trim().length >= 5;
    const okPhone = phone.replace(/\D/g, "").length >= 10;
    return okName && okPhone && acceptData && acceptPrivacy;
  }, [fullName, phone, acceptData, acceptPrivacy]);

  const onContinue = () => {
    setTouched(true);
    if (!canContinue) return;

    const cleanPhone = phone.replace(/\D/g, "");
    const msg =
      `Hola Equielect, quiero cotizar productos Schneider Electric.` +
      `\n\nNombre: ${fullName.trim()}` +
      `\nContacto: ${cleanPhone}` +
      `\n\n¿Me ayudas con disponibilidad, precios y tiempos de entrega?`;

    window.open(
      `https://wa.me/${DEFAULT_WA_PHONE}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const nameError = touched && fullName.trim().length < 5;
  const phoneError = touched && phone.replace(/\D/g, "").length < 10;
  const checksError = touched && (!acceptData || !acceptPrivacy);

  return (
    <main className="min-h-screen bg-white">
      {/* ✅ Banner responsive (una sola imagen según dispositivo) */}
      <section className="w-full bg-slate-50">
        <picture>
          {/* Mobile */}
          <source
            media="(max-width: 640px)"
            srcSet="/assets/campaña/mobile/campaña_mobile.jpg"
          />

          {/* Tablet */}
          <source
            media="(min-width: 641px) and (max-width: 1024px)"
            srcSet="/assets/campaña/tablet/camapaña_tablet.jpg"
          />

          {/* Desktop Retina (Mac / pantallas 2x) */}
          <source
            media="(min-width: 1025px) and (min-resolution: 2dppx)"
            srcSet="/assets/campaña/mac/campaña_mac.png"
          />

          {/* Desktop Normal (Windows / 1x) */}
          <source
            media="(min-width: 1025px)"
            srcSet="/assets/campaña/windows/campaña_windows.png"
          />

          {/* Fallback */}
          <img
            src="/assets/campaña/desktop/campaña_desktop.png"
            alt="Campaña Schneider"
            className="w-full h-auto block"
            loading="eager"
            decoding="async"
          />
        </picture>
      </section>
      <style jsx global>{`
  .breadcrumb,
  .breadcrumbs,
  nav[aria-label="breadcrumb"] {
    display: none !important;
  }
`}</style>

      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Continúa con un asesor
              </h1>
              <p className="text-sm text-slate-600">
                Completa tus datos y confirma las autorizaciones para seguir a
                WhatsApp.
              </p>
            </div>
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

            {/* Button */}
            <button
              type="button"
              onClick={onContinue}
              className={`w-full rounded-xl px-6 py-4 font-extrabold transition ${
                canContinue
                  ? "bg-[#25D366] text-white hover:opacity-95"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              Continuar con asesor
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}