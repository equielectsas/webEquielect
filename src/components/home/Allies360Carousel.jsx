"use client";

import React, { useMemo, useRef, useState } from "react";

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

  const safeHref = (item) =>
    item?.href || (item?.slug ? `/marca/${item.slug}` : "/");

  // ✅ Cuando estás al inicio y pides ir "atrás",
  // saltamos al centro (segunda mitad) para permitir scroll negativo "real".
  const ensureCanScrollBack = () => {
    const el = wrapRef.current;
    if (!el) return;

    // si ya no estamos pegados al inicio, no hacemos nada
    if (el.scrollLeft > 2) return;

    // saltar al "medio" (aprox ancho del contenido / 2)
    // Esto funciona porque duplicamos items => el medio es un punto válido.
    const mid = Math.floor(el.scrollWidth / 2);
    el.scrollLeft = mid;
  };

  const scrollByStep = (dir = 1) => {
    const el = wrapRef.current;
    if (!el) return;

    if (dir < 0) {
      ensureCanScrollBack();
    }

    el.scrollBy({ left: dir * stepPx, behavior: "smooth" });
  };

  return (
    <section className="bg-white overflow-visible">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {!!title && (
          <div className="mb-6 text-center">
            <h3 className="text-xl sm:text-xl text-equielect-blue">
              <span className="font-semibold">{title.split(" ")[0]} </span>
              <span className="font-extrabold" style={{ fontWeight: 900 }}>
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h3>
          </div>
        )}

        <div className="relative w-full">
          {/* Flecha izquierda */}
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Anterior"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ strokeWidth: 2.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Siguiente"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ strokeWidth: 2.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Canal lateral para que no pase debajo */}
          <div className="px-14 sm:px-16">
            <div
              ref={wrapRef}
              className="overflow-hidden scrollbar-hide"
              onMouseEnter={() => pauseOnHover && setPaused(true)}
              onMouseLeave={() => pauseOnHover && setPaused(false)}
            >
              <div
                className={`marquee-track flex items-center gap-10 py-6 min-w-max ${
                  paused ? "is-paused" : ""
                }`}
                style={{ ["--duration"]: `${speedSeconds}s` }}
              >
                {doubled.map((item, idx) => (
                  <a
                    key={`${item?.slug || item?.name || "item"}-${idx}`}
                    href={safeHref(item)}
                    className="flex-shrink-0 group flex flex-col items-center"
                    aria-label={`Ir a ${item?.name || "marca"}`}
                  >
                    <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-gray-200 bg-white shadow-sm grid place-items-center transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                      <div className="relative w-[72%] h-[72%]">
                        <img
                          src={item?.icon}
                          alt={item?.name || "Aliado"}
                          className="w-full h-full object-contain partnerLogo"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <p className="mt-3 text-center text-[13px] sm:text-sm font-medium text-gray-900 group-hover:text-equielect-blue">
                      {item?.name || ""}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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