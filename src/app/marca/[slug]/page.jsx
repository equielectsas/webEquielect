"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { brands } from "@/data/brands";
import Link from "next/link";
import Allies360Carousel from "@/components/home/Allies360Carousel";

const DEFAULT_WA_PHONE = "+573146453033";

const allies = [
  { name: "Philips", src: "/assets/aliados/AlliePhilips.png", href: "/marca/philips" },
  { name: "Schmersal", src: "/assets/aliados/AllieSchmersal.png", href: "/marca/schmersal" },
  { name: "Weg", src: "/assets/aliados/AllieWeg.png", href: "/marca/weg" },
  { name: "Connect VCP", src: "/assets/aliados/AllieConnectVCP.png", href: "/marca/connect-vcp" },
  { name: "Teldor", src: "/assets/aliados/AllieTeldor.png", href: "/marca/teldor" },
  { name: "Plastimec", src: "/assets/aliados/AlliePlastimec.png", href: "/marca/plastimec" },
  { name: "Colmena Conduit", src: "/assets/aliados/AllieColmena.png", href: "/marca/colmena-conduit" },
  { name: "Tercol", src: "/assets/aliados/AllieTercol.png", href: "/marca/tercol" },
  { name: "Siemon", src: "/assets/aliados/AllieSiemon.png", href: "/marca/siemon" },
  { name: "MetalCoraza", src: "/assets/aliados/AllieMetalCoraza.png", href: "/marca/metalcoraza" },
  { name: "Crouse Hinds", src: "/assets/aliados/AllieCH.png", href: "/marca/crouse-hinds" },
  { name: "Schneider", src: "/assets/aliados/SchneiderBG.png", href: "/marca/schneider" },
  { name: "Legrand", src: "/assets/aliados/LegrandBG.png", href: "/marca/legrand" },
  { name: "Procables", src: "/assets/aliados/AllieProCables.png", href: "/marca/procables" },
  { name: "Gonvarri", src: "/assets/aliados/AllieGonvarri.png", href: "/marca/gonvarri" },
  { name: "Centelsa", src: "/assets/aliados/AllieCentelsa.png", href: "/marca/centelsa" },
  { name: "3M", src: "/assets/aliados/Allie3M.png", href: "/marca/3M" },
  { name: "Telemecanique", src: "/assets/aliados/AllieTelemecanica.png", href: "/marca/telemecanique" },
  { name: "Panduit", src: "/assets/aliados/AlliePanduit.png", href: "/marca/panduit" },
  { name: "Phoenix Contact", src: "/assets/aliados/AlliePhoenix.png", href: "/marca/phoenix-contact" },
  { name: "Sylvania", src: "/assets/aliados/AllieSylvania.png", href: "/marca/sylvania" },
];

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
    "Alambres THHN/THWN-2.",
    "Cables THHN/THWN-2",
    "Cables libres de halogenos 90°C",
    "Cable de soldadura",
    "Cables AWM flexibles",
    "Cables de potencia monoflex",
    "Cables duplex flexibles SPT",
    "Cables multiflex PVC-NY/PVC",
    "Cable triplex THHN/THWN-2 RoHS",
    "Cables XHHW-2",
    "Cables de potencia",
    "Cables instrumentación",
    "Cable TW flexible 600V 60°C PVC",
    "Cables HMWPE Cu 75°C 600V PVC",
    "Cable NMC-B THHN/THWN-2 600V PVC-CT",
  ],
  weg: ["Motores eléctricos IEC y NEMA.", "Accionamiento de control.", "Variadores y arrancadores suaves."],
  "phoenix-contact": ["DPS.", "Fuentes de alimentación.", "Bornas de control y potencia.", "Relés de interface para salidas PLC.", "Switchs Ethernet.", "UPS."],
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
  schmersal: ["Interruptores de seguridad.", "Paradas de emergencia.", "Interruptores de habilitación/validación."],
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
  gonvarri: [
    "Electrobarras o blindobarras.",
    "Sistemas portacables tipo escalera en acero.",
    "Sistemas portacables tipo escalera en aluminio.",
    "Sistemas portacables tipo malla en acero inoxidable.",
    "Sistemas portacables tipo ducto con fondo liso y perforado.",
    "Sistema portacable tipo canaleta superficial en acero.",
    "Sistema estructural MECANO.",
    "Platinas, conectores y acoples.",
    "Fijadores para tubería.",
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

/** ✅ Card: c.img es la principal SIEMPRE + 3 miniaturas que cambian al hover/click */
function FeaturedCard({ c }) {
  const imgs = useMemo(() => {
    const main = c?.img ? [c.img] : [];
    const extras = Array.isArray(c?.images) ? c.images : [];
    const merged = [...main, ...extras].filter(Boolean);
    return merged.filter((src, idx) => merged.indexOf(src) === idx);
  }, [c]);

  const [active, setActive] = useState(0);
  const mainSrc = imgs[active] || c.img;

  return (
    <article
      className="w-full sm:w-[320px] bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
      style={{ borderRadius: 16 }}
    >
      <Link href={c.href || "#"} className="block">
        <div className="h-64 flex items-center justify-center bg-slate-50 p-6 overflow-hidden relative">
          <img
            src={mainSrc}
            alt={c.title}
            className="w-full h-full object-contain group-hover:scale-[1.06] transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>

      {imgs.length > 1 && (
        <div className="px-5 pt-3 flex gap-2 items-center justify-center">
          {imgs.slice(0, 3).map((src, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={src + idx}
                type="button"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className={`relative w-10 h-10 border transition ${
                  isActive ? "border-[#1c355e]" : "border-slate-200"
                } items-center justify-center`}
                style={{ borderRadius: 10 }}
                aria-label={`Ver imagen ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`${c.title} ${idx + 1}`}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="p-6 text-center border-t border-slate-100">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1c355e] mb-3">{c.title}</p>
        {!!c.text && <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>}
      </div>
    </article>
  );
}

export default function BrandPage({ params }) {
  const router = useRouter();

  // ✅ Hooks primero (para NO romper reglas de hooks)
  const [showPopup, setShowPopup] = useState(false);

  const slug = params?.slug;
  const brand = useMemo(() => brands.find((b) => b.slug === slug), [slug]);

  // ✅ Popup solo para Schneider
  useEffect(() => {
    if (brand?.slug === "schneider") setShowPopup(true);
    else setShowPopup(false);
  }, [brand?.slug]);

  // ✅ Bloquea scroll mientras esté abierto
  useEffect(() => {
    if (!showPopup) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showPopup]);

  // ✅ Cerrar con ESC
  useEffect(() => {
    if (!showPopup) return;
    const onKey = (e) => {
      if (e.key === "Escape") setShowPopup(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPopup]);

  // ✅ WhatsApp general
  const waPhone = brand?.whatsapp?.phone || DEFAULT_WA_PHONE;
  const waMessage =
    brand?.whatsapp?.message ||
    `Hola Equielect, estoy interesado en cotizar productos de ${brand?.name || "esta marca"}. ¿Me ayudas con disponibilidad y precios?`;

  const goToWhatsApp = () => {
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`, "_blank", "noopener,noreferrer");
  };

  const bullets = brand ? BRAND_BULLETS[brand.slug] || [] : [];
  const cards = (brand?.featuredCards || []).slice(0, 3);

  const banner1x = brand?.images?.desktop || brand?.images?.tablet || brand?.images?.mobile || "";
  const banner2x = brand?.images?.desktop2x || brand?.images?.tablet2x || brand?.images?.mobile2x || "";

  const eqBlue = "#1c355e";
  const eqYellow = "#FFCC00";

  // ✅ Si brand no existe, renderiza pantalla “Marca no encontrada” (sin romper hooks)
  if (!brand) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-2xl font-extrabold text-slate-900">Marca no encontrada</p>
          <p className="mt-2 text-slate-600">La marca solicitada no existe o la URL está mal.</p>

          <Link
            href="/"
            className="inline-flex mt-6 px-5 py-3 rounded-xl bg-[#1c355e] text-white font-bold hover:opacity-95 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen pb-24 font-sans">
      {/* ✅ POPUP Schneider */}
      {brand.slug === "schneider" && showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Promoción Schneider"
        >
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPopup(false)}
            aria-label="Cerrar popup"
          />

          {/* Modal */}
          <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Botón X */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/70 transition"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ✕
            </button>

            {/* Imagen + hotspot */}
            <div className="relative">
              <img
                src="/assets/Pop up/popup.png"
                alt="Popup Schneider"
                className="w-full h-auto block"
                loading="eager"
                decoding="async"
              />

              {/* ✅ En vez de WhatsApp, manda a /schneidercamp */}
              <button
                type="button"
                onClick={() => {
                  setShowPopup(false);
                  router.push("/analytic/schneider");
                }}
                className="absolute flex items-center justify-center bg-transparent hover:scale-105 active:scale-95 transition"
                style={{
                  left: "58%",
                  top: "48%",
                  width: 110, // área clickeable
                  height: 110, // área clickeable
                  transform: "translate(-50%, -50%)",
                  filter:
                    "drop-shadow(0 2px 6px rgba(0,0,0,.65)) drop-shadow(0 0 2px rgba(0,0,0,.6))",
                }}
                aria-label="Cotizar con asesor"
                title="Cotizar con asesor"
              >
                <img
                  src="/assets/Pop up/logo.png"
                  alt="WhatsApp"
                  className="w-[248px] h-[248px] object-contain"
                  draggable={false}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1) BANNER */}
      <section className="w-full">
        <div className="w-full bg-slate-50">
          {!!banner1x && (
            <img
              src={banner1x}
              srcSet={banner2x ? `${banner1x} 1x, ${banner2x} 2x` : undefined}
              alt={`Banner ${brand.name}`}
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
            />
          )}
        </div>
      </section>

      <section className="max-w-[1212px] mx-auto px-4 pt-12">
        {/* 2) LOGO + 3) TEXTO */}
        <header className="flex flex-col items-center text-center mb-14">
          {(() => {
            const h = brand.logo?.h ?? 80;
            const scale = brand.logo?.scale ?? 1;

            return (
              <div className="mb-6 flex items-center justify-center" style={{ height: h }}>
                <img
                  src={brand.logoPath}
                  alt={brand.name}
                  className="w-auto h-full object-contain"
                  style={{ transform: `scale(${scale})` }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            );
          })()}

          <p className="max-w-4xl text-slate-600 text-sm md:text-[15px] leading-relaxed font-medium">
            {brand.description || ""}
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-[2px] w-14 rounded-full" style={{ backgroundColor: eqBlue }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: eqYellow }} />
            <span className="h-[2px] w-14 rounded-full" style={{ backgroundColor: eqBlue }} />
          </div>
        </header>

        {/* 4) PRODUCTOS DESTACADOS */}
        {cards.length > 0 && (
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-xl font-black text-slate-900 mb-10 text-center uppercase tracking-[0.22em]">
              Productos destacados
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
              {cards.map((c, idx) => (
                <FeaturedCard key={idx} c={c} />
              ))}
            </div>
          </section>
        )}

        {/* 5) VIÑETAS */}
{bullets.length > 0 && (
  <section className="max-w-4xl mx-auto mt-10 px-4 text-center">
    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
      Otras líneas de productos {brand.name}
    </h3>

    {/* Contenedor que centra el bloque, pero alinea el contenido a la izquierda */}
    <div className="inline-block text-left">
      <div className="flex flex-col space-y-4">
        {bullets.map((line, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {/* Viñeta con el color de Equielect */}
            <span 
              className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" 
              style={{ backgroundColor: eqBlue }} 
            />
            <p className="text-slate-700 text-sm md:text-[15px] font-medium leading-relaxed uppercase tracking-tight">
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
        {/* 6) WHATSAPP + OTRAS MARCAS */}
        <section className="max-w-4xl mx-auto mt-12 px-1">
          <div className="border-t pt-8 flex flex-col items-center text-center gap-6">
            <div>
              <p className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
                Calidad garantizada y soporte técnico especializado.
              </p>

              <div className="mt-4 flex justify-center gap-3">
                <div className="h-2 w-20 rounded-full" style={{ backgroundColor: eqBlue }} />
                <div className="h-2 w-20 rounded-full" style={{ backgroundColor: eqYellow }} />
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

            <section className="bg-white py-12 border-t border-slate-200 w-full">
              <Allies360Carousel
                items={allies.map((a) => ({ name: a.name, icon: a.src, href: a.href }))}
                speedSeconds={30}
              />
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}