"use client";
import React, { useEffect, useState } from "react";

/**
 * AboutUsPage - Perfil Corporativo Equielect S.A.S.
 * Estilo: Editorial de Ingeniería / Empresarial Premium
 */
const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState({
    profile: false,
    timeline: false,
    philosophy: false,
    compliance: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    { year: "1986", title: "Fundación Institucional", desc: "Equielect nace en Medellín con el objetivo de ser el puente técnico entre los grandes fabricantes globales y la industria nacional, priorizando siempre la asesoría de ingeniería." },
    { year: "2000", title: "Expansión Logística", desc: "Consolidamos nuestra sede principal y optimizamos los procesos de almacenamiento para garantizar la disponibilidad inmediata de componentes críticos en baja y media tensión." },
    { year: "2015", title: "Alianzas Estratégicas", desc: "Fortalecemos nuestro portafolio como aliados de marcas líderes mundiales, asegurando trazabilidad y cumplimiento normativo RETIE en cada equipo suministrado." },
    { year: "2026", title: "Liderazgo en Eficiencia", desc: "Nos posicionamos como referentes en soluciones para la transición energética y digitalización de redes inteligentes en el mercado colombiano." }
  ];

  return (
    <div className="bg-white font-sans selection:bg-[#fae100] selection:text-[#1c355e]">
      
      {/* ⚡ HERO: SOBRIO Y REFERENCIAL */}
      <header className="relative h-[60vh] bg-[#1c355e] flex items-center overflow-hidden">
        {/* Imagen fondo.png con overlay para elegancia empresarial */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/fondos/espacio_EQ.png" 
            alt="Circuitos Equielect"
            className="w-full h-full object-cover opacity-55"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="text-[#fae100] font-bold tracking-[0.4em] text-xl uppercase mb-4 border-l-4 border-[#fae100] pl-4">
            QUIENES SOMOS
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white max-w-4xl leading-tight">
            Lideres en la comercialización de equipos <br />
            <span className="font-bold">eléctricos, electrónicos y de telecomunicaciones.</span>
          </h1>
        </div>
      </header>

      {/* 🏢 SECCIÓN 1: PERFIL EMPRESARIAL */}
      <section id="profile" className="scroll-section py-28 px-6 max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-20 items-center transition-all duration-1000 ${isVisible.profile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#1c355e] uppercase tracking-tighter italic">
              Equielect S.A.S. <br />
              <span className="text-gray-400 font-light not-italic text-2xl">Solidez y Conocimiento Técnico</span>
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify">
              <p>
                Desde nuestra fundación en Medellín en 1986, nos hemos dedicado a la comercialización y distribución técnica de materiales eléctricos de alta especificación. Nuestra identidad se fundamenta en la <strong>confianza técnica</strong>; entendemos que cada componente suministrado es vital para la continuidad operativa de nuestros clientes.
              </p>
              <p>
                Contamos con una infraestructura logística robusta que nos permite atender proyectos de gran envergadura en sectores como la minería, el petróleo, la construcción y la industria manufacturera, siempre bajo los más altos estándares de calidad y cumplimiento legal.
              </p>
            </div>
          </div>
          {/* Imágenes de referencia empresarial */}
          <div className="relative grid grid-cols-2 gap-4">
            <img src="/assets/sucursal/corporativa3.jpg" alt="Instalaciones" className="w-full h-80 object-cover shadow-xl transition-all" />
            <img src="/assets/sucursal/corporativa1.jpg" alt="Equipo Técnico" className="w-full h-80 object-cover shadow-xl mt-12 transition-all" />
          </div>
        </div>
      </section>

      {/* ⏳ SECCIÓN: LÍNEA DE TIEMPO CON PATRÓN TÉCNICO DE CIRCUITOS */}
<section id="timeline" className="scroll-section py-32 relative overflow-hidden bg-white">
  
  {/* Capa de fondo con fondo.png en modo mosaico sutil */}
  <div 
    className="absolute inset-0 z-0 opacity-[0.27]" // Opacidad baja para que no distraiga del texto
    style={{ 
      backgroundImage: `url('/assets/banners/fondo.png')`,
      backgroundSize: '600px', // Tamaño del patrón
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center'
    }}
  />

  {/* Overlay de gradiente para suavizar los bordes del fondo */}
  <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-0" />

  <div className="max-w-6xl mx-auto px-6 relative z-10">
    <div className="text-center mb-24">
      <h2 className="text-xl font-black text-[#1c355e] uppercase italic tracking-tighter">
        Nuestra Evolución
      </h2>
      <div className="flex justify-center mt-4">
        <div className="h-1.5 w-20 bg-[#fae100]" />
      </div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.4em] mt-6">
        Trayectoria
      </p>
    </div>

    <div className="relative">
      {/* El "Cable" Conductor Central */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[#1c355e]/10 md:bg-gradient-to-b md:from-transparent md:via-[#1c355e]/20 md:to-transparent" />
      
      <div className="space-y-32">
        {timelineData.map((item, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col md:flex-row items-start group ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Nodo de conexión (Círculo) */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 bg-white border-4 border-[#1c355e] rounded-full z-10 group-hover:border-[#fae100] group-hover:scale-125 transition-all duration-300" />
            
            {/* Contenido Informativo */}
              <div className={`pl-12 md:pl-0 md:w-1/2 flex ${
                index % 2 === 0 
                  ? "md:justify-start md:pl-24 text-left" // Aumentamos a pl-24 para separar de la línea a la derecha
                  : "md:justify-end md:pr-24 md:text-right" // Aumentamos a pr-24 para separar de la línea a la izquierda
              }`}>
                <div className={`
                  relative bg-white/95 backdrop-blur-md p-8 shadow-xl transition-all duration-300
                  group-hover:-translate-y-1 group-hover:shadow-2xl
                  border-[#fae100]
                  ${index % 2 === 0 
                    ? 'border-l-8' // Borde grueso a la izquierda para los de la derecha
                    : 'md:border-r-8 md:border-l-0 border-l-8' // Borde a la derecha en PC, izquierda en móvil
                  }
                `}>
                  {/* Año con estilo sutil */}
                  <span className="text-5xl font-black text-black group-hover:text-black transition-colors block mb-2 leading-none">
                    {item.year}
                  </span>
                  
                  {/* Título del Hito */}
                  <h4 className="text-xl font-bold text-[#1c355e] uppercase tracking-tight mb-4">
                    {item.title}
                  </h4>
                  
                  {/* Descripción con mejor legibilidad */}
                  <p className="text-gray-600 font-light leading-relaxed text-base md:text-lg">
                    {item.desc}
                  </p>

                  {/* Decoración visual: Triángulo indicador (opcional para estilo pro) */}
                  <div className={`hidden md:block absolute top-6 w-4 h-4 bg-white rotate-45 border-[#fae100]
                    ${index % 2 === 0 
                      ? "-left-2 border-l border-b" 
                      : "-right-2 border-r border-t"
                    }`} 
                  />
                </div>
              </div>
            {/* Espaciador para alternar lados */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* 🛡️ SECCIÓN 3: FILOSOFÍA CORPORATIVA */}
      <section id="philosophy" className="scroll-section py-28 px-6 bg-[#1c355e] text-white">
        <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-20 transition-all duration-1000 ${isVisible.philosophy ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="space-y-8">
            <h3 className="text-[#fae100] text-3xl font-black uppercase italic tracking-tighter border-b-2 border-[#fae100] pb-4 inline-block">Misión</h3>
            <p className="text-xl font-light leading-relaxed opacity-90 italic">
              "Proveemos soluciones integrales para el sector electroindustrial, asesorando técnicamente cada compra para garantizar la máxima calidad y seguridad en los proyectos de nuestros aliados."
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter border-b-2 border-white pb-4 inline-block">Visión</h3>
            <p className="text-xl font-light leading-relaxed opacity-90 italic">
              "Consolidarnos como el referente nacional en confianza y garantía técnica, liderando el suministro de materiales para una infraestructura eléctrica resiliente y sostenible."
            </p>
          </div>
        </div>
      </section>

      {/* 📊 SECCIÓN 4: COMPLIANCE TÉCNICO */}
      <section id="compliance" className="scroll-section py-24 px-6 max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-3 gap-12 items-center transition-all duration-1000 ${isVisible.compliance ? "opacity-100" : "opacity-0"}`}>
          <div className="lg:col-span-1">
            <div className="p-8 bg-gray-50 border-l-8 border-[#fae100]">
              <h2 className="text-2xl font-black text-[#1c355e] uppercase italic mb-4">Compromiso <br />RETIE</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Seguridad Garantizada</p>
            </div>
          </div>
          <div className="lg:col-span-2 text-gray-700 text-lg font-light leading-relaxed">
            <p>
              En <strong>Equielect S.A.S.</strong>, la seguridad no es negociable. Todos nuestros productos cumplen estrictamente con el Reglamento Técnico de Instalaciones Eléctricas (RETIE). Mantenemos una trazabilidad total de nuestros equipos, asegurando que cada componente posea los certificados de conformidad vigentes exigidos por la ley colombiana.
            </p>
          </div>
        </div>
      </section>
      </div>
  );
}
export default AboutUsPage;