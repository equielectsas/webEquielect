"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Carousel infinito 360 + flechas manuales.
 * Corregido: Flechas fuera del área de logos.
 */
export default function Allies360Carousel({
  items = [],
  title = "",
  speedSeconds = 28, 
  stepPx = 320, 
  pauseOnHover = true,
}) {
  const wrapRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const doubled = useMemo(() => [...items, ...items], [items]);

  const scrollByStep = (dir = 1) => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * stepPx, behavior: "smooth" });
  };

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Título de la sección */}
        <div className="mb-6 text-center">
          <h3 className="text-xl sm:text-xl text-equielect-blue">
            <span className="font-semibold">{title.split(" ")[0]} </span>
            <span className="font-extrabold" style={{ fontWeight: 900 }}>
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h3>
        </div>

        {/* Contenedor Relativo con Padding extra para las flechas */}
        <div className="relative px-2 sm:px-14">
          
          {/* Flecha izquierda - Fuera del carrusel */}
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Anterior"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ strokeWidth: 2.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Flecha derecha - Fuera del carrusel */}
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Siguiente"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ strokeWidth: 2.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Área visible (Corta los logos que se salen) */}
          <div
            ref={wrapRef}
            className="overflow-hidden scrollbar-hide"
            onMouseEnter={() => pauseOnHover && setPaused(true)}
            onMouseLeave={() => pauseOnHover && setPaused(false)}
          >
            {/* Track infinito */}
            <div
              className={`marquee-track flex items-center gap-10 py-6 min-w-max ${
                paused ? "is-paused" : ""
              }`}
              style={{
                ["--duration"]: `${speedSeconds}s`,
              }}
            >
              {doubled.map((item, idx) => (
                <Link
                  key={`${item.slug || item.name}-${idx}`}
                  href={item.href || (item.slug ? `/marca/${item.slug}` : "/")}
                  className="flex-shrink-0 group flex flex-col items-center"
                  aria-label={`Ir a ${item.name}`}
                >
                  <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-gray-200 bg-white shadow-sm grid place-items-center transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="relative w-[72%] h-[72%]">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        fill
                        className="object-contain partnerLogo"
                        sizes="120px"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[13px] sm:text-sm font-medium text-gray-900 group-hover:text-equielect-blue">
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS del marquee */}
      <style jsx>{`
        .marquee-track {
          animation: marquee var(--duration) linear infinite;
          will-change: transform;
        }

        .marquee-track.is-paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}