import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";

export async function generateMetadata({ params }) {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return { title: "Marca | Equielect" };

  return {
    title: `${brand.name} | Equielect`,
    description: brand.description || `Información y productos de ${brand.name}.`,
  };
}

export default function BrandPage({ params }) {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return notFound();

  const ctas = brand.ctas || [
    { label: "Ver productos", href: `/productos?marca=${brand.slug}`, primary: true },
    { label: "Cotizar con un asesor", href: "/contactanos" },
  ];

  return (
    <main className="bg-white">
      {/* Banner 1212x250 */}
      <section className="mt-0">
        <div className="relative w-full overflow-hidden aspect-[1212/250] bg-black">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={`${brand.images.desktop} 1x, ${brand.images.desktop2x || brand.images.desktop} 2x`}
            />
            <source
              media="(min-width: 768px)"
              srcSet={`${brand.images.tablet} 1x, ${brand.images.tablet2x || brand.images.tablet} 2x`}
            />
            <img
              src={brand.images.mobile}
              srcSet={`${brand.images.mobile} 1x, ${brand.images.mobile2x || brand.images.mobile} 2x`}
              alt={`Banner ${brand.name}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              draggable="false"
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/0" />

          <div className="absolute left-4 sm:left-6 md:left-10 top-4 sm:top-6 md:top-10 max-w-[760px] text-white">
            {brand.banner?.title && (
              <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight">
                {brand.banner.title}
              </h1>
            )}

            {brand.banner?.subtitle && (
              <p className="mt-2 text-xs sm:text-sm md:text-base text-white/85 max-w-[680px]">
                {brand.banner.subtitle}
              </p>
            )}

            {brand.banner?.bullets?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {brand.banner.bullets.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] sm:text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15"
                  >
                    {b}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Info central */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-14 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-wide text-black">
          {brand.name.toUpperCase()}
        </h2>

        {brand.description && (
          <p className="mt-5 text-sm md:text-base font-semibold text-gray-700 leading-relaxed">
            {brand.description}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {ctas.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className={
                c.primary
                  ? "bg-[#ffcd00] text-[#0b2a4d] font-extrabold px-6 py-3 rounded-lg"
                  : "border border-gray-300 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-50"
              }
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Secciones distintas por marca */}
      {brand.sections?.length ? (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="grid gap-6">
            {brand.sections.map((s, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-6 bg-white"
              >
                <h3 className="text-lg font-extrabold text-[#1c355e]">
                  {s.title}
                </h3>

                {s.text ? (
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {s.text}
                  </p>
                ) : null}

                {s.list?.length ? (
                  <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ✅ Aquí luego metemos productos filtrados por marca */}
    </main>
  );
}
