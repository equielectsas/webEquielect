"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import LoginModal from "@/components/auth/LoginModal";
// ✅ IMPORT DE PRODUCTOS DESTACADOS
import FeaturedBrandProducts from "@/components/home/FeaturedBrandsProducts.jsx";
import StatsBand from "@/components/home/StatsBand";
import Allies360Carousel from "@/components/home/Allies360Carousel";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  // =========================
  // STATE
  // =========================
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ helper para retina (2x). Si no tienes 2x, usa 1x como fallback (NO rompe).
  const makeSrcSet = (x1, x2) => `${x1} 1x, ${x2 || x1} 2x`;

  function LogoItem({ src, alt }) {
    return (
      <div className="relative w-[150px] h-[56px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="150px"
        />
      </div>
    );
  }

  // =========================
  // DATA
  // =========================
  const brands = [
    {
      name: "3M",
      logoPath: "/assets/aliados/4-3m.png",
      title: "Innovación en Adhesivos y Seguridad",
      description:
        "Productos innovadores en seguridad, electrónica y soluciones industriales.",
      images: {
        mobile: "/assets/Sliderhome/mobile/bannerproc_c.png",
        mobile2x: "/assets/Sliderhome/mobile/bannerproc_m.png",
        tablet: "/assets/Sliderhome/tablet/bannerproc_t.png",
        tablet2x: "/assets/Sliderhome/tablet/ProcablesT.png",
        desktop: "/assets/Sliderhome/desktop/bannerproc_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannerproc_mac.png",
      },
      color: "from-blue-700 to-blue-500",
      exampleProducts: "Seguridad Industrial, Adhesivos, Soluciones Eléctricas",
    },
    {
      name: "LEGRAND",
      logoPath: "/assets/Sliderhome/Legrandlog.jpg",
      title: "Innovación en Instalaciones",
      description:
        "Productos eléctricos y digitales para edificaciones residenciales y comerciales",
      images: {
        mobile: "/assets/Sliderhome/mobile/banner_leg_m.png",
        mobile2x: "/assets/Sliderhome/mobile/banner_leg_m.png",
        tablet: "/assets/Sliderhome/tablet/legrandT.png",
        tablet2x: "/assets/Sliderhome/tablet/legrandT.png",
        desktop: "/assets/Sliderhome/desktop/bannerleg_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannerleg_mac.png",
      },
      color: "from-red-700 to-red-500",
      exampleProducts: "Tomas, Interruptores, Sistemas de Gestión de Cables",
    },
    {
      name: "SCHNEIDER",
      logoPath: "/assets/Sliderhome/schneiderlogo.png",
      title: "Gestión Energética Eficiente",
      description:
        "Automatización y gestión de energía para un mundo más sostenible",
      images: {
        mobile: "/assets/Sliderhome/mobile/bannersch_movil.png",
        mobile2x: "/assets/Sliderhome/mobile/bannersch_movil.png",
        tablet: "/assets/Sliderhome/tablet/bannersch_tablet.png",
        tablet2x: "/assets/Sliderhome/tablet/bannersch_tablet.png",
        desktop: "/assets/Sliderhome/desktop/bannersch_pc.png",
        desktop2x: "/assets/Sliderhome/desktop/bannersch_mac.png",
      },
      color: "from-green-700 to-green-500",
      exampleProducts:
        "Automatización, Distribución Eléctrica, Eficiencia Energética",
    },
  ];

  // ✅ Marcas Aliadas (360)
  const quickCategories = [
    {
      title: "Schneider",
      icon: "/assets/aliados/SchneiderBG.png",
      href: "/marca/schneider",
    },
    {
      title: "Legrand",
      icon: "/assets/aliados/legrandBG.png",
      href: "/marca/legrand",
    },
    {
      title: "Procables",
      icon: "/assets/aliados/AllieProCables.png",
      href: "/marca/procables",
    },
    {
      title: "Gonvarri",
      icon: "/assets/aliados/AllieGonvarri.png",
      href: "/marca/gonvarri",
    },
    {
      title: "Centelsa",
      icon: "/assets/aliados/AllieCentelsa.png",
      href: "/marca/centelsa",
    },
    // ✅ importante: slug en minúscula
    { title: "3M", icon: "/assets/aliados/Allie3M.png", href: "/marca/3M" },
    {
      title: "Telemecanique",
      icon: "/assets/aliados/AllieTelemecanica.png",
      href: "/marca/telemecanique",
    },
    {
      title: "Panduit",
      icon: "/assets/aliados/AlliePanduit.png",
      href: "/marca/panduit",
    },
    {
      title: "Phoenix Contact",
      icon: "/assets/aliados/AlliePhoenix.png",
      href: "/marca/phoenix-contact",
    },
    { title: "Sylvania", icon: "/assets/aliados/AllieSylvania.png", href: "/marca/sylvania" },
  ];

  // ✅ Otras marcas aliadas (360)
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
  ];

  // =========================
  // ACTIONS
  // =========================
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

  // =========================
  // EFFECTS
  // =========================
  useEffect(() => {
    const done = () => setIsLoading(false);

    if (document.readyState === "complete") {
      done();
      return;
    }

    window.addEventListener("load", done);
    const safety = setTimeout(done, 6000);

    return () => {
      window.removeEventListener("load", done);
      clearTimeout(safety);
    };
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
    }, 3000);
    return () => clearInterval(timer);
  }, [brands.length, isHeroPaused]);

  // =========================
  // RENDER
  // =========================
  return (
    <div className="relative">
      {/* ✅ LOADER FULLSCREEN */}
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
            <span className="text-equielect-blue font-medium text-sm">
              Cargando...
            </span>
          </div>
        </div>
      )}

      {/* ✅ CSS GLOBAL */}
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
        .border-equielect-yellow {
          border-color: var(--color-equielect-yellow);
        }
        .border-equielect-blue {
          border-color: var(--color-equielect-blue);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .partnerLogo {
          filter: drop-shadow(0 6px 14px rgba(16, 24, 40, 0.12));
          opacity: 0.95;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .brandLogoImg {
          filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));
        }
      `}</style>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* ✅ HERO */}
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
                  className="w-full h-full object-cover object-top block"
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>

              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            style={{ borderRadius: 0 }}
            aria-label="Anterior"
            type="button"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            style={{ borderRadius: 0 }}
            aria-label="Siguiente"
            type="button"
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

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {brands.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 w-2.5 transition-all ${
                  currentSlide === i
                    ? "bg-white w-6"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                style={{ borderRadius: 50 }}
                aria-label={`Ir al slide ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ MARCAS ALIADAS (360 + FLECHAS) */}
      <Reveal delay={80}>
        <section className="bg-white border-b border-gray-200">
          <Allies360Carousel
            title="Marcas Aliadas"
            items={quickCategories.map((c) => ({
              name: c.title,
              icon: c.icon,
              href: c.href,
            }))}
            speedSeconds={26}
            stepPx={320}
            pauseOnHover={true}
          />
        </section>
      </Reveal>

      {/* ✅ BLOQUE “MEJORES MARCAS” */}
      <Reveal delay={120}>
        <section className="bg-white py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-equielect-blue overflow-hidden" style={{ borderRadius: 5 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
                <div>
                  <p className="text-white/80 text-sm font-semibold">
                    Nuestras mejores marcas.
                  </p>

                  <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    Compra con respaldo y disponibilidad inmediata.
                  </h2>

                  <p className="mt-3 text-white/75 text-sm sm:text-base max-w-xl font-medium">
                    Productos originales, garantía y asesoría para tu proyecto.
                  </p>

                  <Link
                    href="/productos"
                    className="inline-flex items-center justify-center mt-5 sm:mt-6 bg-white text-black font-semibold px-6 py-3 hover:opacity-90 transition"
                    style={{ borderRadius: 5 }}
                  >
                    Ir a productos
                  </Link>
                </div>

                <div className="flex items-center justify-end">
                  <div
                    className="w-full lg:w-[520px] px-5 sm:px-6 py-5 sm:py-6"
                    style={{
                      borderRadius: 10,
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.98) 100%)",
                    }}
                  >
                    <div className="lg:hidden">
                      <div className="flex gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                        {[
                          { src: "/assets/Sliderhome/ProcablesBG.png", alt: "Procables" },
                          { src: "/assets/Sliderhome/LegrandBG.png", alt: "Legrand" },
                          { src: "/assets/Sliderhome/ScheneiderBG.png", alt: "Schneider" },
                        ].map((item) => (
                          <div
                            key={item.src}
                            className="snap-start flex-shrink-0 w-[210px] h-[58px] relative"
                          >
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              className="object-contain"
                              sizes="210px"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 text-xs text-[#1c355e]/70 font-medium">
                        Marcas líderes • Soporte • Garantía
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <div className="flex items-center justify-between gap-6">
                        <LogoItem
                          src="/assets/Sliderhome/ProcablesBG.png"
                          alt="Procables"
                        />
                        <LogoItem
                          src="/assets/Sliderhome/LegrandBG.png"
                          alt="Legrand"
                        />
                        <span className="text-[#1c355e]/35 font-bold">|</span>
                        <LogoItem
                          src="/assets/Sliderhome/ScheneiderBG.png"
                          alt="Schneider"
                        />
                        <span className="text-[#1c355e]/35 font-bold">|</span>
                      </div>

                      <div className="mt-4 text-xs text-[#1c355e]/65 font-medium text-center">
                        Marcas líderes • Soporte • Garantía
                      </div>
                    </div>
                  </div>
                </div>
                {/* /logos */}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ✅ PRODUCTOS DESTACADOS */}
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
          </div>
        </section>
      </Reveal>
      {/* ✅ PLANTILLA DE CELULAR + VIDEO (SIN FONDO IMAGEN / BLANCA) */}
      <Reveal delay={120}>
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* IZQUIERDA: TEXTO (MÁS LIBRE) */}
                <div className="text-center lg:text-left">
                  <div className="max-w-[560px] mx-auto lg:mx-0">
                    <p className="text-equielect-blue/70 text-sm font-semibold">
                      Institucional
                    </p>

                    <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight text-equielect-blue">
                      Conoce Equielect en 1 minuto
                    </h3>

                    <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                      En Equielect te ayudamos a elegir bien para tu proyecto: asesoría,
                      disponibilidad y respaldo con marcas líderes.
                    </p>

                    <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                      Somos de Medellín (desde 1986) y atendemos industria, comercio y
                      construcción con soluciones eléctricas, electrónicas y de telecomunicaciones.
                    </p>

                    {/* “Sello” de marca (no parece IA) */}
                    <div className="mt-6 inline-flex items-center gap-3 border border-gray-200 bg-white px-4 py-3"
                        style={{ borderRadius: 12 }}>
                      <span className="inline-flex items-center justify-center w-9 h-9 bg-equielect-yellow text-black font-extrabold"
                            style={{ borderRadius: 10 }}>
                        ✓
                      </span>
                      <div className="text-left">
                        <p className="text-equielect-blue font-extrabold leading-none">
                          Asesoría real
                        </p>
                        <p className="text-gray-600 text-sm">
                          Te acompañamos antes y después de comprar.
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                      <Link
                        href="/nosotros"
                        className="h-[48px] inline-flex items-center justify-center px-6 bg-equielect-yellow text-black font-extrabold hover:opacity-90 transition"
                        style={{ borderRadius: 10 }}
                      >
                        Ver quiénes somos
                      </Link>

                      <Link
                        href="/productos"
                        className="h-[48px] inline-flex items-center justify-center px-6 border border-gray-200 bg-white text-equielect-blue font-extrabold hover:bg-gray-50 transition"
                        style={{ borderRadius: 10 }}
                      >
                        Ir a productos
                      </Link>
                    </div>
                  </div>
                </div>

              {/* CELULAR + VIDEO (SIN MARCO BLANCO) */}
              <div className="flex justify-center">
                <div>
                  <div
                    className="relative w-[260px] h-[520px] sm:w-[300px] sm:h-[600px] bg-[#0b1220] overflow-hidden shadow-2xl"
                    style={{ borderRadius: 40 }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderRadius: 40,
                        border: "1px solid rgba(255,255,255,.10)",
                      }}
                    />

                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[22px] bg-black/55"
                      style={{ borderRadius: 9999 }}
                    />

                    <div
                      className="absolute inset-[10px] bg-black overflow-hidden"
                      style={{ borderRadius: 32 }}
                    >
                      <video
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                        poster="/assets/video/empresa-poster.jpg"
                      >
                        <source src="/assets/videos/video.mp4" type="video/mp4" />
                        Tu navegador no soporta video HTML5.
                      </video>
                    </div>

                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/20"
                      style={{ borderRadius: 9999 }}
                    />
                  </div>

                  {/* Si también quieres quitar este texto, bórralo */}
                  <p className="mt-3 text-xs text-gray-500 font-medium text-center">
                    Video institucional • 1 minuto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      {/* ✅ OTRAS MARCAS ALIADAS (360 + FLECHAS) */}
      <Reveal delay={120}>
        <StatsBand />
        <section className="bg-white py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl text-equielect-blue">
                <span className="font-semibold">Otras Marcas </span>
                <span className="font-extrabold" style={{ fontWeight: 900 }}>
                  Aliadas
                </span>
              </h2>

              <Link
                href="/aliados"
                className="bg-transparent text-equielect-blue font-bold text-sm hover:underline underline-offset-4"
              >
                Ver todas
              </Link>
            </div>
          </div>

          <Allies360Carousel
          title=""
          items={allies.map((a) => ({
            name: a.name,
            icon: a.src,
            href: a.href, // ✅ directo
          }))}
          speedSeconds={30}
          stepPx={320}
          pauseOnHover={true}
        />
        </section>

        {/* ✅ SECCIÓN CORPORATIVA FULL WIDTH */}
        <section className="w-full border-t border-gray-200">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[240px] lg:min-h-[320px]">
              <div className="relative min-h-[220px] lg:min-h-[320px] bg-gray-200">
                <Image
                  src="/assets/sucursal/corporacion.png"
                  alt="Equipo Equielect"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="relative bg-[#ffcd00] flex items-center">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 25% 20%, rgba(28,53,94,.9), rgba(28,53,94,0) 55%)",
                  }}
                />

                <div className="relative w-full px-6 sm:px-10 lg:px-14 py-8 lg:py-10">
                  <p className="text-white/90 text-sm sm:text-base font-semibold">
                    Servicios y{" "}
                    <span className="font-extrabold">Atención al Cliente</span>
                  </p>

                  <h3 className="mt-3 text-[#1c355e] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                    Oficina Virtual Equielect
                  </h3>

                  <p className="mt-3 text-[#1c355e]/90 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
                    Encuentra atención rápida y asesoría profesional para tus
                    compras y proyectos. Nuestro equipo está a un clic de
                    distancia.
                  </p>

                  <div className="mt-6">
                    <a
                      href="https://wa.me/573001112233?text=Hola%2C%20quiero%20cotizar%20con%20un%20asesor%20de%20Equielect."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#1c355e] font-extrabold text-sm sm:text-base hover:opacity-90 transition"
                      style={{ borderRadius: 2 }}
                    >
                      Solicitar cotización
                    </a>
                  </div>

                  <p className="mt-5 text-[12px] sm:text-sm text-[#1c355e]/80 font-medium">
                    Horario: Lun–Vie 8:00–5:30 | Sáb 8:00–12:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
