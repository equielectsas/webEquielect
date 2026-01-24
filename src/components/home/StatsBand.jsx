"use client";

import Image from "next/image";
import Link from "next/link";

export default function StatsBand() {
  const stats = [
    { value: "+40", label1: "AÑOS", label2: "DE EXPERIENCIA" },
    { value: "+70.000", label1: "VENTAS", label2: "ANUALES" },
    { value: "100%", label1: "CALIDAD", label2: "CERTIFICADA" },
    { value: "EQUIPO", label1: "COTIZACIÓN", label2: "Y ASESORES" },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/sucursal/stat.png"
          alt="Equielect - Respaldo y experiencia"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 items-center text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="relative">
              {idx !== 0 && (
                <span className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 h-14 w-px bg-white/18" />
              )}

              <div
                className="font-extrabold leading-none tracking-tight"
                style={{
                  color: "var(--color-equielect-yellow)",
                  fontSize: "clamp(34px, 4vw, 64px)",
                }}
              >
                {s.value}
              </div>

              <div className="mt-2 text-white font-extrabold tracking-wide leading-tight">
                <div className="text-sm sm:text-base">{s.label1}</div>
                <div className="text-sm sm:text-base">{s.label2}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/quienes-somos"
            className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#1c355e] font-extrabold hover:opacity-90 transition"
            style={{ borderRadius: 2 }}
          >
            Ver quiénes somos →
          </Link>
        </div>
      </div>
    </section>
  );
}
