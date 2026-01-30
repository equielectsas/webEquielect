"use client";

import { notFound } from "next/navigation";
import { brands } from "@/data/brands";

/**
 * Página: /aliados/[slug]
 * Jerarquía:
 * 1) Banner
 * 2) Logo
 * 3) Texto de marca (description)
 * 4) Cards (featuredCards) -> opcional (centradas si son 1 o 2)
 * 5) Viñetas (tomadas del PDF) -> por slug
 * 6) Botón WhatsApp al final
 */

const DEFAULT_WA_PHONE = "+573146453033";

const BRAND_BULLETS = {
  schneider: [
    "Equipos de control y protección para arranque de motor.",
    "Interruptores automáticos industriales.",
    "Variadores de velocidad.",
    "Detección, mando y señalización.",
    "Monitoreo y medidores de energía.",
    "Módulos lógicos programables.",
  ],
  procables: [
    "Cables para baja tensión.",
    "Cables para construcción.",
    "Cables flexibles.",
    "Cables para media tensión.",
    "Cables para minería.",
    "Cables de cobre y aluminio desnudo.",
    "Cables para telecomunicaciones.",
  ],
  legrand: [
    "Bornas de conexión.",
    "Tomas y clavijas industriales.",
    "Cajas de control.",
    "Interruptores y tomacorrientes.",
    "Bandejas portacables tipo malla.",
    "Accesorios para instalación.",
  ],
  sylvania: [
    "Iluminación de fachadas y decorativas exteriores.",
    "Iluminación comercial y residencial.",
    "Iluminación industrial.",
    "Alumbrado público.",
  ],
  philips: [
    "Luminarias para soluciones profesionales.",
    "Bombillos LED.",
    "Luminarias interior LED.",
    "Luminarias exterior LED.",
    "Luminarias tradicionales.",
    "Bombillos ahorradores.",
    "Tubos fluorescentes.",
    "Productos de alta intensidad de descarga (HID).",
  ],
  "3M": [
    "Cintas eléctricas de vinilo, caucho y otras.",
    "Terminales encogibles en frío para media tensión.",
    "Empalmes para baja y media tensión.",
    "Bornas y conectores para baja y media tensión.",
    "Guantes de nitrilo Comfort Grip.",
    "Sello de ductos.",
  ],
  telemecanique: [
    "Finales de carrera.",
    "Sensores fotoeléctricos.",
    "Sensores e interruptores de presión.",
    "Sensores inductivos y capacitivos.",
    "Sensores ultrasónicos.",
  ],
  tercol: [
    "Tableros metálicos.",
    "Cajas metálicas.",
    "Cajas y accesorios plásticos.",
    "Accesorios para tableros y cajas.",
    "Cajas para empalme, tomas de energía y datos.",
  ],
  panduit: [
    "Conectores y terminales de potencia.",
    "Herramientas de ponchado.",
    "Sistemas de amarre y sujeción.",
    "Conectores y accesorios para sistemas de puesta a tierra.",
    "Marcación y etiquetado.",
    "Soluciones LOTO (Lockout – Tagout) para seguridad y protección industrial.",
  ],
  teldor: [
    "Cables de instrumentación y control.",
    "Cables para sistemas de alarmas contra incendio.",
    "Cables industriales tipo bus.",
    "Cables de fibra óptica.",
  ],
  centelsa: [
    "Cables para baja tensión.",
    "Cables para construcción.",
    "Cables flexibles.",
    "Cables para media tensión.",
    "Cables para minería.",
    "Cables de cobre y aluminio desnudo.",
    "Cables para telecomunicaciones.",
  ],
  weg: [
    "Motores eléctricos IEC y NEMA.",
    "Accionamiento de control.",
    "Variadores y arrancadores suaves.",
  ],
  "phoenix-contact": [
    "DPS.",
    "Fuentes de alimentación.",
    "Bornas de control y potencia.",
    "Relés de interface para salidas PLC.",
    "Switchs Ethernet.",
    "UPS.",
  ],
  metalcoraza: ["Coraza americana liquid tight.", "Conectores liquid tight."],
  "connect-vcp": [
    "Cables UTP para Telecomunicaciones CAT 5E - 6.",
    "FTP 6A.",
    "Cables UTP para uso EXTERNO e INTERNO.",
    "Herrajes para 24 puertos UTP 5E - 6 - 6A.",
    "Conectores: JACK - PLUG - FACEPLATE.",
    "Patchcord CAT 5E - 6 - 6A.",
  ],
  siemon: [
    "Cables UTP para Telecomunicaciones.",
    "Cables UTP CAT 6 Violeta.",
    "FUTP CAT 6A.",
    "Herrajes para 24 puertos 6 - 6A.",
    "Conectores: JACK - PLUG - FACEPLATE.",
    "Patchcord.",
  ],
  "colmena-conduit": [
    "Tubos conduit galvanizados de acero EMT.",
    "Tubos conduit galvanizados de acero IMC.",
    "Tubos conduit galvanizados de acero RIGID.",
  ],
  plastimec: [
    "Tubería conduit para uso eléctrico y telefónico.",
    "Ducto Liso telefónico DB.",
    "Tubería Extrafuerte SCH 40.",
    "Accesorios conduit tipo A y SCH 40.",
  ],
  schmersal: [
    "Interruptores de seguridad.",
    "Paradas de emergencia.",
    "Interruptores de habilitación/validación.",
  ],
  "crouse-hinds": [
    "Iluminación de seguridad.",
    "Iluminación LED para áreas industriales (sanas).",
    "Productos para ambientes con riesgo de explosión.",
    "Estaciones de control, botoneras, toma sencillo y clavijas.",
    "Reducciones en aluminio.",
    "Prensa estopas metálicas.",
    "Sellos cortafuego y cajas GUAT - GUAL - GUAX.",
    "Cajas 2x4 y 4x4 en aluminio.",
    "Universales y HUBS.",
    "Compuesto CHICO A4 y fibras retenedoras.",
  ],
};

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.44c-.28-.14-1.64-.81-1.9-.9-.26-.09-.45-.14-.64.14-.19.28-.73.9-.9 1.09-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.4-1.67-1.56-1.95-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.03 3.11 4.92 4.36.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.12.56-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.54-.33zM16.02 5.33c-5.84 0-10.59 4.75-10.59 10.59 0 1.87.5 3.7 1.45 5.3L5.33 26.67l5.59-1.47c1.54.84 3.27 1.28 5.1 1.28 5.84 0 10.59-4.75 10.59-10.59 0-5.84-4.75-10.56-10.59-10.56zm0 19.37c-1.66 0-3.28-.44-4.7-1.28l-.33-.19-3.32.87.89-3.23-.21-.34c-.92-1.47-1.4-3.17-1.4-4.92 0-5.1 4.15-9.25 9.25-9.25 5.1 0 9.25 4.15 9.25 9.25 0 5.1-4.15 9.09-9.43 9.09z"
      />
    </svg>
  );
}

export default function BrandPage({ params }) {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return notFound();

  const bullets = BRAND_BULLETS[brand.slug] || [];

  const waPhone = brand.whatsapp?.phone || DEFAULT_WA_PHONE;
  const waMessage =
    brand.whatsapp?.message ||
    `Hola Equielect, estoy interesado en cotizar productos de ${brand.name}. ¿Me ayudas con disponibilidad y precios?`;

  const goToWhatsApp = () => {
    window.open(
      `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ✅ Cards: tomar máximo 3, pero respetar si hay 1 o 2.
  const cards = (brand.featuredCards || []).slice(0, 3);

  return (
    <main className="bg-white min-h-screen pb-24 font-sans">
      {/* 1) BANNER */}
      <section className="w-full">
        <div className="relative w-full overflow-hidden aspect-[1212/250] bg-gray-50">
          <picture>
            {!!brand.images?.desktop && (
              <source
                media="(min-width: 1024px)"
                srcSet={
                  brand.images?.desktop2x
                    ? `${brand.images.desktop} 1x, ${brand.images.desktop2x} 2x`
                    : `${brand.images.desktop} 1x`
                }
              />
            )}
            {!!brand.images?.tablet && (
              <source
                media="(min-width: 768px)"
                srcSet={
                  brand.images?.tablet2x
                    ? `${brand.images.tablet} 1x, ${brand.images.tablet2x} 2x`
                    : `${brand.images.tablet} 1x`
                }
              />
            )}
            <img
              src={brand.images?.mobile || brand.images?.desktop}
              srcSet={
                brand.images?.mobile2x
                  ? `${brand.images.mobile} 1x, ${brand.images.mobile2x} 2x`
                  : undefined
              }
              alt={`Banner ${brand.name}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </picture>
        </div>
      </section>

      <section className="max-w-[1212px] mx-auto px-4 pt-12">
        {/* 2) LOGO + 3) TEXTO */}
        <header className="flex flex-col items-center text-center mb-14">
          <img
            src={brand.logoPath}
            alt={brand.name}
            className="h-20 w-auto object-contain mb-6"
          />
          <p className="max-w-4xl text-slate-600 text-sm md:text-[15px] leading-relaxed font-medium">
            {brand.description || ""}
          </p>
        </header>

        {/* 4) CARDS (centradas si hay 1 o 2) */}
        {cards.length > 0 && (
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-xl font-bold text-black mb-10 text-center uppercase tracking-[0.2em]">
              Productos destacados
            </h2>

            {/* ✅ Flex centrado: 1 y 2 quedan centradas automáticamente */}
            <div className="flex flex-wrap justify-center gap-8">
              {cards.map((c, idx) => (
                <article
                  key={idx}
                  className="w-full sm:w-[320px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden rounded-xl"
                >
                  <div className="h-64 flex items-center justify-center bg-gray-50 p-8 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-7 text-center border-t border-gray-50">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1c355e] mb-3">
                      {c.title}
                    </p>

                    {!!c.text && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {c.text}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 5) VIÑETAS */}
        {bullets.length > 0 && (
          <section className="max-w-4xl mx-auto mt-10 text-center px-1">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              Otras líneas de productos {brand.name}
            </h3>

            {/* ✅ UNA SOLA COLUMNA SIEMPRE */}
              <div className="flex flex-col items-center space-y-4">
                {bullets.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#005cb9] shrink-0" />
                    <p className="text-slate-700 text-sm md:text-[15px] font-medium leading-relaxed">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        {/* 6) BOTÓN WHATSAPP (FINAL) */}
        <section className="max-w-4xl mx-auto mt-12 px-1">
          <div className="border-t pt-8 flex flex-col items-center text-center gap-6">
            <div>
              <p className="text-slate-900 font-bold text-sm uppercase tracking-wider">
                Calidad garantizada y soporte técnico especializado.
              </p>

              <div className="mt-4 flex justify-center gap-3">
                <div className="h-2 w-20 bg-[#005cb9] rounded-full" />
                <div className="h-2 w-20 bg-[#FFCC00] rounded-full" />
              </div>
            </div>

            <button
              type="button"
              onClick={goToWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-xl font-extrabold hover:bg-[#1ebe57] transition-all"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Ir a cotizar por WhatsApp
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
