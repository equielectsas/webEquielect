"use client";

import Link from "next/link";

const MEGA_MENU_DATA = {
  Telecomunicaciones: {
    columns: [
      {
        title: "Cableado",
        href: "/marca/teldor",
        items: [
          "Cable UTP",
          "Cables libres de halógenos",
          "Cables de control y comunicación",
          "Aluminio",
          "",
        ],
      },
      {
        title: "Redes",
        href: "/telecomunicaciones/redes",
        items: [
          "Switches",
          "Routers",
          "Access Points",
          "Gabinetes",
          "Racks",
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
          "Industrial",
          "Residencial",
          "Solar",
          "",
        ],
      },
      {
        title: "Exterior",
        href: "/iluminacion/exterior",
        items: [
          "Reflectores",
          "Alumbrado público",
          "Industrial",
          "Emergencia",
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
          "Baja tensión",
          "Media tensión",
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
          "Tipo Escalera",
          "Tipo Malla",
          "Canastillas",
          "Soportes",
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
          "Variadores",
          "Arranque Motor",
          "Pulsadores",
          "Interruptores",
          "Otros",
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
          "Resina-CH CHICO",
        ],
      },
    ],
  },

  Minería: {
    columns: [
      {
        title: "Industrial",
        href: "/mineria",
        items: [
          "Mineria liviana",
          "Mineria pesada",
        ],
      },
    ],
  },
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
                {col.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`${col.href}/${item
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-sm text-gray-700 hover:text-equielect-blue"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
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
