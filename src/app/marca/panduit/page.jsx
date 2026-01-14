import Image from "next/image";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";

export default function BrandPage({ params }) {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return notFound();

  return (
    <main className="bg-white">
      {/* ✅ BANNER debajo del header (responsive images + 2x) */}
      <section className="mt-3">
        <div className="relative w-full h-[220px] md:h-[260px] lg:h-[300px] overflow-hidden">
          <picture>
            {/* Desktop */}
            <source
              media="(min-width: 1024px)"
              srcSet={`${brand.images.desktop} 1x, ${brand.images.desktop2x} 2x`}
            />
            {/* Tablet */}
            <source
              media="(min-width: 768px)"
              srcSet={`${brand.images.tablet} 1x, ${brand.images.tablet2x} 2x`}
            />
            {/* Mobile (fallback) */}
            <img
              src={brand.images.mobile}
              srcSet={`${brand.images.mobile} 1x, ${brand.images.mobile2x} 2x`}
              alt={`Banner ${brand.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable="false"
            />
          </picture>

          {/* Overlay (suave) */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Texto opcional arriba izquierda */}
          <div className="absolute left-6 md:left-10 top-6 md:top-10 max-w-[720px] text-white">
            <p className="text-xs md:text-sm font-semibold text-white/90">
              {brand.title}
            </p>
            <p className="mt-1 text-xs md:text-sm text-white/80">
              {brand.exampleProducts}
            </p>

            {/* Logo mini (opcional) */}
            {brand.logoPath ? (
              <div className="mt-4 inline-flex items-center gap-3 bg-white/10 border border-white/15 px-3 py-2 rounded-lg">
                <div className="relative w-[90px] h-[28px]">
                  <Image
                    src={brand.logoPath}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-extrabold tracking-wide">
                  {brand.name.toUpperCase()}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ✅ BLOQUE de título + descripción centrado (como tu mock) */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-wide text-black">
          {brand.name.toUpperCase()}
        </h1>

        <p className="mt-5 text-sm md:text-base font-semibold text-gray-700 leading-relaxed">
          {brand.description}
        </p>

        {/* Botones opcionales */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/productos"
            className="bg-[#ffcd00] text-[#0b2a4d] font-extrabold px-6 py-3 rounded-lg"
          >
            Ver productos
          </a>
          <a
            href="/contactanos"
            className="border border-gray-300 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Cotizar con un asesor
          </a>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}
