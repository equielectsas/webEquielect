"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ShoppingCart,
  User,
  Search,
  MapPin,
  Menu,
  Heart,
} from "lucide-react";

import { useCart } from "@/context/Cart/CartContext";
import { useFavorites } from "@/context/Favorites/FavoritesContext";
import LoginModal from "@/components/auth/LoginModal";

import CartDrawer from "@/components/Cart/CartDrawer";
import MegaMenuEquielect from "@/components/category/MegaMenuEquielect";

export default function Header({
  isCartOpen,
  onOpenCart,
  onCloseCart,
}) {
  const { cartCount } = useCart();
  const { count: favCount } = useFavorites();

  // ✅ Login modal
  const [loginOpen, setLoginOpen] = useState(false);

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
      {/* ✅ Modal Login */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* ✅ Header ESTÁTICO */}
      <header className="relative z-[50] w-full bg-white">
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

              <span className="hidden md:flex items-center gap-3">
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="hover:underline"
                >
                  Mi cuenta
                </button>
              </span>
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
                  >
                    <Search size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className={`flex items-center gap-3 ${
                isMobileSearching ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Favoritos */}
              <Link
                href="/favoritos"
                className="relative hidden sm:flex items-center gap-2 px-2 py-[6px] text-sm font-medium text-equielect-blue hover:text-equielect-yellow transition"
                aria-label="Favoritos"
              >
                <Heart size={16} />
                {favCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-equielect-blue text-white text-xs w-5 h-5 flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </Link>

              {/* Cuenta */}
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="hidden sm:flex items-center gap-2 px-2 py-[6px] text-sm font-medium text-equielect-blue hover:text-equielect-yellow transition"
              >
                <User size={16} /> Cuenta
              </button>

              {/* Carrito (ahora usa props del MainLayout) */}
              <button
                type="button"
                data-open-cart
                onClick={onOpenCart}
                className="relative bg-equielect-yellow px-3 py-[6px] font-semibold text-equielect-blue flex items-center gap-1"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Carrito</span>
                <span className="absolute -top-2 -right-2 bg-equielect-blue text-white text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
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
              className="hidden md:block absolute top-full left-0 w-full z-[999]"
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <MegaMenuEquielect category={activeCategory} />
            </div>
          )}

          {/* MOBILE OVERLAY */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-[998] bg-black/30 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute left-0 top-full w-full bg-equielect-blue z-[999]">
              {!mobileActiveCategory &&
                headerNavCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMobileActiveCategory(cat)}
                    className="w-full px-4 py-3 text-white font-medium border-b border-white/10 flex justify-between"
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
                      aria-label="Volver"
                    >
                      ←
                    </button>
                    <span className="font-semibold text-sm">
                      {mobileActiveCategory}
                    </span>
                  </div>

                  <div className="max-h-[65vh] overflow-y-auto">
                    <MegaMenuEquielect category={mobileActiveCategory} isMobile />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ✅ Drawer controlado por MainLayout */}
      <CartDrawer open={!!isCartOpen} onClose={onCloseCart} />
    </>
  );
}
