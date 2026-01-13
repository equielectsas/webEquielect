"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ALL_BRANDS = [
  { name: "3M", src: "/assets/aliados/Allie3M.png" },
  { name: "Centelsa", src: "/assets/aliados/AllieCentelsa.png" },
  { name: "Colmena Conduit", src: "/assets/aliados/AllieColmena.png" },
  { name: "Connect VCP", src: "/assets/aliados/AllieConnectVCP.png" },
  { name: "Gonvarri", src: "/assets/aliados/AllieGonvarri.png" },
  { name: "Metal Coraza", src: "/assets/aliados/AllieMetalCoraza.png" },
  { name: "Panduit", src: "/assets/aliados/AlliePanduit.png" },
  { name: "Philips", src: "/assets/aliados/AlliePhilips.png" },
  { name: "Phoenix Contact", src: "/assets/aliados/AlliePhoenix.png" },
  { name: "Plastimec", src: "/assets/aliados/AlliePlastimec.png" },
  { name: "Schmersal", src: "/assets/aliados/AllieSchmersal.png" },
  { name: "Siemon", src: "/assets/aliados/AllieSiemon.png" },
  { name: "Sylvania", src: "/assets/aliados/AllieSylvania.png" },
  { name: "Teldor", src: "/assets/aliados/AllieTeldor.png" },
  { name: "Telemecanique", src: "/assets/aliados/AllieTelemecanique.png" },
  { name: "Tercol", src: "/assets/aliados/AllieTercol.png" },
  { name: "WEG", src: "/assets/aliados/AllieWeg.png" },
  { name: "Schneider", src: "/assets/aliados/SchneiderBG.png" },
  { name: "Legrand", src: "/assets/aliados/LegrandBG.png" },
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
      {/* HEADER tipo la imagen */}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-10 items-center">
              {filtered.map((b) => (
                <div
                  key={b.name}
                  className="group h-[56px] sm:h-[64px] lg:h-[70px] flex items-center justify-center"
                  title={b.name}
                >
                  <div className="relative w-full max-w-[170px] h-full">
                    <Image
                      src={b.src}
                      alt={b.name}
                      fill
                      className="object-contain opacity-90 group-hover:opacity-100 transition"
                      sizes="170px"
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
