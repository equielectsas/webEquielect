"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import LoginModal from "@/components/auth/LoginModal";
// ✅ IMPORT DE PRODUCTOS DESTACADOS
import FeaturedBrandProducts from "@/components/home/FeaturedBrandsProducts.jsx";
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
        <Image src={src} alt={alt} fill className="object-contain" sizes="150px" />
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
    { title: "Schneider", icon: "/assets/aliados/SchneiderBG.png", href: "/marca/schneider" },
    { title: "Legrand", icon: "/assets/aliados/legrandBG.png", href: "/marca/legrand" },
    { title: "Procables", icon: "/assets/aliados/AllieProCables.png", href: "/marca/procables" },
    { title: "Gonvarri", icon: "/assets/aliados/AllieGonvarri.png", href: "/marca/gonvarri" },
    { title: "Centelsa", icon: "/assets/aliados/AllieCentelsa.png", href: "/marca/centelsa" },
    // ✅ importante: slug en minúscula
    { title: "3M", icon: "/assets/aliados/Allie3M.png", href: "/marca/3M" },
    { title: "Telemecanique", icon: "/assets/aliados/AllieTelemecanica.png", href: "/marca/telemecanique" },
    { title: "Panduit", icon: "/assets/aliados/AlliePanduit.png", href: "/marca/panduit" },
    { title: "Phoenix Contact", icon: "/assets/aliados/AlliePhoenix.png", href: "/marca/phoenix-contact" },
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
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

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
            <span className="text-equielect-blue font-medium text-sm">Cargando...</span>
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
                <source media="(min-width: 1024px)" srcSet={makeSrcSet(b.images.desktop, b.images.desktop2x)} />
                <source media="(min-width: 640px)" srcSet={makeSrcSet(b.images.tablet, b.images.tablet2x)} />
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
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {brands.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 w-2.5 transition-all ${
                  currentSlide === i ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
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
      <div className="flex justify-center mt-10">
      <Link
            href="/productos"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#f2c219] text-black font-bold text-xs  hover:bg-[#d9af16] transition-colors"
            style={{ borderRadius: 2 }}
          >
            Ver productos
          </Link>
      </div>

      <br/>

      {/* ✅ SECCIÓN INSTITUCIONAL - ORGANIZADA Y REFINADA */}
<Reveal delay={120}>
  <section className="bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-center">
        
        {/* IZQUIERDA: TEXTOS Y BOTÓN */}
        <div className="lg:col-span-5 text-left z-10">
          {/* Título: Se corrigió el valor xl para que sea masivo */}
          <h2 className="text-6xl sm:text-7xl lg:text-[50px] xl:text-[50px] font-black text-[#385b8f] tracking-tighter leading-[0.8] mb-10">
            Equielect
          </h2>

          <div className="space-y-6 mb-12">
            {/* Párrafos: Gris suave y peso normal para contraste */}
            <p className="text-gray-500 text-lg sm:text-xl font-normal leading-snug max-w-md">
              En Equielect te ayudamos a elegir bien para tu proyecto: asesoría, 
              disponibilidad y respaldo con marcas líderes.
            </p>
            <p className="text-gray-500 text-lg sm:text-xl font-normal leading-snug max-w-md">
              Somos de Medellín (desde 1986) y atendemos industria, comercio y 
              construcción con soluciones eléctricas, electrónicas y de 
              telecomunicaciones.
            </p>
          </div>
          
          <Link
            href="/quienes-somos"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#f2c219] text-black font-bold text-xs hover:bg-[#d9af16] transition-colors"
            style={{ borderRadius: 2 }}
          >
            Ver quienes somos
          </Link>
        </div>

        {/* DERECHA: IMÁGENES Y VIDEO (7 columnas) */}
        <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-7 items-center mt-16 lg:mt-0">
          
          {/* COLLAGE CENTRAL */}
          <div className="lg:col-span-3 hidden lg:flex justify-center relative h-[480px]">
            {/* Foto 1 - Superior Izquierda */}
            <div
              className="absolute left-0 top-0 w-[190px] h-[270px] overflow-hidden shadow-2xl z-20 border-[8px] border-white"
              style={{ borderRadius: 32 }}
            >
              <Image
                src="/assets/sucursal/corporativa1.jpg"
                alt="Equielect Staff"
                fill
                className="object-cover"
              />
            </div>

            {/* Foto 2 - Inferior Derecha (Desplazada para no tocar el video) */}
            <div
              className="absolute right-[-10px] bottom-8 w-[190px] h-[270px] overflow-hidden shadow-2xl z-30 border-[8px] border-white"
              style={{ borderRadius: 32 }}
            >
              <Image
                src="/assets/sucursal/corporativa2.jpg"
                alt="Instalación"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* CELULAR VIDEO */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
            <div
              className="relative w-[280px] h-[560px] bg-black border-[12px] border-[#1a1a1a] shadow-2xl rounded-[3.5rem]"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-40" />
              
              <div className="w-full h-full overflow-hidden rounded-[2.5rem]">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster="/assets/video/empresa-poster.jpg"
                >
                  <source src="/assets/videos/video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-gray-400 font-bold uppercase tracking-widest pr-4">
              Video institucional · 1 minuto
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</Reveal>


      {/* ✅ OTRAS MARCAS ALIADAS (360 + FLECHAS) */}
      <Reveal delay={120}>
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
                    Servicios y <span className="font-extrabold">Atención al Cliente</span>
                  </p>

                  <h3 className="mt-3 text-[#1c355e] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                    Oficina Virtual Equielect
                  </h3>

                  <p className="mt-3 text-[#1c355e]/90 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
                    Encuentra atención rápida y asesoría profesional para tus compras y proyectos.
                    Nuestro equipo está a un clic de distancia.
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
