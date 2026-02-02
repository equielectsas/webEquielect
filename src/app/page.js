"use client";

import React, { useEffect, useState, useRef } from "react"; // ✅ Se agregó useRef
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
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // ACTIONS
  // =========================
  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoStarted(true);
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
    return () => { document.body.style.overflow = ""; };
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
            <Image src="/assets/Logs/loader_points.gif" alt="Cargando..." width={220} height={220} priority unoptimized />
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
        .text-equielect-gray { color: var(--color-equielect-gray); }
        .text-equielect-blue { color: var(--color-equielect-blue); }
        .bg-equielect-yellow { background-color: var(--color-equielect-yellow); }
        .bg-equielect-blue { background-color: var(--color-equielect-blue); }
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
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === i ? "opacity-100" : "opacity-0"}`}>
              <picture className="block w-full h-full">
                <source media="(min-width: 1024px)" srcSet={makeSrcSet(b.images.desktop, b.images.desktop2x)} />
                <source media="(min-width: 640px)" srcSet={makeSrcSet(b.images.tablet, b.images.tablet2x)} />
                <img src={b.images.mobile} srcSet={makeSrcSet(b.images.mobile, b.images.mobile2x)} alt={b.name} className="w-full h-full object-cover object-top block" />
              </picture>
              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}

          {/* Botones Hero */}
          <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            <div className="mt-5"><FeaturedBrandProducts /></div>
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

      {/* SECCIÓN INSTITUCIONAL CON VIDEO Y COLLAGE */}
      <Reveal delay={120}>
        <section className="bg-white overflow-hidden py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-center">
              
              {/* IZQUIERDA: TEXTOS */}
              <div className="lg:col-span-5 text-left z-10">
                <h2 className="text-6xl sm:text-7xl lg:text-[50px] xl:text-[50px] font-black text-[#1c355e] tracking-tighter leading-[0.8] mb-10">
                  Equielect
                </h2>
                <div className="space-y-6 mb-12">
                  <p className="text-gray-500 text-lg sm:text-xl font-normal leading-snug max-w-md">
                    En Equielect te ayudamos a elegir bien para tu proyecto: asesoría, disponibilidad y respaldo con marcas líderes.
                  </p>
                  <p className="text-gray-500 text-lg sm:text-xl font-normal leading-snug max-w-md">
                    Somos de Medellín (desde 1986) y atendemos industria, comercio y construcción.
                  </p>
                </div>
                <Link href="/quienes-somos" className="px-8 py-3 bg-[#f2c219] text-black font-bold text-xs hover:bg-[#d9af16]" style={{ borderRadius: 2 }}>
                  Ver quienes somos
                </Link>
              </div>

              {/* DERECHA: COLLAGE + CELULAR */}
              <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-7 items-center mt-16 lg:mt-0">
                
                {/* Collage decorativo (Escritorio) */}
                <div className="lg:col-span-3 hidden lg:flex justify-center relative h-[480px]">
                  <div className="absolute left-0 top-0 w-[190px] h-[270px] overflow-hidden shadow-2xl z-20 border-[8px] border-white rounded-[32px]">
                    <Image src="/assets/sucursal/corporativa1.jpg" alt="Staff" fill className="object-cover" />
                  </div>
                  <div className="absolute right-[-10px] bottom-8 w-[190px] h-[270px] overflow-hidden shadow-2xl z-30 border-[8px] border-white rounded-[32px]">
                    <Image src="/assets/sucursal/corporativa2.jpg" alt="Instalación" fill className="object-cover" />
                  </div>
                </div>

                {/* CELULAR VIDEO */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
                  <div className="relative w-[280px] h-[560px] bg-black border-[12px] border-[#1a1a1a] shadow-2xl rounded-[3.5rem]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-40" />
                    
                    <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-black group">
                      {/* Portada con Logo */}
                      {!videoStarted && (
                        <div 
                          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black cursor-pointer transition-opacity duration-500"
                          onClick={handleStartVideo}
                        >
                          <div className="relative w-32 h-32 transition-transform duration-300 group-hover:scale-110">
                            <Image src="/assets/Logs/LogoEQmovil.jpg" alt="Logo EQ" fill className="object-contain opacity-90" />
                          </div>
                          <div className="mt-4 flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/5">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Reproducir</span>
                          </div>
                        </div>
                      )}

                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls={videoStarted}
                        playsInline
                        onPlay={() => setVideoStarted(true)}
                      >
                        <source src="/assets/videos/video.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <p className="mt-4 text-[11px] text-gray-400 font-bold uppercase tracking-widest pr-4">Video institucional · 1 minuto</p>
                </div>

              </div>
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
            <Link href="/aliados" className="text-equielect-blue font-bold text-sm hover:underline">Ver todas</Link>
          </div>
          <Allies360Carousel items={allies.map(a => ({ name: a.name, icon: a.src, href: a.href }))} speedSeconds={30} />
        </section>

        {/* SECCIÓN CORPORATIVA FINAL */}
        <section className="w-full border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px]">
            <div className="relative min-h-[220px] bg-gray-200">
              <Image src="/assets/sucursal/cotizacion.png" alt="Equipo" fill className="object-cover" />
            </div>
            <div className="relative bg-[#ffcd00] flex items-center px-6 lg:px-14 py-10">
              <div className="relative z-10">
                <p className="text-[#1c355e] text-sm font-semibold uppercase tracking-wider">Atención al Cliente</p>
                <h3 className="mt-2 text-[#1c355e] text-3xl lg:text-4xl font-extrabold">Oficina Virtual Equielect</h3>
                <p className="mt-4 text-[#1c355e]/90 max-w-md">Atención rápida y asesoría profesional a un clic de distancia.</p>
                <div className="mt-6">
                  <a href="https://api.whatsapp.com/send/?phone=573146453033" target="_blank" className="inline-block px-7 py-3 bg-white text-[#1c355e] font-extrabold" style={{ borderRadius: 2 }}>
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