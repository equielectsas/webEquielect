"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

const AboutUsPage = () => {
  // ✅ quitamos scrollPosition (causaba re-renders + movimiento feo)
  const heroBgRef = useRef(null);
  const rafRef = useRef(null);

  const [isVisible, setIsVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;

      // ✅ Parallax suave: sin state, sin re-render, sin "lag"
      if (heroBgRef.current) {
        const offset = Math.min(y * 0.25, 180); // ajusta 0.18 / 0.22 / 0.25
        heroBgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
      }

      // ✅ Visibilidad: calcula todo y set una sola vez
      const next = { section1: false, section2: false, section3: false };
      document.querySelectorAll(".scroll-section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visible = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
        if (section.id && next[section.id] !== undefined) next[section.id] = visible;
      });
      setIsVisible(next);

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const timelineData = useMemo(
    () => [
      {
        year: 1986,
        title: "Fundación de Equielect",
        description:
          "La empresa nació en Medellín el 20 de mayo de 1986, enfocándose en materiales de construcción y madera.",
      },
      {
        year: 1995,
        title: "Expansión Local",
        description:
          "Durante los años 90, amplió su red de clientes en Colombia y diversificó su portafolio de productos.",
      },
      {
        year: 2010,
        title: "Sostenibilidad",
        description:
          "Adoptó estrategias enfocadas en eficiencia energética y productos sostenibles para la construcción.",
      },
      {
        year: 2023,
        title: "Crecimiento Financiero",
        description:
          "Alcanzó un crecimiento del 7,78% en ingresos netos y 3,57% en activos totales, consolidándose en el mercado.",
      },
      {
        year: 2024,
        title: "Generación de Empleo",
        description:
          "Superó los 100 empleados, destacando su impacto social y económico en el país.",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-white">
      {/* ✅ HERO (parallax pro, sin transition) */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url('/assets/fondos/espacio_EQ.png')",
            transform: "translate3d(0,0,0) scale(1.12)", // ✅ evita bordes al mover
          }}
        />
        <div className="absolute inset-0 bg-black/5" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Más que negocios,
            <span className="block mt-2 text-yellow-400">hacemos amigos</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-8 mb-8" />
        </div>
      </div>

      <section id="section1" className="scroll-section relative py-24 px-4">
        <div
          className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible.section1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
            <div className="w-16 h-1 bg-yellow-400" />
            <p className="text-lg text-gray-600 leading-relaxed">
              Fundada el 3 de junio de 1986 en Medellín, Colombia, Equielect
              S.A.S. se ha consolidado como una empresa líder en la
              comercialización de equipos eléctricos, electrónicos y de
              telecomunicaciones.
            </p>
          </div>

          <div className="relative h-[400px] overflow-hidden shadow-2xl group">
            <div
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110 border radius-10"
              style={{
                backgroundImage:
                  "url('/assets/quienes-somos/equipo.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
          </div>
        </div>
      </section>

      <section
        id="section2"
        className="scroll-section relative py-24 px-4 bg-gray-100"
      >
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible.section2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Nuestros Valores
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Innovación", icon: "💡" },
              { title: "Excelencia", icon: "⭐" },
              { title: "Compromiso", icon: "🤝" },
            ].map((valor, index) => (
              <div
                key={index}
                className={`bg-white p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
                  ${
                    isVisible.section2
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{valor.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{valor.title}</h3>
                <p className="text-gray-600">
                  Comprometidos con la excelencia y la innovación en cada
                  proyecto que emprendemos.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="section3"
        className="scroll-section relative py-16 px-4 sm:py-20 md:py-24 bg-gray-200"
      >
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible.section3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 sm:mb-16">
            Nuestra Trayectoria
          </h2>

          <div className="relative">
            <div className="absolute left-[50%] transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600" />

            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center mb-12 md:mb-16 transition-all duration-500 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${
                  isVisible.section3
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  } space-y-4`}
                >
                  <div className="bg-white p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl sm:text-2xl font-bold text-yellow-600">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full border-4 border-white shadow-lg" />
                  <div className="absolute w-8 h-8 bg-yellow-400 rounded-full opacity-25 animate-ping" />
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
