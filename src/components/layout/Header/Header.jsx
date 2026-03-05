"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { ChevronDown, Search, MapPin, Menu } from "lucide-react";

import MegaMenuEquielect, { MEGA_MENU_DATA } from "@/components/category/MegaMenuEquielect";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Desktop
  const [activeCategory, setActiveCategory] = useState(null);

  // Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  // Mobile search
  const [isMobileSearching, setIsMobileSearching] = useState(false);

  // ✅ Search
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  /* ✅ FIX DEFINITIVO: cerrar menús al navegar (cambio de ruta) */
  useEffect(() => {
    setActiveCategory(null);
    setIsMobileMenuOpen(false);
    setMobileActiveCategory(null);
    setIsMobileSearching(false);
  }, [pathname]);

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

  /* ---------------- BUSCADOR INTELIGENTE (autocorrect + sinónimos + fuse) ---------------- */

  // ✅ normaliza: tildes, espacios, símbolos, ñ->n
  const normalizeText = (s = "") =>
    String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

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

  // ✅ Sinónimos / palabras clave (amplía cuando quieras)
  const SYNONYMS = useMemo(
    () => ({
      bombillo: [
        "bombilla",
        "lampara",
        "luz",
        "led",
        "foco",
        "luminaria",
        "iluminacion",
        "reflectores",
        "bombillo",
        "vomvillo",
        "vonvillo",
        "bonbillo",
        "luces led",
        "foco",
        "focos",
      ],
      bombilla: ["bombillo", "lampara", "luz", "led", "foco", "luminaria"],
      lampara: ["luz", "luminaria", "led", "bombillo", "bombilla", "foco"],
      luz: ["iluminacion", "lampara", "bombillo", "led", "reflector", "alumbrado"],
      led: ["luz", "iluminacion", "lampara", "bombillo", "reflector", "alumbrado"],
      reflector: ["iluminacion", "luz", "exterior", "alumbrado", "led"],
      alumbrado: ["iluminacion", "exterior", "luz", "led"],

      cable: ["cables", "cableado", "alambre", "conductor", "thhn", "utp", "ftp", "cat6", "cat6a", "cat5e"],
      cables: ["cable", "cableado", "thhn", "utp", "cat6", "conductor"],
      utp: ["cable utp", "cat6", "cat6a", "cat5e", "siemon", "telecom", "telecomunicaciones"],
      cat6: ["utp", "cable utp", "siemon", "telecom"],
      cat6a: ["utp", "cable utp", "siemon", "telecom"],
      thhn: ["cable", "cableado", "electrico", "procables", "centelsa"],
      conductor: ["cable", "cableado", "alambre", "electrico"],

      bandeja: ["portacables", "escalera", "malla", "canastilla", "charola"],
      portacables: ["bandeja", "canastilla", "malla", "escalera"],

      variador: ["variadores", "vfd", "schneider", "automatizacion", "arranque", "motor", "control"],
      variadores: ["variador", "vfd", "motor", "control", "schneider"],
      automatizacion: ["control", "variador", "arranque", "pulsadores", "interruptores"],
      control: ["automatizacion", "variador", "arranque", "pulsadores", "interruptores"],

      explosion: ["explosion", "areas clasificadas", "cajas", "sellos", "resina", "atex"],
      atex: ["areas clasificadas", "explosion", "cajas", "sellos"],
      sellos: ["areas clasificadas", "explosion", "resina"],

      mineria: ["mineria liviana", "mineria pesada", "industrial", "centelsa"],
    }),
    []
  );

  // ✅ Autocorrector (diccionario de errores comunes)
  const AUTO_CORRECT = useMemo(
    () => ({
      // iluminación
      lus: "luz",
      luses: "luces",
      luc: "luz",
      lamapra: "lampara",
      iluminacioness: "iluminacion",
      bombila: "bombilla",
      reflektor: "reflector",

      // cables/telecom
      cavle: "cable",
      cablw: "cable",
      cap6: "cat6",
      cat6e: "cat6",
      cat5: "cat5e",
      rj: "rj45",

      // automatización
      bfd: "vfd",
      varidor: "variador",
      varidadores: "variadores",

      // áreas clasificadas
      explocion: "explosion",
      atx: "atex",
    }),
    []
  );

  // ✅ Intenciones (destinos macro)
  const INTENT_ROUTES = useMemo(
    () => [
      {
        href: "/marca/philips",
        label: "Iluminación",
        tags: ["bombillo", "bombilla", "lampara", "luz", "led", "luminaria", "iluminacion", "reflector", "alumbrado", "luces"],
        priority: 120,
      },
      {
        href: "/marca/procables",
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
        href: "/marca/legrand",
        label: "Sistemas portacables",
        tags: ["portacables", "bandeja", "canastilla", "malla", "escalera", "charola"],
        priority: 105,
      },
      {
        href: "/marca/schneider",
        label: "Automatización y control",
        tags: ["automatizacion", "control", "variador", "variadores", "vfd", "arranque", "motor"],
        priority: 105,
      },
      {
        href: "/marca/crouse-hinds",
        label: "Áreas clasificadas",
        tags: ["areas clasificadas", "explosion", "atex", "cajas", "sellos", "resina"],
        priority: 95,
      },
      {
        href: "/marca/weg",
        label: "Minería",
        tags: ["mineria", "industrial", "mineria liviana", "mineria pesada"],
        priority: 90,
      },
    ],
    []
  );

  // ---------- Levenshtein (fuzzy autocorrect) ----------
  const levenshtein = (a = "", b = "") => {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[m][n];
  };

  // ✅ Vocabulario global (para fuzzy)
  const vocabulary = useMemo(() => {
    const set = new Set();

    Object.entries(SYNONYMS).forEach(([k, arr]) => {
      set.add(normalizeText(k));
      (arr || []).forEach((x) => set.add(normalizeText(x)));
    });

    INTENT_ROUTES.forEach((r) => (r.tags || []).forEach((t) => set.add(normalizeText(t))));

    const SAFE_MEGA = MEGA_MENU_DATA && typeof MEGA_MENU_DATA === "object" ? MEGA_MENU_DATA : {};
    Object.keys(SAFE_MEGA).forEach((cat) => set.add(normalizeText(cat)));

    return [...set].filter(Boolean);
  }, [SYNONYMS, INTENT_ROUTES]);

  const correctToken = (token) => {
    const t = normalizeText(token);
    if (!t) return "";

    if (AUTO_CORRECT[t]) return AUTO_CORRECT[t];
    if (vocabulary.includes(t)) return t;
    if (t.length < 3) return t;

    let best = { w: t, d: Infinity };
    for (const w of vocabulary) {
      if (Math.abs(w.length - t.length) > 2) continue;
      const d = levenshtein(t, w);
      if (d < best.d) best = { w, d };
      if (best.d === 1) break;
    }

    const threshold = t.length <= 5 ? 1 : 2;
    return best.d <= threshold ? best.w : t;
  };

  const expandQuery = (qRaw) => {
    const q = normalizeText(qRaw);
    if (!q) return { correctedQuery: "", expandedQuery: "" };

    const tokens = q.split(" ").filter(Boolean);
    const correctedTokens = tokens.map(correctToken);

    const expanded = new Set(correctedTokens);
    correctedTokens.forEach((t) => {
      const syn = SYNONYMS[t];
      if (syn) syn.forEach((s) => expanded.add(normalizeText(s)));
    });

    return {
      correctedQuery: correctedTokens.join(" "),
      expandedQuery: Array.from(expanded).join(" "),
    };
  };

  const autocorrectText = (text) => {
    const raw = String(text ?? "");
    const endsWithSpace = /\s$/.test(raw);
    if (!endsWithSpace) return raw;

    const parts = raw.split(/\s+/).filter(Boolean);
    if (!parts.length) return raw;

    const last = parts[parts.length - 1];
    const correctedLast = correctToken(last);

    parts[parts.length - 1] = correctedLast;
    return parts.join(" ") + " ";
  };

  const applyAutocorrectNow = () => {
    const el = inputRef.current;
    if (!el) return;

    const before = el.value;
    const after = autocorrectText(before);

    if (after !== before) {
      const cursor = el.selectionStart ?? after.length;
      setSearchTerm(after);

      requestAnimationFrame(() => {
        try {
          const delta = after.length - before.length;
          const nextPos = Math.max(0, cursor + delta);
          el.setSelectionRange(nextPos, nextPos);
        } catch {}
      });
    }
  };

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
  }, [INTENT_ROUTES]);

  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      includeScore: true,
      threshold: 0.38,
      ignoreLocation: true,
      minMatchCharLength: 2,
      keys: ["_labelN", "_tagsN"],
    });
  }, [searchIndex]);

  const findBestHref = (qRaw) => {
    const q = normalizeText(qRaw);
    if (!q) return null;

    const { expandedQuery } = expandQuery(q);
    const tokens = expandedQuery.split(" ").filter(Boolean);

    const intents = INTENT_ROUTES.map((r) => ({
      ...r,
      _tagsN: (r.tags || []).map(normalizeText),
    }));

    let bestIntent = null;
    let bestIntentScore = -Infinity;

    for (const r of intents) {
      let hits = 0;
      for (const t of tokens) {
        if (r._tagsN.includes(t)) hits++;
      }

      if (hits > 0) {
        const score = (r.priority || 0) + hits * 25;
        if (score > bestIntentScore) {
          bestIntentScore = score;
          bestIntent = r;
        }
      }
    }

    if (bestIntent?.href) return bestIntent.href;

    const results = fuse.search(expandedQuery);
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
    if (bestValue < 0) return null;

    return best.href;
  };

  const goSearch = () => {
    const fixed = autocorrectText(searchTerm).trim();
    if (!fixed) return;

    const { correctedQuery } = expandQuery(fixed);
    const href = findBestHref(correctedQuery || fixed);

    if (href) {
      router.push(href);
      return;
    }

    router.push(`/buscar?q=${encodeURIComponent(correctedQuery || fixed)}`);
  };

  // (opcional) cerrar menú móvil con Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-white shadow-sm">
        {/* ===== TOPBAR ===== */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-between text-[11px]">
            <span className="font-medium text-equielect-blue">Más que negocios, hacemos amigos</span>

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
                  width={125}
                  height={40}
                  className="hidden md:block object-contain w-full h-auto"
                  sizes="125px"
                  priority
                />

                <Image
                  src="/assets/Logs/LogoEQmovil.jpg"
                  alt="Equielect"
                  width={50}
                  height={25}
                  className="md:hidden object-contain"
                  style={{ width: "auto", height: "auto" }}
                  sizes="(max-width: 50px) 100vw, 90px"
                  priority
                />
              </Link>
            </div>

            {/* ✅ SEARCH + Pagos */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full flex items-center">
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
                        ref={inputRef}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            requestAnimationFrame(() => applyAutocorrectNow());
                          }
                        }}
                        className="w-full px-3 py-[6px] text-sm outline-none"
                        placeholder="Buscar productos o marcas"
                        onFocus={() => setIsMobileSearching(true)}
                        onBlur={() => {
                          applyAutocorrectNow();
                          setTimeout(() => setIsMobileSearching(false), 120);
                        }}
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
              className={`${isMobileSearching ? "hidden md:block" : "block"}`}
            >
              <img src="/assets/servicios/paga.png" alt="Pague aquí" className="h-12 w-auto object-contain" />
            </a>

            <div className={`${isMobileSearching ? "hidden md:block" : "block"}`} />
          </div>
        </div>

        {/* ===== NAV AZUL ===== */}
        <div className="bg-equielect-blue relative border-t border-white/10" onMouseLeave={scheduleClose}>
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
                      isActive ? "text-equielect-yellow" : "text-white hover:text-equielect-yellow"
                    }`}
                  >
                    <span className="relative inline-block">
                      {cat}
                      <span
                        className={`absolute left-0 -bottom-[6px] h-[2px] bg-white w-full origin-left transition-transform duration-200 ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
              <MegaMenuEquielect
                category={activeCategory}
                onNavigate={() => setActiveCategory(null)} // ✅ cierra al click
              />
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
                      aria-label="Volver"
                      title="Volver"
                    >
                      ←
                    </button>
                    <span className="font-semibold text-sm">{mobileActiveCategory}</span>
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto">
                    <MegaMenuEquielect
                      category={mobileActiveCategory}
                      isMobile
                      onNavigate={() => {
                        setIsMobileMenuOpen(false);
                        setMobileActiveCategory(null);
                      }} // ✅ cierra al click
                    />
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