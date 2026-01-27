"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, MapPin, Menu } from "lucide-react";

import MegaMenuEquielect from "@/components/category/MegaMenuEquielect";

export default function Header() {
  // Desktop
  const [activeCategory, setActiveCategory] = useState(null);

  // Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  // Mobile search
  const [isMobileSearching, setIsMobileSearching] = useState(false);

  /* ===== HOVER TIMER (DESKTOP) ===== */
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 140);
  };

  const headerNavCategories = [
    "Telecomunicaciones",
    "Iluminación",
    "Cableado",
    "Sistemas portacables",
    "Automatización y control",
    "Áreas clasificadas",
    "Minería",
  ];

  return (
    <>
      {/* ✅ HEADER STICKY Y CON Z-INDEX ALTO */}
      <header className="sticky top-0 z-[100] w-full bg-white shadow-sm">
        {/* ===== TOPBAR ===== */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-between text-[11px]">
            <span className="font-medium text-equielect-blue">
              Más que negocios, hacemos amigos
            </span>

            <div className="flex items-center gap-3 text-equielect-gray">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> Medellín
              </span>
              <span className="text-gray-300">|</span>
              <a href="#ayuda" className="hover:underline">
                Centro de ayuda
              </a>
            </div>
          </div>
        </div>

        {/* ===== MAIN BAR ===== */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            {/* LOGO */}
            <div
              className={`transition-all duration-200 ${
                isMobileSearching
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100"
              } md:opacity-100 md:w-auto md:overflow-visible`}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/Logs/Logo-equielect.jpeg"
                  alt="Equielect"
                  width={155}
                  height={40}
                  className="hidden md:block object-contain"
                />
                <Image
                  src="/assets/Logs/LogoEQmovil.jpg"
                  alt="Equielect"
                  width={70}
                  height={25}
                  className="md:hidden object-contain"
                />
              </Link>
            </div>

            {/* SEARCH */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[560px]">
                <div className="flex border border-gray-300">
                  <div className="flex-1 flex items-center">
                    <Search size={15} className="ml-3 text-gray-400" />
                    <input
                      className="w-full px-3 py-[6px] text-sm outline-none"
                      placeholder="Buscar productos o marcas"
                      onFocus={() => setIsMobileSearching(true)}
                      onBlur={() => setIsMobileSearching(false)}
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-equielect-yellow px-3 text-equielect-blue"
                    aria-label="Buscar"
                  >
                    <Search size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`${isMobileSearching ? "hidden md:block" : "block"}`} />
          </div>
        </div>

        {/* ===== NAV AZUL ===== */}
        <div
          className="bg-equielect-blue relative border-t border-white/10"
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-7xl mx-auto px-2 flex items-center gap-3">
            {/* MOBILE BUTTON */}
            <button
              type="button"
              className="md:hidden text-white px-3 py-2"
              onClick={() => {
                setIsMobileMenuOpen((v) => !v);
                setMobileActiveCategory(null);
              }}
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-3">
              {headerNavCategories.map((cat) => {
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onMouseEnter={() => {
                      clearCloseTimer();
                      setActiveCategory(cat);
                    }}
                    className={`group px-2 py-2 text-sm font-medium flex items-center gap-1 transition-colors ${
                      isActive
                        ? "text-equielect-yellow"
                        : "text-white hover:text-equielect-yellow"
                    }`}
                  >
                    <span className="relative inline-block">
                      {cat}
                      <span
                        className={`absolute left-0 -bottom-[6px] h-[2px] bg-white w-full origin-left transition-transform duration-200 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </span>
                    <ChevronDown size={12} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESKTOP MEGAMENU */}
          {activeCategory && (
            <div
              className="hidden md:block absolute top-full left-0 w-full z-[1000] shadow-2xl"
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <MegaMenuEquielect category={activeCategory} />
            </div>
          )}

          {/* MOBILE OVERLAY */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-[998] bg-black/40 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute left-0 top-full w-full bg-equielect-blue z-[999] shadow-xl">
              {!mobileActiveCategory &&
                headerNavCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMobileActiveCategory(cat)}
                    className="w-full px-4 py-4 text-white font-medium border-b border-white/10 flex justify-between items-center"
                  >
                    {cat} <ChevronDown size={14} />
                  </button>
                ))}

              {mobileActiveCategory && (
                <div className="bg-white">
                  <div className="flex items-center gap-3 px-4 py-3 bg-equielect-blue text-white">
                    <button
                      type="button"
                      onClick={() => setMobileActiveCategory(null)}
                      className="p-1 hover:bg-white/10 rounded-full"
                    >
                      ←
                    </button>
                    <span className="font-semibold text-sm">
                      {mobileActiveCategory}
                    </span>
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto">
                    <MegaMenuEquielect category={mobileActiveCategory} isMobile />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}