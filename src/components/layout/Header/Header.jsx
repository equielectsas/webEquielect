"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { ChevronDown, Search, MapPin, Menu } from "lucide-react";

import MegaMenuEquielect, { MEGA_MENU_DATA } from "@/components/category/MegaMenuEquielect";

export default function Header() {
  const router = useRouter();

  // Desktop
  const [activeCategory, setActiveCategory] = useState(null);

  // Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  // Mobile search
  const [isMobileSearching, setIsMobileSearching] = useState(false);

  // ✅ Search
  const [searchTerm, setSearchTerm] = useState("");

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

  // ✅ URL Google Maps (Equielect)
  const EQU_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=Equielect%20S.A.S.%20Carrera%2072%20No.%2030-53%20Medell%C3%ADn%20Antioquia";

  /* ---------------- BUSCADOR INTELIGENTE (sinónimos + fuzzy) ---------------- */

  const normalizeText = (t) =>
    String(t || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita tildes
      .replace(/\s+/g, " ");

  const slugify = (text) =>
    String(text)
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const normalizeItem = (item) => {
    if (!item) return null;
    if (typeof item === "string") return { label: item, href: null };
    if (typeof item === "object" && item.label) return item;
    return null;
  };

  // ✅ Sinónimos / palabras clave (puedes ampliar)
  const SYNONYMS = useMemo(
    () => ({
      bombillo: ["bombilla", "lampara", "lámpara", "luz", "led", "foco", "luminaria", "iluminacion", "iluminación"],
      bombilla: ["bombillo", "lampara", "lámpara", "luz", "led", "foco", "luminaria"],
      lampara: ["luz", "luminaria", "led", "bombillo", "bombilla", "foco"],
      luz: ["iluminacion", "iluminación", "lampara", "lámpara", "bombillo", "led", "reflector"],
      led: ["luz", "iluminacion", "lampara", "bombillo", "reflector", "alumbrado"],
      reflector: ["iluminacion", "luz", "exterior", "alumbrado", "led"],
      alumbrado: ["iluminacion", "exterior", "luz", "led"],

      cable: ["cables", "cableado", "alambre", "conductor", "thhn", "utp", "ftp", "cat6", "cat6a", "cat5e"],
      cables: ["cable", "cableado", "thhn", "utp", "cat6", "conductor"],
      utp: ["cable utp", "cat6", "cat6a", "cat5e", "siemon", "telecomunicaciones", "telecom"],
      cat6: ["utp", "cable utp", "siemon", "telecom"],
      cat6a: ["utp", "cable utp", "siemon", "telecom"],
      thhn: ["cable", "cableado", "electrico", "eléctrico", "procables", "centelsa"],
      conductor: ["cable", "cableado", "alambre", "electrico", "eléctrico"],

      bandeja: ["portacables", "escalera", "malla", "canastilla", "charola"],
      portacables: ["bandeja", "canastilla", "malla", "escalera"],

      variador: ["variadores", "vfd", "schneider", "automatizacion", "automatización", "arranque", "motor", "control"],
      variadores: ["variador", "vfd", "motor", "control", "schneider"],
      automatizacion: ["automatización", "control", "variador", "arranque", "pulsadores", "interruptores"],
      control: ["automatizacion", "variador", "arranque", "pulsadores", "interruptores"],

      explosion: ["explosion", "explosión", "areas clasificadas", "cajas", "sellos", "resina", "atex"],
      atex: ["areas clasificadas", "explosion", "explosión", "cajas", "sellos"],
      sellos: ["areas clasificadas", "explosion", "resina"],

      mineria: ["mineria liviana", "mineria pesada", "industrial", "centelsa"],
    }),
    []
  );

  // ✅ Intenciones (destinos “macro”)
  const INTENT_ROUTES = useMemo(
    () => [
      {
        href: "/iluminacion/interior",
        label: "Iluminación",
        tags: ["bombillo", "bombilla", "lampara", "lámpara", "luz", "led", "luminaria", "iluminacion", "reflector", "alumbrado"],
        priority: 120,
      },
      {
        href: "/cableado/electrico",
        label: "Cableado eléctrico",
        tags: ["cable", "cables", "cableado", "thhn", "conductor", "alambre", "baja tension", "media tension"],
        priority: 110,
      },
      {
        href: "/marca/siemon",
        label: "Telecomunicaciones (Siemon)",
        tags: ["utp", "cat6", "cat6a", "cat5e", "telecom", "telecomunicaciones", "cable utp"],
        priority: 115,
      },
      {
        href: "/portacables",
        label: "Sistemas portacables",
        tags: ["portacables", "bandeja", "canastilla", "malla", "escalera", "charola"],
        priority: 105,
      },
      {
        href: "/automatizacion",
        label: "Automatización y control",
        tags: ["automatizacion", "automatización", "control", "variador", "variadores", "vfd", "arranque", "motor"],
        priority: 105,
      },
      {
        href: "/areas-clasificadas",
        label: "Áreas clasificadas",
        tags: ["areas clasificadas", "explosion", "explosión", "atex", "cajas", "sellos", "resina"],
        priority: 95,
      },
      {
        href: "/mineria",
        label: "Minería",
        tags: ["mineria", "industrial", "mineria liviana", "mineria pesada"],
        priority: 90,
      },
    ],
    []
  );

  // ✅ Index global (intenciones + mega menú)
  const searchIndex = useMemo(() => {
    const entries = [];

    INTENT_ROUTES.forEach((r) => {
      entries.push({
        label: r.label,
        href: r.href,
        tags: r.tags,
        priority: r.priority,
      });
    });

    // ✅ BLINDAJE: evita error si MEGA_MENU_DATA llega undefined por import/ruta
    const SAFE_MEGA = MEGA_MENU_DATA && typeof MEGA_MENU_DATA === "object" ? MEGA_MENU_DATA : {};

    Object.entries(SAFE_MEGA).forEach(([categoryName, cat]) => {
      const firstHref = cat?.columns?.[0]?.href || "/";
      entries.push({
        label: categoryName,
        href: firstHref,
        tags: [categoryName],
        priority: 80,
      });

      (cat?.columns || []).forEach((col) => {
        entries.push({
          label: col.title,
          href: col.href,
          tags: [categoryName, col.title],
          priority: 85,
        });

        (col.items || [])
          .map(normalizeItem)
          .filter(Boolean)
          .forEach((it) => {
            const href = it.href || `${col.href}/${slugify(it.label)}`;
            entries.push({
              label: it.label,
              href,
              tags: [categoryName, col.title, it.label],
              priority: 95,
            });
          });
      });
    });

    return entries.map((e) => ({
      ...e,
      _labelN: normalizeText(e.label),
      _tagsN: (e.tags || []).map(normalizeText),
    }));
  }, [INTENT_ROUTES]); // 👈 mantengo tu dependencia (lógica intacta)

  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      includeScore: true,
      threshold: 0.38,
      ignoreLocation: true,
      minMatchCharLength: 2,
      keys: ["_labelN", "_tagsN"],
    });
  }, [searchIndex]);

  const expandQuery = (qRaw) => {
    const q = normalizeText(qRaw);
    if (!q) return "";

    const tokens = q.split(" ");
    const expanded = new Set(tokens);

    tokens.forEach((t) => {
      const syn = SYNONYMS[t];
      if (syn) syn.forEach((s) => expanded.add(normalizeText(s)));
    });

    return Array.from(expanded).join(" ");
  };

  const findBestHref = (qRaw) => {
    const q = normalizeText(qRaw);
    if (!q) return null;

    const expanded = expandQuery(q);
    const results = fuse.search(expanded);

    if (!results?.length) return null;

    let best = null;
    let bestValue = -Infinity;

    for (const r of results.slice(0, 10)) {
      const score = typeof r.score === "number" ? r.score : 1;
      const priority = r.item.priority || 0;
      const value = priority - score * 100;

      if (value > bestValue) {
        bestValue = value;
        best = r.item;
      }
    }

    if (!best) return null;
    if (bestValue < 8) return null;

    return best.href;
  };

  const goSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;

    const href = findBestHref(q);

    if (href) {
      router.push(href);
      return;
    }

    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-white shadow-sm">
        {/* ===== TOPBAR ===== */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-between text-[11px]">
            <span className="font-medium text-equielect-blue">
              Más que negocios, hacemos amigos
            </span>

            <div className="flex items-center gap-3 text-equielect-gray">
              <a
                href={EQU_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:underline"
                aria-label="Ver ubicación en Google Maps"
                title="Ver ubicación en Google Maps"
              >
                <MapPin size={12} />
                Ubicación
              </a>

              <span className="text-gray-300">|</span>

              <Link href="/contactanos" className="hover:underline">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>

        {/* ===== MAIN BAR ===== */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            {/* LOGO */}
            <div
              className={`transition-all duration-200 ${
                isMobileSearching ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
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

            {/* ✅ SEARCH FUNCIONAL + Pagos PSE (sin acortar el search) */}
                <div className="flex-1 flex items-center justify-center">
                  {/* Contenedor general centrado */}
                  <div className="w-full flex items-center">
                    {/* ✅ El search mantiene su ancho fijo */}
                    <div className="w-full max-w-[560px] mx-auto">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          goSearch();
                        }}
                        className="flex border border-gray-300"
                      >
                        <div className="flex-1 flex items-center">
                          <Search size={15} className="ml-3 text-gray-400" />
                          <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-[6px] text-sm outline-none"
                            placeholder="Buscar productos o marcas"
                            onFocus={() => setIsMobileSearching(true)}
                            onBlur={() => setTimeout(() => setIsMobileSearching(false), 120)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-equielect-yellow px-3 text-equielect-blue"
                          aria-label="Buscar"
                          title="Buscar"
                        >
                          <Search size={18} strokeWidth={2.5} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                  <a
  href="https://www.mipagoamigo.com/MPA_WebSite/ServicePayments/StartPayment?id=10341&searchedCategoryId=&searchedAgreementName=EQUIELECT"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Pague aquí (abre en nueva pestaña)"
>
  <img
    src="/assets/servicios/paga.png"
    alt="Pague aquí"
    className="h-12 w-auto object-contain"
  />
</a>

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
