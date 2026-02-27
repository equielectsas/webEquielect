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

  // ✅ Refs de videos (todos)
  const centerVideoRef = useRef(null);
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);

  // ✅ Para reproducir al entrar en sección
  const phonesSectionRef = useRef(null);
  const [phonesInView, setPhonesInView] = useState(false);

  // ✅ 3 videos (centro inicia en clip)
  const PHONE_VIDEOS = useMemo(
    () => [
      { id: "clip", title: "Clip", src: "/assets/videos/clip.mp4" },
      { id: "v1", title: "Video 1", src: "/assets/videos/schneider.mp4" },
      { id: "v2", title: "Video 2", src: "/assets/videos/VIDEO WEB LOG.mp4" },
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

  const centerId = phoneOrder[1];
  const centerVideo = videoMap[centerId];

  // ✅ control de animación
  const [isRotating, setIsRotating] = useState(false);
  const [rotateDir, setRotateDir] = useState(null); // "next" | "prev" | null

  // HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // ✅ PLAY HELPERS (autoplay)
  // =========================
  const safePlay = async (el) => {
    if (!el) return;
    try {
      el.muted = true;
      el.playsInline = true;
      // Forzar loop y sin controles
      el.loop = true;
      el.controls = false;
      await el.play();
    } catch {
      // Autoplay puede bloquearse; queda en pausa sin overlay
    }
  };

  const getVideoRefById = (id) => {
    if (id === "clip") return centerVideoRef.current;
    if (id === "v1") return v1Ref.current;
    if (id === "v2") return v2Ref.current;
    return null;
  };

  // ✅ Reproducir todos cuando entra la sección
  useEffect(() => {
    if (!phonesSectionRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isIn = entries?.[0]?.isIntersecting;
        setPhonesInView(!!isIn);
      },
      { threshold: 0.25 }
    );

    io.observe(phonesSectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!phonesInView) return;

    // Reproduce el del centro (sea cual sea el ID actual)
    safePlay(getVideoRefById(centerId));
    // Reproduce los laterales (si existen)
    safePlay(v1Ref.current);
    safePlay(v2Ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phonesInView, centerId, rotationTick]);

  // ✅ Rotación 360
  const goNextPhoneVideo = () => {
    if (isRotating) return;
    setIsRotating(true);
    setRotateDir("next");

    setPhoneOrder(([l, c, r]) => [c, r, l]);
    setRotationTick((t) => t + 1);

    window.setTimeout(() => {
      setIsRotating(false);
      setRotateDir(null);
    }, 650);
  };

  const goPrevPhoneVideo = () => {
    if (isRotating) return;
    setIsRotating(true);
    setRotateDir("prev");

    setPhoneOrder(([l, c, r]) => [r, l, c]);
    setRotationTick((t) => t + 1);

    window.setTimeout(() => {
      setIsRotating(false);
      setRotateDir(null);
    }, 650);
  };

  const handleClickLeft = () => goPrevPhoneVideo();
  const handleClickRight = () => goNextPhoneVideo();

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
        desktop: "/assets/Sliderhome/desktop/sch_w.jpg",
        desktop2x: "/assets/Sliderhome/desktop/mac_s.jpg",
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

  const CORPORATE = useMemo(
    () => ({
      mobile: "/assets/sucursal/cot_celular.png",
      tablet: "/assets/sucursal/cot_celular.png",
      desktop: "/assets/sucursal/cot_pc.png",
      desktop2x: "/assets/sucursal/cot_pc.png",
      tablet2x: "/assets/sucursal/cot_celular.png",
      mobile2x: "/assets/sucursal/cot_celular.png",
    }),
    []
  );

  // =========================
  // EFECTOS
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
  // ✅ POSES para “360° físico”
  // =========================
  const getPhonePose = (posIndex) => {
    if (posIndex === 1) {
      return {
        z: 30,
        opacity: 1,
        filter: "none",
        transform: "translate3d(0px, 0px, 0px) scale(1) rotateY(0deg) rotateZ(0deg)",
        pointerEvents: "auto",
      };
    }

    if (posIndex === 0) {
      return {
        z: 10,
        opacity: 0.98,
        filter: "saturate(0.95) contrast(0.95) brightness(0.95)",
        transform: "translate3d(-320px, 55px, -80px) scale(0.86) rotateY(28deg) rotateZ(-1deg)",
        pointerEvents: "auto",
      };
    }

    return {
      z: 10,
      opacity: 0.98,
      filter: "saturate(0.95) contrast(0.95) brightness(0.95)",
      transform: "translate3d(320px, 55px, -80px) scale(0.86) rotateY(-28deg) rotateZ(1deg)",
      pointerEvents: "auto",
    };
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="relative">
      <style jsx global>{`
        :root {
          --color-equielect-yellow: #ffcd00;
          --color-equielect-blue: #1c355e;
          --color-equielect-gray: #98989a;
        }
        .text-equielect-gray {
          color: var(--color-equielect-gray);
        }
        .text-equielect-blue {
          color: var(--color-equielect-blue);
        }
        .bg-equielect-yellow {
          background-color: var(--color-equielect-yellow);
        }
        .bg-equielect-blue {
          background-color: var(--color-equielect-blue);
        }

        .eq-phones-stage {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .eq-phone-item {
          transition: transform 650ms cubic-bezier(0.22, 0.9, 0.2, 1),
            filter 650ms cubic-bezier(0.22, 0.9, 0.2, 1),
            opacity 650ms cubic-bezier(0.22, 0.9, 0.2, 1);
          will-change: transform, opacity, filter;
        }
        .eq-rotate-next .eq-phone-item {
          transition-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
        }
        .eq-rotate-prev .eq-phone-item {
          transition-timing-function: cubic-bezier(0.2, 0.9, 0.15, 1);
        }

        .eq-phone-shell {
          box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18);
        }
        .eq-phone-glass {
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 18px 28px rgba(255, 255, 255, 0.05),
            inset 0 -18px 28px rgba(0, 0, 0, 0.2);
        }

        /* ✅ quita botón play/controles extra en webkit */
        .eq-phone-glass video::-webkit-media-controls {
          display: none !important;
        }
      `}</style>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* HERO SLIDER */}
      <section className="bg-transparent">
        <div className="relative w-full" onMouseEnter={() => setIsHeroPaused(true)} onMouseLeave={() => setIsHeroPaused(false)}>
          {brands.map((b, i) => {
            const isActive = currentSlide === i;

            return (
              <div
                key={i}
                className={[
                  "transition-opacity duration-700",
                  isActive ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none",
                ].join(" ")}
                aria-hidden={!isActive}
              >
                <picture className="block w-full">
                  <source media="(min-width: 1024px)" srcSet={makeSrcSet(b.images.desktop, b.images.desktop2x)} />
                  <source media="(min-width: 640px)" srcSet={makeSrcSet(b.images.tablet, b.images.tablet2x)} />
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
          <Allies360Carousel title="Marcas Aliadas" items={quickCategories.map((c) => ({ name: c.title, icon: c.icon, href: c.href }))} speedSeconds={26} />
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
          </div>
        </section>
      </Reveal>

      {/* ✅ SECCIÓN INSTITUCIONAL + CELULARES */}
      <Reveal delay={120}>
        <section className="relative bg-white overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[620px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#f2c219]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#1c355e]/10 blur-3xl" />
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#1c355e] tracking-[-0.04em] leading-none">
              EQUIELECT<span className="text-[#f2c219]">.</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-gray-700">
              Más que negocios, hacemos amigos
            </p>

            <div className="mt-6 flex justify-center">
              <div className="h-[2px] w-20 rounded-full bg-[#f2c219]" />
            </div>

            <p className="mt-8 text-[#1c355e]/80 text-sm sm:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
              Tu aliado estratégico en soluciones eléctricas e industriales.
            </p>

            <p className="mt-4 text-gray-600 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
              Asesoría técnica, disponibilidad y respaldo de marcas globales, con un equipo que responde cuando el proyecto lo exige.
            </p>

            <div className="mt-10 flex justify-center">
              <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {/* ✅ CONTENEDOR CELULARES */}
            <div ref={phonesSectionRef} className="relative mt-6 sm:mt-7">
              {/* ✅ Flechas DESKTOP/TABLET (más afuera, no encima) */}
              <button
                type="button"
                onClick={goPrevPhoneVideo}
                disabled={isRotating}
                className="hidden md:flex absolute left-[-28px] lg:left-[-44px] top-1/2 -translate-y-1/2 z-[999] w-12 h-12 rounded-full bg-white/95 border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl text-gray-700 items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Historia anterior"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goNextPhoneVideo}
                disabled={isRotating}
                className="hidden md:flex absolute right-[-28px] lg:right-[-44px] top-1/2 -translate-y-1/2 z-[999] w-12 h-12 rounded-full bg-white/95 border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl text-gray-700 items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Siguiente historia"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* ✅ Flechas SOLO MÓVIL (más afuera) */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={goPrevPhoneVideo}
                  disabled={isRotating}
                  aria-label="Anterior"
                  className="absolute -left-10 top-1/2 -translate-y-1/2 z-[999] px-3 py-3 text-[#1c355e] text-[72px] font-black leading-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={goNextPhoneVideo}
                  disabled={isRotating}
                  aria-label="Siguiente"
                  className="absolute -right-10 top-1/2 -translate-y-1/2 z-[999] px-3 py-3 text-[#1c355e] text-[72px] font-black leading-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
                >
                  ›
                </button>
              </div>

              {/* Stage */}
              <div
                className={[
                  "eq-phones-stage relative mx-auto",
                  "h-[520px] sm:h-[610px] md:h-[660px] lg:h-[720px]",
                  rotateDir === "next" ? "eq-rotate-next" : "",
                  rotateDir === "prev" ? "eq-rotate-prev" : "",
                ].join(" ")}
              >
                {PHONE_VIDEOS.map((vid) => {
                  const posIndex = phoneOrder.indexOf(vid.id);
                  const pose = getPhonePose(posIndex);
                  const isCenter = posIndex === 1;
                  const isLeft = posIndex === 0;
                  const isRight = posIndex === 2;

                  const bezel = isCenter ? "p-[12px]" : "p-[8px]";
                  const radiusOuter = "rounded-[3.2rem]";
                  const radiusInner = isCenter ? "rounded-[2.5rem]" : "rounded-[2.35rem]";

                  // ✅ ref por id (para autoplay al entrar)
                  const videoRef =
                    vid.id === "clip" ? centerVideoRef : vid.id === "v1" ? v1Ref : v2Ref;

                  return (
                    <div
                      key={vid.id}
                      className="eq-phone-item absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate3d(-50%, -50%, 0px) ${pose.transform}`,
                        zIndex: pose.z,
                        opacity: pose.opacity,
                        filter: pose.filter,
                        pointerEvents: pose.pointerEvents,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (isRotating) return;
                          if (isLeft) handleClickLeft();
                          if (isRight) handleClickRight();
                        }}
                        className={[
                          "relative block eq-phone-shell",
                          "w-[260px] h-[450px] lg:w-[285px] lg:h-[505px]",
                          isCenter ? "w-[295px] sm:w-[340px] h-[560px] sm:h-[620px]" : "",
                          radiusOuter,
                          bezel,
                          "overflow-visible",
                          // ✅ sin fondo negro visible por fuera
                          "bg-transparent",
                          "ring-1 ring-black/10",
                          isCenter ? "shadow-2xl" : "shadow-xl",
                          isCenter ? "" : "hover:scale-[1.02]",
                          isRotating ? "cursor-default" : "cursor-pointer",
                        ].join(" ")}
                        aria-label={isCenter ? "Historia actual" : "Llevar historia al centro"}
                        disabled={isRotating}
                      >
                        {/* ✅ quitamos el overlay degradado que te ensuciaba */}
                        <div className={["relative w-full h-full overflow-hidden eq-phone-glass", radiusInner].join(" ")}>
                          {/* ✅ VIDEO SIEMPRE (sin poster, sin botón, sin controles) */}
                          <video
                            ref={videoRef}
                            key={`${vid.id}-${centerId}-${rotationTick}`} // refresca cuando rota
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            preload="auto"
                            controls={false}
                            autoPlay={phonesInView}
                          >
                            <source src={(isCenter ? centerVideo?.src : vid.src) || vid.src} type="video/mp4" />
                          </video>

                          {/* ✅ ring interno suave */}
                          <div className={["pointer-events-none absolute inset-0", radiusInner, "ring-1 ring-white/10"].join(" ")} />
                        </div>

                        {/* ✅ ring externo */}
                        <div className={["pointer-events-none absolute inset-0", radiusOuter, "ring-1 ring-white/10"].join(" ")} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-col items-center gap-2">
                <br />
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
          </div>
        </section>
      </Reveal>

      {/* OTRAS MARCAS + SECCIÓN CORPORATIVA */}
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

        <section className="w-full border-t border-gray-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="w-full">
              <picture className="block w-full">
                <source media="(min-width: 1024px)" srcSet={makeSrcSet(CORPORATE.desktop, CORPORATE.desktop2x)} />
                <source media="(min-width: 768px)" srcSet={makeSrcSet(CORPORATE.tablet, CORPORATE.tablet2x)} />
                <img
                  src={CORPORATE.mobile}
                  srcSet={makeSrcSet(CORPORATE.mobile, CORPORATE.mobile2x)}
                  alt="Acompañamiento técnico especializado - Equielect"
                  className="w-full h-auto block"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="bg-[#ffcd00] flex items-center">
              <div className="w-full px-6 md:px-8 lg:px-14 py-10 md:py-0">
                <div className="max-w-xl">
                  <p className="text-[#1c355e] text-sm font-semibold uppercase tracking-wider">Atención al Cliente</p>
                  <h3 className="mt-2 text-[#1c355e] text-3xl lg:text-4xl font-extrabold">Oficina Virtual Equielect</h3>
                  <p className="mt-4 text-[#1c355e]/90">Atención rápida y asesoría profesional a un clic de distancia.</p>

                  <div className="mt-6">
                    <Link
                      href="/contactanos"
                      className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#1c355e] font-extrabold"
                      style={{ borderRadius: 2 }}
                    >
                      Solicitar cotización
                    </Link>
                  </div>

                  <div className="h-3 md:hidden" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}