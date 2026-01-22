"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "procables-1",
    brand: "Procables",
    brandDesc:
      "Cables certificados para instalaciones seguras y proyectos industriales.",
    title: "Cable THHN 12 AWG (Rollo)",
    images: [
      "/assets/products/cable-de-cobre THHN.jpg",
      "/assets/products/cable-de-cobre THHN2.png",
      "/assets/products/cable-de-cobre THHN3.png",
    ],
  },
  {
    id: "legrand-1",
    brand: "Legrand",
    brandDesc:
      "Soluciones eléctricas y canalización para edificaciones residenciales y comerciales.",
    title: "Tomacorriente Doble Línea Premium",
    images: [
      "/assets/products/toma-corriente.png",
      "/assets/products/toma-corriente2.png",
      "/assets/products/toma-corriente3.png",
    ],
  },
  {
    id: "schneider-1",
    brand: "Schneider Electric",
    brandDesc:
      "Automatización y gestión de energía para un mundo más eficiente.",
    title: "Breaker Termomagnético 2P 20A",
    images: [
      "/assets/products/breaker_termosch.jpg",
      "/assets/products/breaker_termosch2.png",
      "/assets/products/breaker_termosch3.png",
    ],
  },
  {
    id: "gonvarri-1",
    brand: "Gonvarri",
    brandDesc: "Líderes en la trasformación del acero.",
    title: "GRAPA 3/4 P/COLGAR TUBERIA",
    images: [
      "/assets/products/gonvarri.jpg",
      "/assets/products/gonvarri3.png",
      "/assets/products/gonvarri2.png",
    ],
  },
];

export default function FeaturedBrandProducts() {
  const items = useMemo(() => PRODUCTS, []);

  return (
    <section className="mt-5 relative">
      {/* ✅ Contenedor con padding lateral (para que NO queden pegados) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ✅ Grid más ordenado + más aire a los lados */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .text-equielect-blue {
          color: #1c355e;
        }
        .bg-equielect-blue {
          background-color: #1c355e;
        }
        .border-equielect-blue {
          border-color: #1c355e;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

function ProductCard({ p }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  // ✅ zoom “lupa”
  const [isZoom, setIsZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const mainSrc = p.images?.[active] || p.images?.[0];

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    // ✅ Cajón más pequeño y más “premium”
    <div
      className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderRadius: 14 }}
    >
      {/* ✅ Imagen principal con zoom */}
      <div className="relative w-full bg-gray-50">
        <div
          // ✅ un poquito más bajo para que el cajón sea más pequeño
          className="relative w-full aspect-[16/11] overflow-hidden"
          onMouseEnter={() => setIsZoom(true)}
          onMouseLeave={() => setIsZoom(false)}
          onMouseMove={handleMove}
        >
          {/* ✅ IMPORTANTE: sin transition en scroll/jitter; solo micro animación */}
          <div
            className="absolute inset-0"
            style={{
              transform: isZoom ? "scale(1.25)" : "scale(1)",
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transition: "transform 120ms ease",
            }}
          >
            <Image
              src={mainSrc}
              alt={p.title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          <div className={`absolute inset-0 ${isZoom ? "cursor-zoom-in" : ""}`} />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-2 top-2 px-2 py-1 bg-white/95 border border-gray-200 text-[11px] font-extrabold text-equielect-blue hover:bg-white transition"
          style={{ borderRadius: 10 }}
        >
          Ver
        </button>
      </div>

      {/* ✅ Miniaturas: más pequeñas y ordenadas */}
      {p.images?.length > 1 && (
        <div className="px-3 pt-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {p.images.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              onMouseEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              onClick={() => setActive(idx)}
              className={`relative w-8 h-8 border transition ${
                idx === active ? "border-equielect-blue" : "border-gray-200"
              }`}
              style={{ borderRadius: 8 }}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image
                src={src}
                alt={`${p.title} ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* ✅ Info (más compacta) */}
      <div className="px-3 pt-2 pb-3">
        <div className="text-[10px] font-extrabold text-equielect-blue uppercase tracking-wide leading-tight">
          {p.brand}
        </div>

        <div className="mt-1 text-[12px] font-extrabold text-gray-900 leading-snug line-clamp-2">
          {p.title}
        </div>

        <div className="mt-1 text-[11px] text-gray-600 leading-snug line-clamp-2">
          {p.brandDesc}
        </div>
      </div>

      {open && (
        <ZoomModal title={p.title} src={mainSrc} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

function ZoomModal({ src, title, onClose }) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-3">
      <div
        className="bg-white w-full max-w-4xl border border-gray-200 overflow-hidden"
        style={{ borderRadius: 16 }}
      >
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="font-extrabold text-sm text-gray-900">{title}</div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
              className="px-3 py-2 border border-gray-200 text-sm font-extrabold hover:bg-gray-50"
              style={{ borderRadius: 10 }}
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
              className="px-3 py-2 border border-gray-200 text-sm font-extrabold hover:bg-gray-50"
              style={{ borderRadius: 10 }}
            >
              +
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 grid place-items-center text-gray-600 hover:bg-gray-50"
              style={{ borderRadius: 9999 }}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative bg-gray-50 h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
          >
            <div className="relative w-[92%] h-[92%]">
              <Image src={src} alt={title} fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 text-xs text-gray-600">
          Usa + y − para acercar/alejar.
        </div>
      </div>
    </div>
  );
}
