"use client";

import React, { useMemo, useState } from "react";

const DEFAULT_WA_PHONE = "+573146453033";

const schneiderData = {
  slug: "schneider",
  name: "Schneider Electric",
  featuredCards: [
    {
      img: "/assets/products/schneider/interruptor.png",
      title: "LOS MEJORES PRODUCTOS DE SCHNEIDER ELECTRIC ESTÁN AQUÍ",
      text: "Cotiza y compra tus productos Schneider Electric con nosotros para tus aplicaciones industriales, con soluciones diseñadas para ofrecer maniobra y control confiable en tableros, maquinaria y sistemas eléctricos, con alta durabilidad, operación segura y excelente desempeño.",
      images: [
        "/assets/products/schneider/interruptor.png",
        "/assets/products/schneider/pulsadores.png",
        "/assets/products/schneider/arranque_motor.png",
        "/assets/products/schneider/variador_.png",
        "/assets/products/schneider/variador.jpg",
        "/assets/products/schneider/interruptores.png",
        "/assets/products/schneider/ups_.png",
        "/assets/products/schneider/ups__.png",
      ],
    },
  ],
};

export default function SchneiderCampPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptData, setAcceptData] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const featuredProduct = schneiderData.featuredCards[0];

  const productImages = useMemo(() => {
    const main = featuredProduct?.img ? [featuredProduct.img] : [];
    const extras = Array.isArray(featuredProduct?.images)
      ? featuredProduct.images
      : [];
    const merged = [...main, ...extras].filter(Boolean);
    return merged.filter((src, idx) => merged.indexOf(src) === idx);
  }, [featuredProduct]);

  const canContinue = useMemo(() => {
    const okName = fullName.trim().length >= 5;
    const okPhone = phone.replace(/\D/g, "").length >= 10;
    return okName && okPhone && acceptData && acceptPrivacy;
  }, [fullName, phone, acceptData, acceptPrivacy]);

  const nameError = touched && fullName.trim().length < 5;
  const phoneError = touched && phone.replace(/\D/g, "").length < 10;
  const checksError = touched && (!acceptData || !acceptPrivacy);

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

      const message =
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Ocurrió un error al guardar el formulario.";

      alert(message);
    }
  };

  const handleProductQuote = () => {
    const msg = `Hola Equielect, quiero cotizar la línea ${featuredProduct.title} de Schneider Electric.`;

    window.open(
      `https://wa.me/${DEFAULT_WA_PHONE}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        .breadcrumb,
        .breadcrumbs,
        nav[aria-label="breadcrumb"] {
          display: none !important;
        }
      `}</style>

      <header className="relative w-full overflow-hidden bg-white">
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
            <img
              src="/assets/campaña/mac/campaña_mac.png"
              alt="Campaña Schneider"
              className="block h-auto w-full select-none"
              loading="eager"
              decoding="async"
              draggable="false"
            />
          </picture>
        </div>
      </header>

      <section className="relative overflow-hidden py-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/assets/banners/fondo.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            opacity: 0.22,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
            {/* MODAL IZQUIERDO */}
            <div className="w-full">
              <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <div className="mb-4 flex items-center gap-3">
                    <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      Continúa con un asesor
                    </h1>
                  </div>

                  <p className="text-sm text-slate-600">
                    Completa tus datos y confirma las autorizaciones para seguir
                    a WhatsApp.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-800">
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

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-800">
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

                  <div
                    className={`rounded-xl border p-4 ${
                      checksError ? "border-red-300" : "border-slate-200"
                    }`}
                  >
                    <div className="space-y-3">
                      <label className="flex cursor-pointer select-none items-start gap-3">
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

                      <label className="flex cursor-pointer select-none items-start gap-3">
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

                  <button
                    type="button"
                    onClick={onContinue}
                    disabled={!canContinue || isSubmitting}
                    className={[
                      "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-extrabold transition",
                      "bg-[#54D483] text-white",
                      canContinue && !isSubmitting
                        ? "hover:opacity-95 active:scale-[0.99]"
                        : "",
                      !canContinue || isSubmitting
                        ? "cursor-not-allowed opacity-80"
                        : "",
                    ].join(" ")}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        <span>Enviando…</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
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

            {/* MODAL DERECHO SIMPLE */}
            <div className="w-full">
              <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm">

                <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
                  <div className="flex items-center justify-center bg-slate-50 p-6 min-h-[260px]">
                    <img
                      src={productImages[activeImage] || featuredProduct.img}
                      alt={featuredProduct.title}
                      className="max-h-[210px] w-auto max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {productImages.length > 1 && (
                    <div className="flex justify-center gap-2 px-4 pt-4">
                      {productImages.map((img, index) => (
                        <button
                          key={`${img}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          className={`h-11 w-11 overflow-hidden rounded-lg border p-1 ${
                            activeImage === index
                              ? "border-[#1c355e]"
                              : "border-slate-200"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${featuredProduct.title} ${index + 1}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-5 text-center">
                    <h3 className="text-base font-extrabold uppercase tracking-[0.14em] text-[#1c355e]">
                      {featuredProduct.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {featuredProduct.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}