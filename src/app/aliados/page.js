"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ALL_BRANDS = [

  // ⚠️ Estos suelen tener mucho espacio transparente → les subimos scale
  { name: "Schneider", src: "/assets/aliados/SchneiderBG.png", scale: 0.8 },
  { name: "Legrand", src: "/assets/aliados/LegrandBG.png", scale: 1.0 },
  { name: "Procables", src: "/assets/aliados/AllieProCables.png", scale: 1.0 },
  { name: "Gonvarri", src: "/assets/aliados/AllieGonvarri.png", scale: 1.05 },
  { name: "Centelsa", src: "/assets/aliados/AllieCentelsa.png", scale: 1.7 },
  { name: "3M", src: "/assets/aliados/Allie3M.png", scale: 0.5 },
  { name: "Telemecanique", src: "/assets/aliados/AllieTelemecanique.png", scale: 2.0 },
  { name: "Panduit", src: "/assets/aliados/AlliePanduit.png", scale: 1.25 },
  { name: "Phoenix Contact", src: "/assets/aliados/AlliePhoenix.png", scale: 1.05 },
  { name: "Sylvania", src: "/assets/aliados/AllieSylvania.png", scale: 0.8 },
  { name: "Philips", src: "/assets/aliados/AlliePhilips.png", scale: 1.2 },
  { name: "Schmersal", src: "/assets/aliados/AllieSchmersal.png", scale: 1.8 },
  { name: "WEG", src: "/assets/aliados/AllieWeg.png", scale: 1.2 },
  { name: "Connect VCP", src: "/assets/aliados/AllieConnectVCP.png", scale: 1.15 },
  { name: "Teldor", src: "/assets/aliados/AllieTeldor.png", scale: 1.6 },
  { name: "Plastimec", src: "/assets/aliados/AlliePlastimec.png", scale: 1.1 },
  { name: "Metal Coraza", src: "/assets/aliados/AllieMetalCoraza.png", scale: 0.5 },
  { name: "Panduit", src: "/assets/aliados/AlliePanduit.png", scale: 1.25 },
  { name: "Siemon", src: "/assets/aliados/AllieSiemon.png", scale: 1.6 },
  { name: "Tercol", src: "/assets/aliados/AllieTercol.png", scale: 1.25 },
  { name: "Colmena Conduit", src: "/assets/aliados/AllieColmena.png", scale: 1.35 },


];

export default function MarcasPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ALL_BRANDS;
    return ALL_BRANDS.filter((b) => b.name.toLowerCase().includes(term));
  }, [q]);

  return (
    <main className="bg-white">
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-equielect-blue text-xl sm:text-2xl font-medium">
              Todos nuestros
            </div>
            <h1 className="text-equielect-blue text-5xl sm:text-2xl font-black tracking-tight">
              Aliados
            </h1>
          </div>

          {/* GRID de logos */}
          <div className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-12 place-items-center">
              {filtered.map((b) => (
                <div key={b.name} title={b.name} className="group">
                  {/* ✅ Marco fijo */}
                  <div className="relative w-[160px] h-[70px] sm:w-[180px] sm:h-[80px] lg:w-[200px] lg:h-[90px] overflow-hidden">
                    <Image
                      src={b.src}
                      alt={b.name}
                      fill
                      sizes="(max-width:640px) 160px, (max-width:1024px) 180px, 200px"
                      className="object-contain opacity-90 group-hover:opacity-100 transition"
                      style={{
                        transform: `scale(${b.scale ?? 1})`,
                        transformOrigin: "center",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
