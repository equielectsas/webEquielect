"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Shield, Users, ArrowRight } from "lucide-react";

export default function Home() {
  // ✅ HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // ✅ Responsive (sin window en render)
  const [width, setWidth] = useState(0);

    // ✅ LOADER
  const [isLoading, setIsLoading] = useState(true);


  // ✅ Carousels
  const [brandCarouselIndex, setBrandCarouselIndex] = useState(0);
  const [aliadosCarouselIndex, setAliadosCarouselIndex] = useState(0);

  const brands = [
    {
      name: "3M",
      logoPath: "/assets/aliados/4-3m.png",
      title: "Innovación en Adhesivos y Seguridad",
      description:
        "Productos innovadores en seguridad, electrónica y soluciones industriales.",
      image: "/assets/Sliderhome/3m.jpg",
      color: "from-blue-700 to-blue-500",
      exampleProducts: "Seguridad Industrial, Adhesivos, Soluciones Eléctricas",
    },
    {
      name: "LEGRAND",
      logoPath: "/assets/Sliderhome/Legrandlog.jpg",
      title: "Innovación en Instalaciones",
      description:
        "Productos eléctricos y digitales para edificaciones residenciales y comerciales",
      image: "/assets/Sliderhome/Legrandd.jpg",
      color: "from-red-700 to-red-500",
      exampleProducts: "Tomas, Interruptores, Sistemas de Gestión de Cables",
    },
    {
      name: "SCHNEIDER",
      logoPath: "/assets/Sliderhome/schneiderlogo.png",
      title: "Gestión Energética Eficiente",
      description:
        "Automatización y gestión de energía para un mundo más sostenible",
      image: "/assets/Sliderhome/sneiderjpg.jpg",
      color: "from-green-700 to-green-500",
      exampleProducts:
        "Automatización, Distribución Eléctrica, Eficiencia Energética",
    },
  ];

  const stats = [
    { number: "39+", label: "Años de Experiencia" },
    { number: "800+", label: "Clientes Satisfechos" },
    { number: "50+", label: "Expertos Técnicos" },
    { number: "99%", label: "Tasa de Satisfacción" },
  ];

  // ✅ Compra por categoría (cards)
  const categories = [
    { title: "Telecomunicaciones", image: "/assets/background/PRODUCTO.png" },
    { title: "Iluminación", image: "/assets/background/PRODUCTO.png" },
    { title: "Cableado", image: "/assets/background/PRODUCTO.png" },
    { title: "Sistemas portacables", image: "/assets/background/PRODUCTO.png" },
    { title: "Automatización y control", image: "/assets/background/PRODUCTO.png" },
    { title: "Áreas clasificadas", image: "/assets/background/PRODUCTO.png" },
    { title: "Minería", image: "/assets/background/PRODUCTO.png" },
  ];

  // ✅ Productos (demo)
  const products = [
    { id: "prod-1", brand: "PROD1", name: "Producto destacado PROD1", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 89000 },
    { id: "prod-2", brand: "PROD2", name: "Producto destacado PROD2", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 129000 },
    { id: "prod-3", brand: "PROD3", name: "Producto destacado PROD3", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 59000 },
    { id: "prod-4", brand: "PROD4", name: "Producto destacado PROD4", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 219900 },
    { id: "prod-5", brand: "PROD5", name: "Producto destacado PROD5", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 39900 },
    { id: "prod-6", brand: "PROD6", name: "Producto destacado PROD6", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 149900 },
    { id: "prod-7", brand: "PROD7", name: "Producto destacado PROD7", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 99000 },
    { id: "prod-8", brand: "PROD8", name: "Producto destacado PROD8", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 79900 },
    { id: "prod-9", brand: "PROD9", name: "Producto destacado PROD9", image: "/assets/background/PRODUCTO.png", badge: "NUEVO", price: 179900 },
  ];

  // ✅ Promos
  const promotions = [
    { image: "/assets/promociones/PromoTelecomunicaciones.png", title: "Herramientas" },
    { image: "/assets/promociones/PromoIluminacion.png", title: "Iluminación" },
    { image: "/assets/promociones/PromoCables.png", title: "Cables" },
    { image: "/assets/promociones/PromoPortaca.png", title: "Interruptores" },
    { image: "/assets/promociones/PromoAuCo.png", title: "Seguridad" },
    { image: "/assets/promociones/PromoAreas.png", title: "Industrial" },
  ];

  // ✅ Aliados
  const allAllies = [
    "Schneider","Panduit","Mecano","Dexson","Legrand","Dixpro","3M","Leviton",
    "Philips","VCP electric","Centelsa","VCP ecolighting","Procables","Sylvania",
    "Crouse Hinds","Metal coraza","Weg","Plastimec","Colmena","Tercol","Teldor",
    "Rebra","Electro Porcelana GAMMA",
  ];

  // ✅ Responsive counts
  const visibleProducts = width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;
  const visibleAllies = width >= 1024 ? 6 : width >= 768 ? 4 : 2;

  // ✅ Helpers
  const formatCOP = (n) =>
    Number(n).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const compareAtFromPrice = (price, i) => {
    const factor = [1.2, 1.25, 1.3, 1.35][i % 4];
    return Math.max(price + 1, Math.round(price * factor));
  };

  // ✅ HERO controls
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);

    // ✅ LOADER al cargar el sitio
  useEffect(() => {
    const done = () => setIsLoading(false);

    // Si ya terminó de cargar, quitamos el loader de una
    if (document.readyState === "complete") {
      done();
      return;
    }

    // Espera al evento load (cuando termina de cargar todo)
    window.addEventListener("load", done);

    // Failsafe para que no se quede pegado si algo nunca dispara "load"
    const safety = setTimeout(done, 6000);

    return () => {
      window.removeEventListener("load", done);
      clearTimeout(safety);
    };
  }, []);

  // ✅ Bloquea scroll mientras el loader está activo (opcional pero recomendado)
  useEffect(() => {
    if (isLoading) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isLoading]);


  // ✅ width listener
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ HERO AUTO
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brands.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [brands.length, isHeroPaused]);

  // ✅ Carousels
  const nextBrandSlide = () => {
    const maxIndex = Math.max(0, products.length - visibleProducts);
    setBrandCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  const prevBrandSlide = () => setBrandCarouselIndex((prev) => Math.max(0, prev - 1));

  const nextAliadosSlide = () => {
    const maxIndex = Math.max(0, allAllies.length - visibleAllies);
    setAliadosCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  const prevAliadosSlide = () => setAliadosCarouselIndex((prev) => Math.max(0, prev - 1));

  return (
    <div className="relative">


           {/* ✅ LOADER FULLSCREEN*/}
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
      <span className="text-equielect-blue font-semibold text-sm">
        Cargando...
      </span>
    </div>
  </div>
)}

      {/* ✅ CSS GLOBAL (si ya lo tienes en globals.css, puedes borrarlo de aquí) */}
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
        .border-equielect-yellow { border-color: var(--color-equielect-yellow); }
        .border-equielect-blue { border-color: var(--color-equielect-blue); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

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
              <img src={b.image} alt={b.name} className="w-full h-full object-cover" draggable={false} />
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
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-black/45 hover:bg-black/60 text-white flex items-center justify-center"
            style={{ borderRadius: 0 }}
            aria-label="Siguiente"
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
                style={{ borderRadius: 0 }}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ STATS */}
      <div className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-equielect-yellow mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ AYUDA */}
      <section className="py-16 sm:py-20 bg-gray-800 text-white" id="ayuda">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 px-4 text-white">
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
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ ALIADOS */}
      <section className="bg-white py-12 sm:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-equielect-blue">Conoce todas nuestras marcas</h2>
            <button
              className="bg-gray-800 hover:bg-black text-white px-6 py-2.5 font-semibold transition-all hover:scale-105 text-sm"
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex gap-4 sm:gap-8 items-center py-8 px-4 sm:px-12 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${aliadosCarouselIndex * (100 / visibleAllies)}%)` }}
              >
                {allAllies.map((brand, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-1/2 sm:w-1/4 lg:w-1/6 flex items-center justify-center bg-white hover:bg-gray-50 transition-all p-4 hover:scale-110 cursor-pointer group border border-gray-200"
                    style={{ minWidth: "120px", height: "80px", borderRadius: 0 }}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-equielect-gray group-hover:text-equielect-yellow transition-colors text-center">
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextAliadosSlide}
              disabled={aliadosCarouselIndex >= allAllies.length - visibleAllies}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-gray-800 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-10 h-10 items-center justify-center shadow-lg z-10 transition-all hover:scale-110"
              style={{ borderRadius: 0 }}
              aria-label="Siguientes marcas"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
