"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function HomeHeroSlider({ brands = [], intervalMs = 4000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const makeSrcSet = (x1, x2) => `${x1} 1x, ${x2 || x1} 2x`;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

  useEffect(() => {
    if (!brands.length) return;
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brands.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [brands.length, isHeroPaused, intervalMs]);

  if (!brands?.length) return null;

  return (
    <section className="bg-transparent">
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {brands.map((b, i) => {
          const isActive = currentSlide === i;

          return (
            <div
              key={`${b?.name || "brand"}-${i}`}
              className={[
                "transition-opacity duration-700",
                isActive ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none",
              ].join(" ")}
              aria-hidden={!isActive}
            >
              <picture className="block w-full">
                <source
                  media="(min-width: 1024px)"
                  srcSet={makeSrcSet(b.images.desktop, b.images.desktop2x)}
                />
                <source
                  media="(min-width: 640px)"
                  srcSet={makeSrcSet(b.images.tablet, b.images.tablet2x)}
                />
                <img
                  src={b.images.mobile}
                  srcSet={makeSrcSet(b.images.mobile, b.images.mobile2x)}
                  alt={b.name}
                  className="w-full h-auto block"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>

              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </div>
          );
        })}

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
          type="button"
          aria-label="Anterior"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
          type="button"
          aria-label="Siguiente"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}