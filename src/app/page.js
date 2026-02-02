"use client";

import React, { useEffect, useState, useRef } from "react";
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

  // ✅ Video del celular (manteniendo tus nombres)
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  // ✅ Selector (cuadritos)
  const PHONE_VIDEOS = [
    {
      id: "v1",
      title: "Video 1",
      src: "/assets/videos/1.mp4",
      poster: "/assets/videos/poster1.jpg", // opcional
    },
    {
      id: "v2",
      title: "Video 2",
      src: "/assets/videos/2.mp4",
      poster: "/assets/videos/poster2.jpg", // opcional
    },
  ];

  const DEFAULT_PHONE_VIDEO_ID = "v1";
  const [activePhoneVideoId, setActivePhoneVideoId] = useState(DEFAULT_PHONE_VIDEO_ID);

  const activePhoneVideo =
    PHONE_VIDEOS.find((v) => v.id === activePhoneVideoId) || PHONE_VIDEOS[0];

  // HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // ACTIONS
  // =========================
  const handleStartVideo = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setVideoStarted(true);
    } catch {
      setVideoStarted(true);
    }
  };

  // ✅ click en cuadrito: cambia video del celular y reproduce
  const handleSelectPhoneVideo = async (id) => {
    setActivePhoneVideoId(id);
    setVideoStarted(true);

    requestAnimationFrame(async () => {
      const el = videoRef.current;
      if (!el) return;

      try {
        el.pause();
        el.currentTime = 0;
        el.load();
        await el.play();
      } catch {
        // si se bloquea autoplay, quedarán los controls
      }
    });
  };

  // ✅ al terminar: vuelve a portada negra + EQ
  const handleVideoEnded = () => {
    const el = videoRef.current;

    // vuelve a portada
    setVideoStarted(false);

    // opcional: volver al predeterminado (v1)
    setActivePhoneVideoId(DEFAULT_PHONE_VIDEO_ID);

    if (el) {
      try {
        el.pause();
        el.currentTime = 0;
        el.load();
      } catch {}
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

  // Helper para retina (2x)
  const makeSrcSet = (x1, x2) => `${x1} 1x, ${x2 || x1} 2x`;

  // =========================
  // DATA
  // =========================
  const brands = [
    {
      name: "3M",
      logoPath: "/assets/aliados/4-3m.png",
      title: "Innovación en Adhesivos y Seguridad",
      description: "Productos innovadores en seguridad, electrónica y soluciones industriales.",
      images: {
        mobile: "/assets/Sliderhome/mobile/bannerproc_c.png",
        mobile2x: "/assets/Sliderhome/mobile/bannerproc_m.png",
        tablet: "/assets/Sliderhome/tablet/bannerproc_t.png",
        tablet2x: "/assets/Sliderhome/tablet/ProcablesT.png",
        desktop: "/assets/Sliderhome/desktop/bannerproc_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannerproc_mac.png",
      },
    },
    {
      name: "LEGRAND",
      logoPath: "/assets/Sliderhome/Legrandlog.jpg",
      title: "Innovación en Instalaciones",
      description: "Productos eléctricos y digitales para edificaciones residenciales y comerciales",
      images: {
        mobile: "/assets/Sliderhome/mobile/banner_leg_m.png",
        mobile2x: "/assets/Sliderhome/mobile/banner_leg_m.png",
        tablet: "/assets/Sliderhome/tablet/legrandT.png",
        tablet2x: "/assets/Sliderhome/tablet/legrandT.png",
        desktop: "/assets/Sliderhome/desktop/bannerleg_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannerleg_mac.png",
      },
    },
    {
      name: "SCHNEIDER",
      logoPath: "/assets/Sliderhome/schneiderlogo.png",
      title: "Gestión Energética Eficiente",
      description: "Automatización y gestión de energía para un mundo más sostenible",
      images: {
        mobile: "/assets/Sliderhome/mobile/bannersch_movil.png",
        mobile2x: "/assets/Sliderhome/mobile/bannersch_movil.png",
        tablet: "/assets/Sliderhome/tablet/bannersch_tablet.png",
        tablet2x: "/assets/Sliderhome/tablet/bannersch_tablet.png",
        desktop: "/assets/Sliderhome/desktop/bannersch_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannersch_mac.png",
      },
    },
    {
      name: "EQUIELECT",
      logoPath: "/assets/Sliderhome/schneiderlogo.png",
      title: "Gestión Energética Eficiente",
      description: "Automatización y gestión de energía para un mundo más sostenible",
      images: {
        mobile: "/assets/Sliderhome/mobile/bannersch_movil.png",
        mobile2x: "/assets/Sliderhome/mobile/bannersch_movil.png",
        tablet: "/assets/Sliderhome/tablet/bannersch_tablet.png",
        tablet2x: "/assets/Sliderhome/tablet/bannersch_tablet.png",
        desktop: "/assets/Sliderhome/desktop/eqw.jpg",
        desktop2x: "/assets/Sliderhome/desktop/eqmac.jpg",
      },
    },
  ];

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
      {/* LOADER */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-200/70 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/assets/Logs/loader_points.gif"
              alt="Cargando..."
              width={220}
              height={220}
              priority
              unoptimized
            />
            <span className="text-equielect-blue font-medium text-sm">Cargando...</span>
          </div>
        </div>
      )}

      {/* CSS GLOBAL INTERNO */}
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
      `}</style>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* HERO SLIDER */}
      <section className="bg-transparent">
        <div
          className="relative w-full h-[220px] sm:h-[320px] lg:h-[420px] overflow-hidden"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
        >
          {brands.map((b, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                currentSlide === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <picture className="block w-full h-full">
                <source media="(min-width: 1024px)" srcSet={makeSrcSet(b.images.desktop, b.images.desktop2x)} />
                <source media="(min-width: 640px)" srcSet={makeSrcSet(b.images.tablet, b.images.tablet2x)} />
                <img
                  src={b.images.mobile}
                  srcSet={makeSrcSet(b.images.mobile, b.images.mobile2x)}
                  alt={b.name}
                  className="w-full h-full object-cover object-top block"
                />
              </picture>
              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}

          {/* Botones Hero */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
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
              <h3 className="text-lg sm:text-xl font-extrabold text-equielect-blue">
                Productos destacados por marca
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Selección rápida para comprar con soporte y garantía.
              </p>
            </div>
            <div className="mt-5">
              <FeaturedBrandProducts />
            </div>
            <div className="flex justify-center mt-10">
              <Link
                href="/productos"
                className="px-8 py-3 bg-[#1c355e] text-white font-bold text-xs hover:bg-[#ffcd00] hover:text-[#1c355e] transition-colors"
                style={{ borderRadius: 2 }}
              >
                Ver productos
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECCIÓN INSTITUCIONAL CON VIDEO Y COLLAGE (NUEVO DISEÑO) */}
      <Reveal delay={120}>
        <section className="bg-white overflow-hidden py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* TÍTULO + TEXTO CENTRADOS */}
            <header className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl sm:text-6xl lg:text-6xl font-black text-[#1c355e] tracking-tight">
                Equielect
              </h2>

              <div className="mt-6 space-y-4">
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                  En Equielect te ayudamos a elegir bien para tu proyecto: asesoría,
                  disponibilidad y respaldo con marcas líderes.
                </p>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                  Somos de Medellín (desde 1986) y atendemos industria, comercio y construcción.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/quienes-somos"
                  className="px-8 py-3 bg-[#f2c219] text-black font-bold text-xs hover:bg-[#d9af16]"
                  style={{ borderRadius: 2 }}
                >
                  Ver quienes somos
                </Link>
              </div>
            </header>

            {/* ZONA VIDEO: IZQ - CELULAR - DER */}
            <div className="mt-14 flex items-center justify-center gap-8 lg:gap-12">
              {/* PREVIEW IZQUIERDA */}
              <button
                type="button"
                onClick={() => handleSelectPhoneVideo("v1")}
                className={`hidden md:block relative w-[150px] h-[270px] overflow-hidden shadow-2xl border-[3px] rounded-[32px] transition-transform ${
                  activePhoneVideoId === "v1"
                    ? "border-[#005cb9] ring-4 ring-[#005cb9]/20 scale-[1.03]"
                    : "border-white hover:scale-[1.03]"
                }`}
                aria-label="Reproducir video 1 en el celular"
              >
                <video
                  src={PHONE_VIDEOS[0].src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </button>

              {/* CELULAR CENTRAL */}
              <div className="flex flex-col items-center">
                <div className="relative w-[300px] sm:w-[340px] h-[610px] sm:h-[680px] bg-black border-[12px] border-[#1a1a1a] shadow-2xl rounded-[3.5rem]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-40" />

                  <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-black group">
                    {/* PORTADA */}
                    {!videoStarted && (
                      <div
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black cursor-pointer transition-opacity duration-500"
                        onClick={handleStartVideo}
                      >
                        <div className="relative w-32 h-32 transition-transform duration-300 group-hover:scale-110">
                          <Image
                            src="/assets/Logs/LogoEQmovil.jpg"
                            alt="Logo EQ"
                            fill
                            className="object-contain opacity-90"
                          />
                        </div>
                        <div className="mt-4 flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/5">
                          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                          <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                            Reproducir
                          </span>
                        </div>
                      </div>
                    )}

                    {/* VIDEO PRINCIPAL */}
                    <video
                      ref={videoRef}
                      key={activePhoneVideo.src}
                      className="w-full h-full object-cover"
                      controls={videoStarted}
                      playsInline
                      preload="metadata"
                      poster={activePhoneVideo.poster}
                      onPlay={() => setVideoStarted(true)}
                      onEnded={handleVideoEnded}
                    >
                      <source src={activePhoneVideo.src} type="video/mp4" />
                    </video>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                  Video institucional · 1 minuto
                </p>
              </div>

              {/* PREVIEW DERECHA */}
              <button
                type="button"
                onClick={() => handleSelectPhoneVideo("v2")}
                className={`hidden md:block relative w-[150px] h-[270px] overflow-hidden shadow-2xl border-[3px] rounded-[32px] transition-transform ${
                  activePhoneVideoId === "v2"
                    ? "border-[#005cb9] ring-4 ring-[#005cb9]/20 scale-[1.03]"
                    : "border-white hover:scale-[1.03]"
                }`}
                aria-label="Reproducir video 2 en el celular"
              >
                <video
                  src={PHONE_VIDEOS[1].src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </button>
            </div>

            {/* PREVIEWS EN MÓVIL (debajo) */}
            <div className="mt-10 md:hidden flex justify-center gap-4">
              <button
                type="button"
                onClick={() => handleSelectPhoneVideo("v1")}
                className={`relative w-[140px] h-[240px] overflow-hidden shadow-xl border-[3px] rounded-[28px] ${
                  activePhoneVideoId === "v1"
                    ? "border-[#005cb9] ring-4 ring-[#005cb9]/20"
                    : "border-white"
                }`}
              >
                <video
                  src={PHONE_VIDEOS[0].src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => handleSelectPhoneVideo("v2")}
                className={`relative w-[140px] h-[240px] overflow-hidden shadow-xl border-[3px] rounded-[28px] ${
                  activePhoneVideoId === "v2"
                    ? "border-[#005cb9] ring-4 ring-[#005cb9]/20"
                    : "border-white"
                }`}
              >
                <video
                  src={PHONE_VIDEOS[1].src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* OTRAS MARCAS & OFICINA VIRTUAL */}
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

        {/* SECCIÓN CORPORATIVA FINAL */}
        <section className="w-full border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px]">
            <div className="relative min-h-[220px] bg-gray-200">
              <Image src="/assets/sucursal/cotizacion.png" alt="Equipo" fill className="object-cover" />
            </div>

            <div className="relative bg-[#ffcd00] flex items-center px-6 lg:px-14 py-10">
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
