"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import Allies360Carousel from "@/components/home/Allies360Carousel";

export default function HomeOtherAlliesAndCorporateSection({ allies = [], corporate }) {
  const makeSrcSet = (x1, x2) => `${x1} 1x, ${x2 || x1} 2x`;

  const CORPORATE = useMemo(() => corporate, [corporate]);

  return (
    <Reveal delay={120}>
      <>
        <section className="bg-white py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl text-equielect-blue font-semibold">
              Otras Marcas <span className="font-black">Aliadas</span>
            </h2>
            <Link href="/aliados" className="text-equielect-blue font-bold text-sm hover:underline">
              Ver todas
            </Link>
          </div>

          <Allies360Carousel
            items={allies.map((a) => ({ name: a.name, icon: a.src, href: a.href }))}
            speedSeconds={30}
          />
        </section>

        <section className="w-full border-t border-gray-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="w-full">
              <picture className="block w-full">
                <source media="(min-width: 1024px)" srcSet={makeSrcSet(CORPORATE.desktop, CORPORATE.desktop2x)} />
                <source media="(min-width: 768px)" srcSet={makeSrcSet(CORPORATE.tablet, CORPORATE.tablet2x)} />
                <img
                  src={CORPORATE.mobile}
                  srcSet={makeSrcSet(CORPORATE.mobile, CORPORATE.mobile2x)}
                  alt="Acompañamiento técnico especializado - Equielect"
                  className="w-full h-auto block"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="bg-[#ffcd00] flex items-center">
              <div className="w-full px-6 md:px-8 lg:px-14 py-10 md:py-0">
                <div className="max-w-xl">
                  <p className="text-[#1c355e] text-sm font-semibold uppercase tracking-wider">
                    Atención al Cliente
                  </p>
                  <h3 className="mt-2 text-[#1c355e] text-3xl lg:text-4xl font-extrabold">
                    Oficina Virtual Equielect
                  </h3>
                  <p className="mt-4 text-[#1c355e]/90">
                    Atención rápida y asesoría profesional a un clic de distancia.
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/contactanos"
                      className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#1c355e] font-extrabold"
                      style={{ borderRadius: 2 }}
                    >
                      Solicitar cotización
                    </Link>
                  </div>

                  <div className="h-3 md:hidden" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Reveal>
  );
}