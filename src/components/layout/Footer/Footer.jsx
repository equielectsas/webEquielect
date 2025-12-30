import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const LINKS = [
  {
    title: "Productos",
    items: [
      { name: "Eléctricos", href: "/electricos" },
      { name: "Iluminación", href: "/iluminacion" },
      { name: "Automatizacion Industrial", href: "/automatizacion-industial" },
      { name: "Energía Renovable", href: "/energia-renovable" },
    ],
  },
  // {
  //   title: "Términos y Condiciones",
  //   items: [{ name: "Términos de Uso", href: "/terminos-y-condiciones" }],
  // },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="z-[5] relative w-full bg-gray-800 text-white">
      <div className="mx-auto w-full max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <p className="mb-4 text-xl font-semibold text-yellow-500">
              Equielect
            </p>
            <p className="text-gray-400">
              Innovación y tecnología al servicio de la industria.
            </p>
          </div>

          {LINKS.map(({ title, items }) => (
            <ul key={title}>
              <p className="mb-3 text-lg font-semibold text-gray-300">
                {title}
              </p>
              {items.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="block py-1.5 text-gray-400 transition-colors hover:text-[#FFCD00]"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          <div className="flex flex-col items-start">
            <p className="mb-3 text-lg font-semibold text-gray-300">
              Contáctanos
            </p>
            <p className="text-gray-400">Correo: equielect@equielect.com.co</p>
            <p className="text-gray-400">Teléfono: (604) 444 3133</p>
            <p className="text-gray-400">
              Dirección: Carrera 72 No. 30-53 Medellín – Colombia
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-lg font-semibold text-white mb-4">
            Nuestra ubicación
          </p>
          <div className="w-full h-64 overflow-hidden shadow-lg">
            <iframe
              title="Mapa de ubicación"
              src="https://www.google.com/maps?q=6.232166,-75.592861&hl=es&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="my-8 h-px bg-gray-700"></div>

        <div className="flex flex-col items-left justify-between">
          <p>
            &copy; {currentYear}{" "}
            <span className="font-semibold text-yellow-500 ">Equielect</span>.
            Todos los derechos{" "}
            <a
              href="/terminos-y-condiciones"
              className=" hover:text-yellow-700 underline"
            >
              reservados
            </a>
          </p>

          <div className="flex gap-6 text-2xl text-gray-400 pt-3">
            <a
              href="https://www.facebook.com/equielect"
              className="transition-colors hover:text-[#1877f2]"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/equielectsas/"
              className="transition-colors hover:text-[#D43089]"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/equielect/?originalSubdomain=co"
              className="transition-colors hover:text-[#0073b1]"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/EQUIELECT"
              className="transition-colors hover:text-[#1DA1F2]"
              aria-label="X"
            >
              <FaTwitter />
            </a>

            <a
              href="link-whatsapp"
              className="transition-colors hover:text-[#25d366]"
              aria-label="X"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
