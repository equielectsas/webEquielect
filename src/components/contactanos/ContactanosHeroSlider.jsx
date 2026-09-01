"use client";

import React, { useEffect, useState } from "react";

const DEFAULT_WA_PHONE = "573146453033";
const makeSrcSet = (x1, x2) => `${x1} 1x, ${x2 || x1} 2x`;

function getSlideImages(slide) {
  if (slide.images) return slide.images;

  const src = slide.src || "";
  return {
    mobile: src,
    mobile2x: src,
    tablet: src,
    tablet2x: src,
    desktop: src,
    desktop2x: src,
  };
}

function SlidePicture({ slide, loading = "lazy" }) {
  const images = getSlideImages(slide);

  return (
    <picture className="block w-full leading-none">
      <source
        media="(min-width: 1024px)"
        srcSet={makeSrcSet(images.desktop, images.desktop2x)}
      />
      <source
        media="(min-width: 640px)"
        srcSet={makeSrcSet(images.tablet, images.tablet2x)}
      />
      <img
        src={images.mobile}
        srcSet={makeSrcSet(images.mobile, images.mobile2x)}
        sizes="100vw"
        alt={slide.alt || "Banner Equielect"}
        className="w-full h-auto max-w-full block select-none"
        loading={loading}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

export default function ContactanosHeroSlider({
  slides = [],
  phone = DEFAULT_WA_PHONE,
  intervalMs = 2000,
  children,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!slides.length) return;
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [slides.length, isPaused, intervalMs]);

  if (!slides.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full">
        {/* Reserva altura para evitar saltos al cambiar de slide */}
        <div className="invisible pointer-events-none" aria-hidden="true">
          <SlidePicture slide={slides[0]} loading="eager" />
        </div>

        {slides.map((slide, i) => {
          const isActive = currentSlide === i;
          const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(slide.whatsappMessage)}`;

          return (
            <a
              key={`${slide.src || slide.images?.desktop}-${i}`}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "absolute inset-x-0 top-0 block transition-opacity duration-700 cursor-pointer",
                isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none",
              ].join(" ")}
              aria-hidden={!isActive}
              aria-label={slide.alt || "Cotizar por WhatsApp"}
            >
              <SlidePicture slide={slide} loading={i === 0 ? "eager" : "lazy"} />
            </a>
          );
        })}
      </div>

      {children ? (
        <div className="absolute inset-0 z-10 flex items-center pointer-events-none">{children}</div>
      ) : null}

      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            type="button"
            aria-label="Banner anterior"
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
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            type="button"
            aria-label="Banner siguiente"
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
        </>
      )}
    </div>
  );
}
