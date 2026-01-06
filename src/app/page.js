"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Shield, Users } from "lucide-react";

export default function Home() {
  // =========================
  // STATE
  // =========================
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [aliadosCarouselIndex, setAliadosCarouselIndex] = useState(0);

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
        mobile: "/assets/Sliderhome/mobile/ProcablesM.png",
        tablet: "/assets/Sliderhome/tablet/ProcablesT.png",
        desktop: "/assets/Sliderhome/desktop/ProcablesPC.png",
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
        mobile: "/assets/Sliderhome/mobile/legrandM.png",
        tablet: "/assets/Sliderhome/tablet/legrandT.png",
        desktop: "/assets/Sliderhome/desktop/legrandPC.png",
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
        mobile: "/assets/Sliderhome/mobile/SchneiderM.png",
        tablet: "/assets/Sliderhome/tablet/SchneiderT.png",
        desktop: "/assets/Sliderhome/desktop/SchneiderPC.png",
      },
      color: "from-green-700 to-green-500",
      exampleProducts:
        "Automatización, Distribución Eléctrica, Eficiencia Energética",
    },
  ];

  // ✅ Explora por marcas (logos transparentes en /assets/aliados)
  const quickCategories = [
    {
      title: "Gonvarri",
      icon: "/assets/aliados/AllieGonvarri.png",
      href: "/categoria/telecomunicaciones",
    },
    {
      title: "Centelsa",
      icon: "/assets/aliados/AllieCentelsa.png",
      href: "/categoria/iluminacion",
    },
    {
      title: "3M",
      icon: "/assets/aliados/Allie3M.png",
      href: "/categoria/cableado",
    },
    {
      title: "Teldor",
      icon: "/assets/aliados/AllieTeldor.png",
      href: "/categoria/sistemas-portacables",
    },
    {
      title: "Panduit",
      icon: "/assets/aliados/AlliePanduit.png",
      href: "/categoria/automatizacion-y-control",
    },
    {
      title: "Philips",
      icon: "/assets/aliados/AlliePhilips.png",
      href: "/categoria/areas-clasificadas",
    },
    {
      title: "Sylvania",
      icon: "/assets/aliados/AllieSylvania.png",
      href: "/categoria/mineria",
    },
  ];

  // ✅ agrupa quickCategories de 2 en 2 para el carrusel móvil (memo para no recalcular)
  const quickPairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < quickCategories.length; i += 2) {
      pairs.push(quickCategories.slice(i, i + 2));
    }
    return pairs;
  }, [quickCategories]);

  // ✅ Aliados (si no tienes el logo de una marca, deja src: null y cae a texto)
  const allies = [
    { name: "Schneider", src: "/assets/aliados/Schneider.png" },
    { name: "Panduit", src: "/assets/aliados/Panduit.png" },
    { name: "Mecano", src: null },
    { name: "Dexson", src: null },
    { name: "Legrand", src: "/assets/aliados/Legrand.png" },
    { name: "Dixpro", src: null },
    { name: "3M", src: "/assets/aliados/3M.png" },
    { name: "Leviton", src: null },
    { name: "Philips", src: "/assets/aliados/Philips.png" },
    { name: "VCP electric", src: null },
    { name: "Centelsa", src: "/assets/aliados/Centelsa.png" },
    { name: "VCP ecolighting", src: null },
    { name: "Procables", src: null },
    { name: "Sylvania", src: "/assets/aliados/Sylvania.png" },
    { name: "Crouse Hinds", src: null },
    { name: "Metal coraza", src: null },
    { name: "Weg", src: null },
    { name: "Plastimec", src: null },
    { name: "Colmena", src: null },
    { name: "Tercol", src: null },
    { name: "Teldor", src: "/assets/aliados/Teldor.png" },
    { name: "Rebra", src: null },
    { name: "Electro Porcelana GAMMA", src: null },
  ];

  const stats = [
    { number: "39+", label: "Años de Experiencia" },
    { number: "800+", label: "Clientes Satisfechos" },
    { number: "50+", label: "Expertos Técnicos" },
    { number: "99%", label: "Tasa de Satisfacción" },
  ];

  // =========================
  // HELPERS
  // =========================
  const getHeroImage = (b) => {
    // breakpoints: <640 mobile, 640-1023 tablet, >=1024 desktop
    if (width < 640) return b.images.mobile;
    if (width < 1024) return b.images.tablet;
    return b.images.desktop;
  };

  // =========================
  // RESPONSIVE COUNTS
  // =========================
  const visibleAllies = width >= 1024 ? 6 : width >= 768 ? 4 : 2;

  // =========================
  // ACTIONS
  // =========================
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % brands.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

  const nextAliadosSlide = () => {
    const maxIndex = Math.max(0, allies.length - visibleAllies);
    setAliadosCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const prevAliadosSlide = () =>
    setAliadosCarouselIndex((prev) => Math.max(0, prev - 1));

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
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

        /* ✅ Chips PRO para logos transparentes (sin negro) */
        .partnerChip {
          background: #f6f7fb;
          border: 1px solid #e6eaf2;
          border-radius: 9999px;
          box-shadow: 0 10px 26px rgba(16, 24, 40, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .partnerChip:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(16, 24, 40, 0.12);
        }
        .partnerLogo {
          filter: drop-shadow(0 6px 14px rgba(16, 24, 40, 0.12));
          opacity: 0.95;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .partnerChip:hover .partnerLogo {
          opacity: 1;
          transform: scale(1.02);
        }

        /* ✅ Logos “sin fondo” + destello (bloque mejores marcas) */
        .brandLogoCard {
          position: absolute;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: transparent;
          overflow: visible;
        }
        .brandLogoGlow {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 72%;
          height: 28px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.58),
            rgba(255, 255, 255, 0) 70%
          );
          filter: blur(10px);
          opacity: 0.65;
          pointer-events: none;
        }
        .brandLogoImg {
          filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));
        }
        @media (max-width: 1023px) {
          .brandLogoGlow {
            bottom: 10px;
            width: 85%;
            height: 18px;
            opacity: 0.55;
            filter: blur(9px);
          }
        }
      `}</style>

      {/* ✅ HERO (RESPONSIVE IMAGES) */}
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
              <img
                src={getHeroImage(b)}
                alt={b.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            style={{ borderRadius: 0 }}
            aria-label="Anterior"
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
                style={{ borderRadius: 0 }}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ EXPLORA POR MARCAS (CÍRCULOS - MOBILE CARRUSEL DE 2 EN 2) */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* ✅ TÍTULO CENTRADO */}
          <div className="mb-6 text-center">
            <h3 className="text-xl sm:text-xl font-semibold text-equielect-blue">
              EXPLORA POR MARCAS
            </h3>

            <Link
              href="/marcas"
              className="inline-block mt-2 text-sm font-medium text-equielect-blue hover:underline"
            >
              Ver todas
            </Link>
          </div>

          {/* ✅ MOBILE: carrusel por páginas (2 logos por slide) */}
          <div className="sm:hidden overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-px-4">
            <div className="flex gap-4 px-4">
              {quickPairs.map((pair, pageIndex) => (
                <div
                  key={pageIndex}
                  className="snap-start flex-shrink-0 w-[calc(100vw-2rem)]"
                >
                  <div className="grid grid-cols-2 gap-10 justify-items-center">
                    {pair.map((c) => (
                      <Link
                        key={c.title}
                        href={c.href || "/"}
                        className="group flex flex-col items-center"
                        aria-label={`Ir a ${c.title}`}
                      >
                        {/* ✅ CÍRCULO */}
                        <div className="relative w-[96px] h-[96px] rounded-full border border-gray-200 bg-white shadow-sm grid place-items-center transition-all duration-200 active:scale-[0.98]">
                          <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            style={{
                              background:
                                "radial-gradient(circle at 50% 70%, rgba(255,205,0,.20), rgba(255,205,0,0) 60%)",
                            }}
                          />
                          <div className="relative w-[72%] h-[72%]">
                            <Image
                              src={c.icon}
                              alt={c.title}
                              fill
                              className="object-contain partnerLogo"
                              sizes="96px"
                            />
                          </div>
                        </div>

                        <p className="mt-3 text-center text-[13px] font-medium text-gray-900 group-hover:text-equielect-blue">
                          {c.title}
                        </p>

                        <span className="block mt-2 h-[2px] w-0 opacity-0 bg-equielect-yellow transition-all duration-200 group-hover:w-10 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ TABLET/PC: centrado, sin carrusel, envuelve bonito */}
          <div className="hidden sm:flex sm:flex-wrap sm:justify-center sm:gap-10">
            {quickCategories.map((c) => (
              <Link
                key={c.title}
                href={c.href || "/"}
                className="group flex flex-col items-center"
                aria-label={`Ir a ${c.title}`}
              >
                <div className="relative w-[108px] h-[108px] rounded-full border border-gray-200 bg-white shadow-sm grid place-items-center transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 70%, rgba(255,205,0,.20), rgba(255,205,0,0) 60%)",
                    }}
                  />
                  <div className="relative w-[72%] h-[72%]">
                    <Image
                      src={c.icon}
                      alt={c.title}
                      fill
                      className="object-contain partnerLogo"
                      sizes="108px"
                    />
                  </div>
                </div>

                <p className="mt-3 text-center text-sm font-medium text-gray-900 group-hover:text-equielect-blue">
                  {c.title}
                </p>

                <span className="block mt-2 h-[2px] w-0 opacity-0 bg-equielect-yellow transition-all duration-200 group-hover:w-10 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
       
       {/* ✅ PLANTILLA DE CELULAR + VIDEO */}
<section className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      {/* Texto */}
      <div className="text-center lg:text-left">
        <h3 className="text-2xl sm:text-3xl font-semibold text-equielect-blue">
          Conoce Equielect en 1 minuto
        </h3>

        <p className="mt-3 text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
          Queremos que además de comprar, puedas entender quiénes somos, cómo te
          apoyamos y por qué trabajamos con marcas líderes.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <Link
            href="/nosotros"
            className="inline-flex items-center justify-center px-6 py-3 bg-equielect-blue text-white font-semibold hover:opacity-90 transition"
            style={{ borderRadius: 6 }}
          >
            Ver institucional
          </Link>

          <Link
            href="/productos"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition"
            style={{ borderRadius: 6 }}
          >
            Ir a productos
          </Link>
        </div>
      </div>

      {/* “Celular” */}
      <div className="flex justify-center">
        <div
          className="relative w-[260px] h-[520px] sm:w-[300px] sm:h-[600px] bg-[#0b1220] shadow-2xl overflow-hidden"
          style={{ borderRadius: 40 }}
        >
          {/* Borde externo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: 40,
              border: "1px solid rgba(255,255,255,.10)",
            }}
          />

          {/* Notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[22px] bg-black/55"
            style={{ borderRadius: 9999 }}
          />

          {/* Pantalla */}
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

          {/* Botón home (decorativo) */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/20"
            style={{ borderRadius: 9999 }}
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ✅ BLOQUE “MEJORES MARCAS” */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="relative overflow-hidden bg-equielect-blue"
            style={{ borderRadius: 5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-8 sm:p-12">
              {/* Texto izquierda */}
              <div>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05]">
                  Nuestras mejores marcas.
                </h2>

                <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl font-medium">
                  Explora productos originales con respaldo, garantía y
                  disponibilidad inmediata.
                </p>

                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center mt-7 bg-white text-black font-semibold px-7 py-3 hover:opacity-90 transition"
                  style={{ borderRadius: 5 }}
                >
                  Ir a productos
                </Link>
              </div>

              {/* Logos derecha */}
              <div className="w-full">
                {/* MOBILE */}
                <div className="lg:hidden mt-10 flex flex-wrap items-center justify-center gap-6">
                  {[
                    {
                      src: "/assets/Sliderhome/ScheneiderBG.png",
                      alt: "Schneider",
                    },
                    {
                      src: "/assets/Sliderhome/LegrandBG.png",
                      alt: "Legrand",
                    },
                    {
                      src: "/assets/Sliderhome/ProcablesBG.png",
                      alt: "Procables",
                    },
                  ].map((item) => (
                    <div key={item.src} className="relative w-[150px] h-[80px]">
                      <div className="brandLogoGlow" />
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain brandLogoImg"
                        sizes="150px"
                      />
                    </div>
                  ))}
                </div>

                {/* DESKTOP */}
                <div className="hidden lg:block relative h-[260px]">
                  <div className="brandLogoCard right-0 top-0 w-[200px] h-[200px] z-[3]">
                    <div className="brandLogoGlow" />
                    <div className="relative w-[160px] h-[90px]">
                      <Image
                        src="/assets/Sliderhome/ScheneiderBG.png"
                        alt="Schneider"
                        fill
                        className="object-contain brandLogoImg"
                        sizes="180px"
                      />
                    </div>
                  </div>

                  <div className="brandLogoCard right-[140px] top-[35px] w-[200px] h-[200px] z-[2]">
                    <div className="brandLogoGlow" />
                    <div className="relative w-[160px] h-[90px]">
                      <Image
                        src="/assets/Sliderhome/LegrandBG.png"
                        alt="Legrand"
                        fill
                        className="object-contain brandLogoImg"
                        sizes="180px"
                      />
                    </div>
                  </div>

                  <div className="brandLogoCard right-[280px] top-[75px] w-[200px] h-[200px] z-[1]">
                    <div className="brandLogoGlow" />
                    <div className="relative w-[160px] h-[90px]">
                      <Image
                        src="/assets/Sliderhome/ProcablesBG.png"
                        alt="Procables"
                        fill
                        className="object-contain brandLogoImg"
                        sizes="180px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* /logos */}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ ALIADOS */}
      <section className="bg-white py-12 sm:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-equielect-blue">
              Conoce todas nuestras marcas
            </h2>

            <button
              className="bg-gray-800 hover:bg-black text-white px-6 py-2.5 font-medium transition-all hover:scale-105 text-sm"
              style={{ borderRadius: 0 }}
            >
              Ver todas
            </button>
          </div>

          <div className="relative">
            <button
              onClick={prevAliadosSlide}
              disabled={aliadosCarouselIndex === 0}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-gray-800 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-10 h-10 items-center justify-center shadow-lg z-10 transition-all hover:scale-110"
              style={{ borderRadius: 0 }}
              aria-label="Marcas anteriores"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex gap-4 sm:gap-8 items-center py-8 px-2 sm:px-12 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    aliadosCarouselIndex * (100 / visibleAllies)
                  }%)`,
                }}
              >
                {allies.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/2 sm:w-1/4 lg:w-1/6 px-1"
                    style={{ minWidth: "140px" }}
                  >
                    <div className="partnerChip h-[82px] flex items-center justify-center px-4">
                      {item.src ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.src}
                            alt={item.name}
                            fill
                            className="object-contain partnerLogo"
                            sizes="180px"
                          />
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-medium text-equielect-gray text-center px-2">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextAliadosSlide}
              disabled={aliadosCarouselIndex >= allies.length - visibleAllies}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-gray-800 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-10 h-10 items-center justify-center shadow-lg z-10 transition-all hover:scale-110"
              style={{ borderRadius: 0 }}
              aria-label="Siguientes marcas"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ✅ AYUDA */}
      <section className="py-16 sm:py-20 bg-gray-800 text-white" id="ayuda">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 sm:mb-16 px-4 text-white">
          ¿Por Qué Elegirnos?
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6">
          {[
            {
              icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12" />,
              title: "Tecnología de Punta",
              description:
                "Tecnología que transforma la industria para que sea siempre productiva y sostenible.",
            },
            {
              icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12" />,
              title: "Calidad Garantizada",
              description:
                "Productos de alta funcionalidad, calidad y respaldo de marcas líderes del mercado.",
            },
            {
              icon: <Users className="w-10 h-10 sm:w-12 sm:h-12" />,
              title: "Equipo Experto",
              description:
                "Más de 50 profesionales especializados listos para asesorarte en cada proyecto.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 sm:p-8 shadow-xl transition-all cursor-pointer hover:scale-105"
              style={{ borderRadius: 0 }}
            >
              <div className="text-equielect-yellow mb-4">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ STATS */}
      <div className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform"
              >
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-equielect-yellow mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
