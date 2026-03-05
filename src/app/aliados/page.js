"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ALL_BRANDS = [
  { name: "Schneider", src: "/assets/aliados/SchneiderBG.png", scale: 0.8, href: "/marca/schneider" },
  { name: "Legrand", src: "public/assets/aliados/LegrandBG.png", scale: 1.0, href: "/marca/legrand" },
  { name: "Procables", src: "/assets/aliados/AlliePrysmian.png", scale: 1.0, href: "/marca/procables" },
  { name: "Gonvarri", src: "/assets/aliados/AllieGonvarri.png", scale: 1.05, href: "/marca/gonvarri" },
  { name: "Centelsa", src: "/assets/aliados/AllieCentelsa.png", scale: 1.7, href: "/marca/centelsa" },
  { name: "3M", src: "/assets/aliados/Allie3M.png", scale: 0.5, href: "/marca/3M" },

  { name: "Telemecanique", src: "/assets/aliados/AllieTelemecanica.png", scale: 2.0, href: "/marca/telemecanique" },
  { name: "Panduit", src: "/assets/aliados/AlliePanduit.png", scale: 1.25, href: "/marca/panduit" },
  { name: "Phoenix Contact", src: "/assets/aliados/AlliePhoenix.png", scale: 1.05, href: "/marca/phoenix-contact" },
  { name: "Sylvania", src: "/assets/aliados/AllieSylvania.png", scale: 0.8, href: "/marca/sylvania" },
  { name: "Philips", src: "/assets/aliados/AlliePhilips.png", scale: 1.2, href: "/marca/philips" },
  { name: "Schmersal", src: "/assets/aliados/AllieSchmersal.png", scale: 1.8, href: "/marca/schmersal" },

  { name: "WEG", src: "/assets/aliados/AllieWeg.png", scale: 1.2, href: "/marca/weg" },
  { name: "Connect VCP", src: "/assets/aliados/AllieConnectVCP.png", scale: 1.15, href: "/marca/connect-vcp" },
  { name: "Teldor", src: "/assets/aliados/AllieTeldor.png", scale: 1.6, href: "/marca/teldor" },
  { name: "Plastimec", src: "/assets/aliados/AlliePlastimec.png", scale: 1.1, href: "/marca/plastimec" },
  { name: "Metal Coraza", src: "/assets/aliados/AllieMetalCoraza.png", scale: 0.5, href: "/marca/metalcoraza" },
  { name: "Siemon", src: "/assets/aliados/AllieSiemon.png", scale: 1.6, href: "/marca/siemon" },
  { name: "Tercol", src: "/assets/aliados/AllieTercol.png", scale: 1.25, href: "/marca/tercol" },
  { name: "Colmena Conduit", src: "/assets/aliados/AllieColmena.png", scale: 1.35, href: "/marca/colmena-conduit" },
  { name: "Crouse Hinds", src: "/assets/aliados/AllieCH.png", scale: 1.0, href: "/marca/crouse-hinds" },
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
            <h1 className="text-equielect-blue text-5xl sm:text-6xl font-black tracking-tight">
              Aliados
            </h1>
          </div>

          {/* ✅ FLEX-WRAP centrado (última fila SIEMPRE centrada) */}
          <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-y-10">
              {filtered.map((b) => (
                <Link
                  key={b.name}
                  href={b.href || "#"}
                  title={b.name}
                  className="
                    group outline-none focus-visible:ring-2 focus-visible:ring-[#005cb9]/40 rounded-md
                    flex items-center justify-center
                    w-1/2 sm:w-1/3 lg:w-1/5
                  "
                >
                  {/* ✅ Caja del logo */}
                  <div className="relative w-[140px] h-[64px] sm:w-[170px] sm:h-[78px] lg:w-[190px] lg:h-[88px] overflow-hidden">
                    <Image
                      src={b.src}
                      alt={b.name}
                      fill
                      sizes="(max-width:640px) 140px, (max-width:1024px) 170px, 190px"
                      className="object-contain opacity-90 group-hover:opacity-100 transition"
                      style={{
                        transform: `scale(${b.scale ?? 1})`,
                        transformOrigin: "center",
                      }}
                    />
                  </div>

                  <span className="sr-only">{b.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
