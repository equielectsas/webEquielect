"use client";

import Link from "next/link";

/**
 * DATA del mega menú por categoría
 * (esto es lo que luego puedes mover a backend si quieres)
 */
const MEGA_MENU_DATA = {
  Telecomunicaciones: {
    columns: [
      {
        title: "Cableado",
        href: "/telecomunicaciones/cableado",
        items: [
          "Cable UTP",
          "Fibra óptica",
          "Patch cords",
          "Conectores RJ45",
          "Canalización",
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
          "Paneles LED",
          "Downlights",
          "Tubos LED",
          "Decorativa",
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
          "Cobre",
          "Aluminio",
          "Baja tensión",
          "Media tensión",
        ],
      },
      {
        title: "Canalización",
        href: "/cableado/canalizacion",
        items: [
          "Tubería PVC",
          "Bandejas",
          "Escalerillas",
          "Accesorios",
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
          "Bandejas",
          "Escalerillas",
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
          "PLC",
          "Sensores",
          "Variadores",
          "Relés",
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
          "Luminarias",
          "Cajas",
          "Conectores",
          "Protección",
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
          "Tableros",
          "Motores",
          "Protecciones",
          "Energía",
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
