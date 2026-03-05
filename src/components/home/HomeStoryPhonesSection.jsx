"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";

export default function HomeStoryPhonesSection() {
  // =========================
  // Hydration-safe mount
  // =========================
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ✅ Refs de videos
  const centerVideoRef = useRef(null);
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);

  // ✅ Para reproducir al entrar en sección
  const phonesSectionRef = useRef(null);
  const [phonesInView, setPhonesInView] = useState(false);

  // ✅ Videos
  const PHONE_VIDEOS = useMemo(
    () => [
      { id: "clip", title: "Clip", src: "/assets/Videos/clip.mp4" },
      { id: "v1", title: "Video 1", src: "/assets/Videos/schneider.mp4" },
      { id: "v2", title: "Video 2", src: "/assets/Videos/VIDEO WEB LOG.mp4" },
    ],
    []
  );

  const videoMap = useMemo(() => {
    const m = {};
    PHONE_VIDEOS.forEach((v) => (m[v.id] = v));
    return m;
  }, [PHONE_VIDEOS]);

  // ✅ Orden 360
  const DEFAULT_ORDER = useMemo(() => ["v1", "clip", "v2"], []);
  const [phoneOrder, setPhoneOrder] = useState(DEFAULT_ORDER);
  const [rotationTick, setRotationTick] = useState(0);

  const centerId = phoneOrder[1];
  const centerVideo = videoMap[centerId];

  // ✅ animación
  const [isRotating, setIsRotating] = useState(false);
  const [rotateDir, setRotateDir] = useState(null);

  // ✅ Centro controls
  const [isCenterMuted, setIsCenterMuted] = useState(true);
  const [isCenterPaused, setIsCenterPaused] = useState(false);

  // ✅ Overlay feedback
  const [centerOverlay, setCenterOverlay] = useState(null);
  const overlayTimerRef = useRef(null);

  const showCenterOverlay = (type) => {
    setCenterOverlay(type);
    if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = window.setTimeout(() => setCenterOverlay(null), 600);
  };

  useEffect(() => {
    return () => {
      if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    };
  }, []);

  const safePlay = async (el) => {
    if (!el) return;
    try {
      el.muted = true;
      el.playsInline = true;
      el.loop = true;
      el.controls = false;
      await el.play();
    } catch {}
  };

  const getVideoRefById = (id) => {
    if (id === "clip") return centerVideoRef.current;
    if (id === "v1") return v1Ref.current;
    if (id === "v2") return v2Ref.current;
    return null;
  };

  const getCenterVideoEl = () => getVideoRefById(centerId);

  // IntersectionObserver
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

  // autoplay
  useEffect(() => {
    if (!mounted) return;
    if (!phonesInView) return;

    safePlay(getVideoRefById(centerId));
    safePlay(v1Ref.current);
    safePlay(v2Ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, phonesInView, centerId, rotationTick]);

  // reset cuando cambia centro
  useEffect(() => {
    if (!mounted) return;

    setIsCenterMuted(true);
    setIsCenterPaused(false);

    const el = getCenterVideoEl();
    if (!el) return;

    if (phonesInView) safePlay(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, centerId]);

  // aplicar mute/pause
  useEffect(() => {
    if (!mounted) return;
    const el = getCenterVideoEl();
    if (!el) return;

    el.muted = isCenterMuted;

    if (isCenterPaused) {
      try {
        el.pause();
      } catch {}
      return;
    }

    if (phonesInView) el.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isCenterMuted, isCenterPaused, phonesInView, centerId]);

  const toggleCenterPlay = async () => {
    if (!mounted) return;
    const el = getCenterVideoEl();
    if (!el) return;

    if (isCenterPaused) {
      setIsCenterPaused(false);
      showCenterOverlay("play");
      try {
        await el.play();
      } catch {}
      return;
    }

    setIsCenterPaused(true);
    showCenterOverlay("pause");
    try {
      el.pause();
    } catch {}
  };

  const toggleCenterMute = async () => {
    if (!mounted) return;
    const el = getCenterVideoEl();
    if (!el) return;

    const nextMuted = !isCenterMuted;
    setIsCenterMuted(nextMuted);
    showCenterOverlay(nextMuted ? "mute" : "sound");

    if (!nextMuted && phonesInView && !isCenterPaused) {
      el.muted = false;
      el.play().catch(() => {});
    }
  };

  // rotación
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
        transform:
          "translate3d(-320px, 55px, -80px) scale(0.86) rotateY(28deg) rotateZ(-1deg)",
        pointerEvents: "auto",
      };
    }
    return {
      z: 10,
      opacity: 0.98,
      filter: "saturate(0.95) contrast(0.95) brightness(0.95)",
      transform:
        "translate3d(320px, 55px, -80px) scale(0.86) rotateY(-28deg) rotateZ(1deg)",
      pointerEvents: "auto",
    };
  };

  return (
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
            Asesoría técnica, disponibilidad y respaldo de marcas globales, con un equipo que responde
            cuando el proyecto lo exige.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          <div ref={phonesSectionRef} className="relative mt-6 sm:mt-7">
            {/* Flechas desktop */}
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

            {/* Flechas móvil */}
            <div className="md:hidden pointer-events-none">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-[999] pointer-events-auto">
                <button
                  type="button"
                  onClick={goPrevPhoneVideo}
                  disabled={isRotating}
                  aria-label="Anterior"
                  className="w-10 h-10 flex items-center justify-center bg-transparent border-0 shadow-none rounded-none text-[#1c355e] active:scale-95 transition drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[999] pointer-events-auto">
                <button
                  type="button"
                  onClick={goNextPhoneVideo}
                  disabled={isRotating}
                  aria-label="Siguiente"
                  className="w-10 h-10 flex items-center justify-center bg-transparent border-0 shadow-none rounded-none text-[#1c355e] active:scale-95 transition drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              suppressHydrationWarning
              className={[
                "eq-phones-stage relative mx-auto",
                "h-[520px] sm:h-[610px] md:h-[660px] lg:h-[720px]",
                rotateDir === "next" ? "eq-rotate-next" : "",
                rotateDir === "prev" ? "eq-rotate-prev" : "",
              ].join(" ")}
            >
              {!mounted ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[295px] sm:w-[340px] h-[560px] sm:h-[620px] rounded-[3.2rem] bg-gray-100 ring-1 ring-black/10 shadow-xl" />
                </div>
              ) : (
                PHONE_VIDEOS.map((vid) => {
                  const posIndex = phoneOrder.indexOf(vid.id);
                  const pose = getPhonePose(posIndex);
                  const isCenter = posIndex === 1;
                  const isLeft = posIndex === 0;
                  const isRight = posIndex === 2;

                  const bezel = isCenter ? "p-[12px]" : "p-[8px]";
                  const radiusOuter = "rounded-[3.2rem]";
                  const radiusInner = isCenter ? "rounded-[2.5rem]" : "rounded-[2.35rem]";

                  const videoRef =
                    vid.id === "clip" ? centerVideoRef : vid.id === "v1" ? v1Ref : v2Ref;

                  const clickable = !isRotating && (isLeft || isRight);

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
                      <div
                        role={clickable ? "button" : undefined}
                        tabIndex={clickable ? 0 : -1}
                        onClick={() => {
                          if (!clickable) return;
                          if (isLeft) handleClickLeft();
                          if (isRight) handleClickRight();
                        }}
                        onKeyDown={(e) => {
                          if (!clickable) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (isLeft) handleClickLeft();
                            if (isRight) handleClickRight();
                          }
                        }}
                        className={[
                          "relative block eq-phone-shell",
                          "w-[260px] h-[450px] lg:w-[285px] lg:h-[505px]",
                          isCenter ? "w-[295px] sm:w-[340px] h-[560px] sm:h-[620px]" : "",
                          radiusOuter,
                          bezel,
                          "overflow-visible",
                          "bg-transparent",
                          "ring-1 ring-black/10",
                          isCenter ? "shadow-2xl" : "shadow-xl",
                          isCenter ? "" : "hover:scale-[1.02]",
                          clickable ? "cursor-pointer" : "cursor-default",
                          isRotating ? "pointer-events-none" : "",
                        ].join(" ")}
                        aria-label={isCenter ? "Historia actual" : "Llevar historia al centro"}
                      >
                        <div className={["relative w-full h-full overflow-hidden eq-phone-glass", radiusInner].join(" ")}>
                          {isCenter && (
                            <button
                              type="button"
                              className="md:hidden absolute inset-0 z-20 bg-transparent"
                              aria-label="Pausar o reproducir"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCenterPlay();
                              }}
                            />
                          )}

                          {isCenter && (
                            <button
                              type="button"
                              className="md:hidden absolute right-3 top-3 z-30 h-10 w-10 rounded-full bg-black/35 hover:bg-black/45 active:scale-95 transition flex items-center justify-center"
                              aria-label={isCenterMuted ? "Activar sonido" : "Silenciar"}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCenterMute();
                              }}
                            >
                              {isCenterMuted ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                  <path d="M23 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M17 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                  <path d="M15.5 8.5a4 4 0 010 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M18 6a7 7 0 010 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              )}
                            </button>
                          )}

                          {isCenter && centerOverlay && (
                            <div className="md:hidden absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                              <div className="eq-center-overlay rounded-full bg-black/35 w-20 h-20 flex items-center justify-center">
                                {centerOverlay === "pause" ? (
                                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 5v14" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                                    <path d="M17 5v14" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                                  </svg>
                                ) : centerOverlay === "play" ? (
                                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5v14l11-7L8 5z" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
                                  </svg>
                                ) : centerOverlay === "mute" ? (
                                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                    <path d="M23 9l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M17 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                ) : (
                                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                    <path d="M15.5 8.5a4 4 0 010 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M18 6a7 7 0 010 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          )}

                          <video
                            ref={videoRef}
                            key={`${vid.id}-${centerId}-${rotationTick}`}
                            className="w-full h-full object-cover"
                            muted={true}
                            loop
                            playsInline
                            preload="auto"
                            controls={false}
                            autoPlay={mounted && phonesInView}
                          >
                            <source src={(isCenter ? centerVideo?.src : vid.src) || vid.src} type="video/mp4" />
                          </video>

                          <div className={["pointer-events-none absolute inset-0", radiusInner, "ring-1 ring-white/10"].join(" ")} />
                        </div>

                        <div className={["pointer-events-none absolute inset-0", radiusOuter, "ring-1 ring-white/10"].join(" ")} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <br />
              <p className="text-[11px] text-black-400 font-bold uppercase tracking-widest">
                Conócenos en 30 segundos
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
  );
}