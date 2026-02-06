"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import LoginModal from "@/components/auth/LoginModal";
import FeaturedBrandProducts from "@/components/home/FeaturedBrandsProducts.jsx";
import Allies360Carousel from "@/components/home/Allies360Carousel";

export default function Home() {
  // =========================
  // STATE & REFS
  // =========================
  const [loginOpen, setLoginOpen] = useState(false);

  // ✅ Video del celular (central)
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  // ✅ 3 videos (centro inicia en clip)
  const PHONE_VIDEOS = useMemo(
    () => [
      { id: "clip", title: "Clip", src: "/assets/videos/clip.mp4", poster: "/assets/fondos/portadacentro.png" },
      { id: "v1", title: "Video 1", src: "/assets/videos/3.mp4", poster: "/assets/logs/22.png" },
      { id: "v2", title: "Video 2", src: "/assets/videos/4.mp4", poster: "/assets/logs/33.png" },
    ],
    []
  );

  const videoMap = useMemo(() => {
    const m = {};
    PHONE_VIDEOS.forEach((v) => (m[v.id] = v));
    return m;
  }, [PHONE_VIDEOS]);

  // ✅ Orden 360: [left, center, right]
  const DEFAULT_ORDER = useMemo(() => ["v1", "clip", "v2"], []);
  const [phoneOrder, setPhoneOrder] = useState(DEFAULT_ORDER);

  const [rotationTick, setRotationTick] = useState(0);

  const leftId = phoneOrder[0];
  const centerId = phoneOrder[1];
  const rightId = phoneOrder[2];

  const leftVideo = videoMap[leftId];
  const centerVideo = videoMap[centerId];
  const rightVideo = videoMap[rightId];

  // HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // ACTIONS - VIDEO CENTRAL
  // =========================
  const safePlayCenter = async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.pause();
      el.currentTime = 0;
      el.load();
      await el.play();
    } catch {
      // autoplay puede bloquearse
    }
  };

  const handleStartVideo = async () => {
    setVideoStarted(true);
    requestAnimationFrame(() => {
      safePlayCenter();
    });
  };

  // ✅ click en lateral: rota para llevar ese lateral al centro
  const handleClickLeft = () => {
    // Left -> center = rotación "prev": [L,C,R] -> [R,L,C]
    goPrevPhoneVideo();
  };

  const handleClickRight = () => {
    // Right -> center = rotación "next": [L,C,R] -> [C,R,L]
    goNextPhoneVideo();
  };

  // ✅ Rotación 360
  const goNextPhoneVideo = () => {
    setPhoneOrder(([l, c, r]) => [c, r, l]);
    setRotationTick((t) => t + 1);
    setVideoStarted(true);
  };

  const goPrevPhoneVideo = () => {
    setPhoneOrder(([l, c, r]) => [r, l, c]);
    setRotationTick((t) => t + 1);
    setVideoStarted(true);
  };

  // ✅ cuando cambia el video central (por rotación), intenta reproducir si ya está "started"
  useEffect(() => {
    if (!videoStarted) return;
    requestAnimationFrame(() => {
      safePlayCenter();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerId]);

  // ✅ al terminar: vuelve al estado inicial (centro = clip + portada)
  const resetToDefault = () => {
    setVideoStarted(false);
    setPhoneOrder(DEFAULT_ORDER);
    setRotationTick((t) => t + 1);

    const el = videoRef.current;
    if (el) {
      try {
        el.pause();
        el.currentTime = 0;
        el.load();
      } catch {}
    }
  };

  const handleVideoEnded = () => {
    resetToDefault();
  };

  // =========================
  // HERO SLIDER HELPERS
  // =========================
  const makeSrcSet = (x1, x2) => `${x1} 1x, ${x2 || x1} 2x`;

  // =========================
  // DATA
  // =========================
  const brands = [
    {
      name: "Prysmian",
      images: {
        mobile: "/assets/Sliderhome/mobile/slider_prysmian.png",
        mobile2x: "/assets/Sliderhome/mobile/slider_prysmian.png",
        tablet: "/assets/Sliderhome/tablet/slider_tablet_prysmian.png",
        tablet2x: "/assets/Sliderhome/tablet/slider_tablet_prysmian.png",
        desktop: "/assets/Sliderhome/desktop/bannerproc_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannerproc_mac.png",
      },
    },
    {
      name: "Legrand",
      images: {
        mobile: "/assets/Sliderhome/mobile/slider_legrand.png",
        mobile2x: "/assets/Sliderhome/mobile/slider_legrand.png",
        tablet: "/assets/Sliderhome/tablet/slider_tablet_legrand.png",
        tablet2x: "/assets/Sliderhome/tablet/slider_tablet_legrand.png",
        desktop: "/assets/Sliderhome/desktop/bannerleg_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannerleg_mac.png",
      },
    },
    {
      name: "Schneider",
      images: {
        mobile: "/assets/Sliderhome/mobile/slider_schneider.png",
        mobile2x: "/assets/Sliderhome/mobile/slider_schneider.png",
        tablet: "/assets/Sliderhome/tablet/slider_tablet_schneider.png",
        tablet2x: "/assets/Sliderhome/tablet/slider_tablet_schneider.png",
        desktop: "/assets/Sliderhome/desktop/bannersch_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannersch_mac.png",
      },
    },
    {
      name: "Equielect",
      images: {
        mobile: "/assets/Sliderhome/mobile/slider_equielect.jpg",
        mobile2x: "/assets/Sliderhome/mobile/slider_equielect.jpg",
        tablet: "/assets/Sliderhome/tablet/slider_tablet_equielect.jpg",
        tablet2x: "/assets/Sliderhome/tablet/slider_tablet_equielect.jpg",
        desktop: "/assets/Sliderhome/desktop/eqw.jpg",
        desktop2x: "/assets/Sliderhome/desktop/eqmac.jpg",
      },
    },
  ];

  // ✅ HERO SLIDER HELPERS (después de brands para usar brands.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

  const quickCategories = [
    { title: "Schneider", icon: "/assets/aliados/SchneiderBG.png", href: "/marca/schneider" },
    { title: "Legrand", icon: "/assets/aliados/legrandBG.png", href: "/marca/legrand" },
    { title: "Procables", icon: "/assets/aliados/AllieProCables.png", href: "/marca/procables" },
    { title: "Gonvarri", icon: "/assets/aliados/AllieGonvarri.png", href: "/marca/gonvarri" },
    { title: "Centelsa", icon: "/assets/aliados/AllieCentelsa.png", href: "/marca/centelsa" },
    { title: "3M", icon: "/assets/aliados/Allie3M.png", href: "/marca/3M" },
    { title: "Telemecanique", icon: "/assets/aliados/AllieTelemecanica.png", href: "/marca/telemecanique" },
    { title: "Panduit", icon: "/assets/aliados/AlliePanduit.png", href: "/marca/panduit" },
    { title: "Phoenix Contact", icon: "/assets/aliados/AlliePhoenix.png", href: "/marca/phoenix-contact" },
    { title: "Sylvania", icon: "/assets/aliados/AllieSylvania.png", href: "/marca/sylvania" },
  ];

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
  ];

  // =========================
  // EFFECTS
  // =========================
  useEffect(() => {
    const done = () => setIsLoading(false);
    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done);
      const safety = setTimeout(done, 6000);
      return () => {
        window.removeEventListener("load", done);
        clearTimeout(safety);
      };
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brands.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [brands.length, isHeroPaused]);

  // =========================
  // RENDER
  // =========================
  return (
    <div className="relative">
      {/* CSS GLOBAL INTERNO */}
      <style jsx global>{`
        :root {
          --color-equielect-yellow: #ffcd00;
          --color-equielect-blue: #1c355e;
          --color-equielect-gray: #98989a;
        }
        .text-equielect-gray { color: var(--color-equielect-gray); }
        .text-equielect-blue { color: var(--color-equielect-blue); }
        .bg-equielect-yellow { background-color: var(--color-equielect-yellow); }
        .bg-equielect-blue { background-color: var(--color-equielect-blue); }

        @keyframes eqSlideInLeft {
          0% { opacity: 0; transform: translateX(-38px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes eqSlideInRight {
          0% { opacity: 0; transform: translateX(38px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .eq-slide-in-left { animation: eqSlideInLeft 650ms ease-out both; }
        .eq-slide-in-right { animation: eqSlideInRight 650ms ease-out both; }
      `}</style>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* HERO SLIDER (ENFOQUE 2: altura automática según la imagen, sin recorte) */}
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
                key={i}
                className={[
                  "transition-opacity duration-700",
                  isActive
                    ? "relative opacity-100" // ✅ el activo define la altura
                    : "absolute inset-0 opacity-0 pointer-events-none", // ✅ los demás no afectan altura
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

                {/* Overlay suave */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>
            );
          })}

          {/* Flechas */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            type="button"
            aria-label="Anterior"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            type="button"
            aria-label="Siguiente"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* MARCAS ALIADAS CAROUSEL */}
      <Reveal delay={80}>
        <section className="bg-white border-b border-gray-200">
          <Allies360Carousel
            title="Marcas Aliadas"
            items={quickCategories.map((c) => ({ name: c.title, icon: c.icon, href: c.href }))}
            speedSeconds={26}
          />
        </section>
      </Reveal>

      {/* PRODUCTOS DESTACADOS */}
      <Reveal delay={120}>
        <section className="bg-white pb-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-equielect-blue">Productos destacados por marca</h3>
              <p className="mt-1 text-sm text-gray-600">Selección rápida para comprar con soporte y garantía.</p>
            </div>
            <div className="mt-5">
              <FeaturedBrandProducts />
            </div>
            <div className="flex justify-center mt-10">
              <Link
                href="/productos"
                className="px-8 py-3 bg-[#f2c219] text-black font-bold text-xs hover:bg-[#d9af16] transition-colors"
                style={{ borderRadius: 2 }}
              >
                Ver productos
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECCIÓN INSTITUCIONAL (ROTACIÓN 360) */}
      <Reveal delay={120}>
        <section className="bg-white overflow-hidden py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <header className="text-center max-w-3xl mx-auto">
              <h2 className="text-[14px] sm:text-[46px] lg:text-[62px] font-bold text-[#1c355e] tracking-tight">
                Equielect
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                  En Equielect te ayudamos a elegir bien para tu proyecto: asesoría, disponibilidad y respaldo con marcas líderes.
                </p>
              </div>
            </header>

            {/* Wrapper para flechas en blanco */}
            <div className="relative mt-14">
              {/* Flecha izquierda */}
              <button
                type="button"
                onClick={goPrevPhoneVideo}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-[999] w-12 h-12 rounded-full bg-white/95 border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl text-gray-700 items-center justify-center"
                aria-label="Video anterior"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Flecha derecha */}
              <button
                type="button"
                onClick={goNextPhoneVideo}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-[999] w-12 h-12 rounded-full bg-white/95 border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl text-gray-700 items-center justify-center"
                aria-label="Siguiente video"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Zona teléfonos */}
              <div className="flex items-center justify-center gap-12 lg:gap-20 px-14">
                {/* LATERAL IZQUIERDO */}
                <button
                  key={`left-${leftId}-${rotationTick}`}
                  type="button"
                  onClick={handleClickLeft}
                  className={`hidden md:block eq-slide-in-left relative w-[235px] h-[405px] lg:w-[255px] lg:h-[450px] overflow-hidden shadow-2xl border-[3px] rounded-[36px] transition-transform ${
                    centerId === leftId ? "border-[#005cb9] ring-4 ring-[#005cb9]/20" : "border-white hover:scale-[1.02]"
                  }`}
                  aria-label="Llevar este video al centro"
                >
                  <video
                    src={leftVideo?.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </button>

                {/* CENTRAL */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="relative w-[260px] sm:w-[290px] h-[520px] sm:h-[580px] bg-black border-[10px] border-[#1a1a1a] shadow-2xl rounded-[3.2rem]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1a1a1a] rounded-b-2xl z-40" />

                      <div className="relative w-full h-full overflow-hidden rounded-[2.4rem] bg-black group">
                        {!videoStarted && (
                          <div
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500 bg-black/15"
                            onClick={handleStartVideo}
                          >
                            <div className="relative w-28 h-28 transition-transform duration-300 group-hover:scale-110">
                              <Image
                                src="/assets/Logs/Logo-equielect.png"
                                alt="Logo EQ"
                                fill
                                className="object-contain opacity-95"
                              />
                            </div>

                            <div className="mt-4 flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm">
                              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                              <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                                Reproducir
                              </span>
                            </div>
                          </div>
                        )}

                        <video
                          ref={videoRef}
                          key={`center-${centerId}-${rotationTick}`}
                          className="w-full h-full object-cover"
                          controls={videoStarted}
                          playsInline
                          preload="metadata"
                          poster={centerVideo?.poster}
                          onPlay={() => setVideoStarted(true)}
                          onEnded={handleVideoEnded}
                        >
                          <source src={centerVideo?.src} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center gap-2">
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                      Conócenos en 30 segundos · EQUIELECT
                    </p>
                    <Link
                      href="/quienes-somos"
                      className="px-8 py-3 bg-[#f2c219] text-black font-bold text-xs hover:bg-[#d9af16]"
                      style={{ borderRadius: 2 }}
                    >
                      Ver quienes somos
                    </Link>
                  </div>
                </div>

                {/* LATERAL DERECHO */}
                <button
                  key={`right-${rightId}-${rotationTick}`}
                  type="button"
                  onClick={handleClickRight}
                  className={`hidden md:block eq-slide-in-right relative w-[235px] h-[405px] lg:w-[255px] lg:h-[450px] overflow-hidden shadow-2xl border-[3px] rounded-[36px] transition-transform ${
                    centerId === rightId ? "border-[#005cb9] ring-4 ring-[#005cb9]/20" : "border-white hover:scale-[1.02]"
                  }`}
                  aria-label="Llevar este video al centro"
                >
                  <video
                    src={rightVideo?.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </button>
              </div>
            </div>

            {/* MÓVIL */}
            <div className="mt-10 md:hidden flex justify-center gap-4">
              <button type="button" onClick={goPrevPhoneVideo} className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleStartVideo}
                className="relative w-[170px] h-[290px] overflow-hidden shadow-xl border-[3px] rounded-[28px] border-gray-200"
              >
                <video src={centerVideo?.src} muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                {!videoStarted && <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white text-xs font-bold">TOCA PARA VER</div>}
              </button>

              <button type="button" onClick={goNextPhoneVideo} className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-6 md:hidden flex justify-center">
              <Link href="/quienes-somos" className="px-8 py-3 bg-[#f2c219] text-black font-bold text-xs hover:bg-[#d9af16]" style={{ borderRadius: 2 }}>
                Ver quienes somos
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* OTRAS MARCAS */}
      <Reveal delay={120}>
        <section className="bg-white py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl text-equielect-blue font-semibold">
              Otras Marcas <span className="font-black">Aliadas</span>
            </h2>
            <Link href="/aliados" className="text-equielect-blue font-bold text-sm hover:underline">
              Ver todas
            </Link>
          </div>
          <Allies360Carousel items={allies.map((a) => ({ name: a.name, icon: a.src, href: a.href }))} speedSeconds={30} />
        </section>

        {/* SECCIÓN CORPORATIVA FINAL (FULL BLEED, sin bordes, enfoque controlado) */}
        <section className="w-full border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* IZQUIERDA: Imagen */}
            <div className="relative bg-gray-200 md:min-h-[260px] lg:min-h-[330px]">
              {/* En móvil se ve en bloque con altura fija; en md+ se estira con la columna */}
              <div className="relative w-full h-[220px] sm:h-[260px] md:absolute md:inset-0">
                <Image
                  src="/assets/sucursal/cotiza.png"
                  alt="Equipo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                  className="
                    object-cover
                    object-left
                    sm:object-left
                    md:object-center
                    lg:object-center
                  "
                />
                {/* (Opcional) si quieres una capa suave para que el texto del banner se lea mejor */}
                <div className="absolute inset-0 bg-black/0" />
              </div>
            </div>

            {/* DERECHA: Texto */}
            <div className="relative bg-[#ffcd00] flex items-center px-6 lg:px-14 py-10 md:min-h-[260px] lg:min-h-[330px]">
              <div className="relative z-10">
                <p className="text-[#1c355e] text-sm font-semibold uppercase tracking-wider">
                  Atención al Cliente
                </p>
                <h3 className="mt-2 text-[#1c355e] text-3xl lg:text-4xl font-extrabold">
                  Oficina Virtual Equielect
                </h3>
                <p className="mt-4 text-[#1c355e]/90 max-w-md">
                  Atención rápida y asesoría profesional a un clic de distancia.
                </p>
                <div className="mt-6">
                  <a
                    href="https://api.whatsapp.com/send/?phone=573146453033"
                    target="_blank"
                    className="inline-block px-7 py-3 bg-white text-[#1c355e] font-extrabold"
                    style={{ borderRadius: 2 }}
                    rel="noreferrer"
                  >
                    Solicitar cotización
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


      </Reveal>
    </div>
  );
}
