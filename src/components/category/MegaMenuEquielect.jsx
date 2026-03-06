"use client";

import Link from "next/link";

export const MEGA_MENU_DATA = {
  Telecomunicaciones: {
    columns: [
      {
        title: "Cableado",
        href: "/marca/siemon",
        items: [
          { label: "Cable UTP", href: "/marca/siemon" },
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
          { label: "Emergencia", href: "/marca/crouse-hinds" },
        ],
      },
    ],
  },

  Cableado: {
    columns: [
      {
        title: "Eléctrico",
        href: "/cableado/electrico",
        items: [
          { label: "Baja tensión y media tensión", href: "/marca/procables" },
          { label: "Aluminio", href: "/marca/centelsa" },
          { label: "Cables de control y comunicación", href: "/marca/teldor" },
        ],
      },
    ],
  },

  "Sistemas portacables": {
    columns: [
      {
        title: "Portacables",
        href: "/portacables",
        items: [
          { label: "Tipo Escalera", href: "/marca/gonvarri" },
          { label: "Tipo Malla", href: "/marca/legrand" },
          { label: "Soportes", href: "/marca/gonvarri" },
        ],
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
        href: "/Crouse-hinds",
        items: [
          { label: "Crouse-Hinds", href: "/marca/crouse-hinds" },
        ],
      },
    ],
  },

  Minería: {
    columns: [
      {
        title: "Mineria",
        href: "/mineria",
        items: [
          { label: "Minería liviana y pesada", href: "/marca/weg" },
        ],
      },
    ],
  },
};

// slug helper
const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// soporta string o {label, href}
const normalizeItem = (item) => {
  if (!item) return null;
  if (typeof item === "string") return { label: item, href: null };
  if (typeof item === "object" && item.label) return item;
  return null;
};

export default function MegaMenuEquielect({
  category,
  onNavigate,     // ✅ cierro dropdown/menú desde el padre
  isMobile = false,
}) {
  const data = MEGA_MENU_DATA[category];
  if (!data) return null;

  const handleNavigate = () => {
    // ✅ si quieres que cierre solo en móvil:
    // if (isMobile) onNavigate?.();

    // ✅ si quieres que cierre SIEMPRE:
    onNavigate?.();
  };

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
              {/* Título columna */}
              <Link
                href={col.href}
                onClick={handleNavigate}
                className="block text-sm font-semibold text-equielect-blue mb-4 hover:underline"
              >
                {col.title} &gt;
              </Link>

              {/* Items */}
              <ul className="space-y-2">
                {col.items
                  .map(normalizeItem)
                  .filter(Boolean)
                  .map((it) => {
                    const href = it.href || `${col.href}/${slugify(it.label)}`;

                    return (
                      <li key={`${col.title}-${it.label}`}>
                        <Link
                          href={href}
                          onClick={handleNavigate}  // ✅ aquí se cierra
                          className="text-sm text-gray-700 hover:text-equielect-blue"
                        >
                          {it.label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}