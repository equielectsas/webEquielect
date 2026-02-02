"use client";

import Link from "next/link";

const MEGA_MENU_DATA = {
  Telecomunicaciones: {
    columns: [
      {
        title: "Cableado",
        href: "/marca/siemon",
        items: [
          { label: "Cable UTP", href: "/marca/siemon" }, // ✅ directo a siemon
          { label: "Cables libres de halógenos", href: "/marca/procables" },
          { label: "Cables de control y comunicación", href: "/marca/connect-vcp" },
          { label: "Aluminio", href: "/marca/centelsa" },
        ],
      },
    ],
  },

  Iluminación: {
    columns: [
      {
        title: "Interior",
        href: "/iluminacion/interior",
        items: [
          { label: "Industrial", href: "/marca/philips" },
          { label: "Residencial", href: "/marca/sylvania" },
          { label: "Solar", href: "/marca/sylvania" },
        ],
      },
      {
        title: "Exterior",
        href: "/iluminacion/exterior",
        items: [
          { label: "Reflectores", href: "/marca/philips" },
          { label: "Alumbrado público", href: "/marca/sylvania" },
          { label: "Industrial", href: "/marca/crouse-hinds" },
          { label: "Emergencia", href: "/marca/crouse-hinds" }],
      },
    ],
  },

  Cableado: {
    columns: [
      {
        title: "Eléctrico",
        href: "/cableado/electrico",
        items: [
          { label: "Baja tensión", href: "/marca/procables" },
          { label: "Media tensión", href: "/marca/procables" }],
      },
    ],
  },

  "Sistemas portacables": {
    columns: [
      {
        title: "Portacables",
        href: "/portacables",
        items: [
          { label: "Tipo Escalera", href: "/marca/legrand" },
          { label: "Tipo Malla", href: "/marca/legrand" },
          { label: "Canastillas", href: "/marca/gonvarri" },
          { label: "Soportes", href: "/marca/gonvarri" }],
      },
    ],
  },

  "Automatización y control": {
    columns: [
      {
        title: "Control",
        href: "/automatizacion",
        items: [
          { label: "Variadores", href: "/marca/schneider" },
          { label: "Arranque Motor", href: "/marca/schneider" },
          { label: "Pulsadores", href: "/marca/schneider" },
          { label: "Interruptores", href: "/marca/schmersal" },
        ],
      },
    ],
  },

  "Áreas clasificadas": {
    columns: [
      {
        title: "Explosión",
        href: "/areas-clasificadas",
        items: [
          "Cajas", 
          "Sellos", 
          "Iluminación", 
          "Resina-CH CHICO"],
      },
    ],
  },

  Minería: {
    columns: [
      {
        title: "Industrial",
        href: "/mineria",
        items: [
          {"label": "Minería liviana", "href": "/marca/centelsa"},
          {"label": "Minería pesada", "href": "/marca/centelsa"}],
      },
    ],
  },
};

// ✅ helper para slug
const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ✅ helper: soporta string o {label, href}
const normalizeItem = (item) => {
  if (!item) return null; // evita "" o null
  if (typeof item === "string") return { label: item, href: null };
  if (typeof item === "object" && item.label) return item;
  return null;
};

export default function MegaMenuEquielect({ category }) {
  const data = MEGA_MENU_DATA[category];
  if (!data) return null;

  return (
    <div className="absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-xl z-[200]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: `repeat(${data.columns.length}, minmax(0,1fr))`,
          }}
        >
          {data.columns.map((col) => (
            <div key={col.title}>
              <Link
                href={col.href}
                className="block text-sm font-semibold text-equielect-blue mb-4 hover:underline"
              >
                {col.title} &gt;
              </Link>

              <ul className="space-y-2">
                {col.items
                  .map(normalizeItem)
                  .filter(Boolean)
                  .map((it) => {
                    // ✅ si el item trae href propio, úsalo
                    const href = it.href || `${col.href}/${slugify(it.label)}`;

                    return (
                      <li key={`${col.title}-${it.label}`}>
                        <Link
                          href={href}
                          className="text-sm text-gray-700 hover:text-equielect-blue"
                        >
                          {it.label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>

              <Link
                href={col.href}
                className="inline-block mt-4 text-sm text-equielect-blue hover:underline"
              >
                Ver más &gt;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
