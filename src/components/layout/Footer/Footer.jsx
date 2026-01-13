"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";

export default function FooterEcommerce() {
  const year = new Date().getFullYear();

  // ✅ WhatsApp asesores (cambia el número si es otro)
  const whatsappPhone = "573001112233";
  const whatsappMsg = "Hola, quiero cotizar con un asesor de Equielect.";
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  // =========================
  // ✅ AJUSTES DEL LOGO (SOLO TOCA ESTO)
  // =========================
  const LOGO_BOX_H = "h-[180px] md:h-[90px]"; // espacio reservado (NO cambia aunque agrandes el logo)
  const LOGO_W = "w-[320px] md:w-[380px]";   // tamaño del logo (puedes subirlo sin mover nada)
  const LOGO_H = "h-[90px] md:h-[110px]";    // alto del logo (puedes subirlo sin mover nada)
  const LOGO_ZOOM = "scale-[1.20] md:scale-[1.25]"; // “recorta” padding del PNG (zoom visual)

  return (
    <footer className="bg-[#0b2a4d] text-white">
      {/* Línea superior (acento corporativo) */}
      <div className="h-[3px] bg-[#ffcd00]" />

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Izquierda: LOGO + redes */}
          <div>
            {/* ✅ Logo LIBRE (no empuja nada) */}
            <div className="relative">
              {/* Espacio reservado fijo: mantiene el layout estable */}
              <div className={LOGO_BOX_H} />

              {/* Logo absoluto: puedes agrandarlo sin mover redes ni columnas */}
              <div className="absolute left-0 top-0 z-0 pointer-events-none">
                {/* Caja que “corta” el padding visual del PNG */}
                <div className={`relative ${LOGO_W} ${LOGO_H} overflow-hidden`}>
                  <Image
                    src="/assets/Logs/eqwhite_bg.png"
                    alt="Equielect"
                    fill
                    className={[
                      "object-contain object-left",
                      "origin-left",
                      LOGO_ZOOM, // 👈 zoom para quitar padding “visual”
                    ].join(" ")}
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Redes debajo del logo (NO se mueven aunque agrandes el logo) */}
            <div className="mt-4 flex items-center gap-3 relative z-10">
              <SocialIcon href="https://instagram.com/" label="Instagram">
                <Instagram className="w-4 h-4" />
              </SocialIcon>

              <SocialIcon href="https://linkedin.com/" label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </SocialIcon>

              <SocialIcon href="https://facebook.com/" label="Facebook">
                <Facebook className="w-4 h-4" />
              </SocialIcon>
            </div>

            {/* Mensajito corto */}
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-white/75">
              <span className="w-2 h-2 bg-[#ffcd00]" />
              Suministros eléctricos • Telecom • Iluminación
            </div>
          </div>

          {/* Centro: links (pocos) */}
          <div>
            <h4 className="text-sm font-bold tracking-wide">Atención</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <FooterLink href="/contactanos" label="Contacto" />
              <FooterLink
                href="/preguntas-frecuentes"
                label="Preguntas frecuentes"
              />
              <FooterLink href="/envios" label="Envíos" />
              <FooterLink href="/garantias" label="Garantías y devoluciones" />
            </ul>
          </div>

          {/* Derecha: contacto */}
          <div>
            <h4 className="text-sm font-bold tracking-wide">Contacto</h4>

            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-white/60" />
                <span>Medellín, Colombia</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-white/60" />
                <a className="hover:text-white" href="tel:+573001112233">
                  +57 300 111 2233
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-white/60" />
                <a
                  className="hover:text-white"
                  href="mailto:soporte@equielect.com"
                >
                  soporte@equielect.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-white/60" />
                <span>Lun–Vie 8:00–5:30 | Sáb 8:00–12:00</span>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-white/60">
              Te atiende un asesor (horario laboral).
            </div>

            {/* (Opcional) WhatsApp */}
            {/* 
            <a href={whatsappLink} target="_blank" rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center bg-[#ffcd00] text-[#0b2a4d] font-extrabold px-4 py-2"
              style={{ borderRadius: 2 }}>
              WhatsApp asesor
            </a> 
            */}
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR LEGAL */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-xs text-white/60">
            © {year} Equielect S.A.S. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
            <Link className="hover:text-white" href="/terminos-y-condiciones">
              Privacidad
            </Link>
            <Link className="hover:text-white" href="/terminos-y-condiciones">
              Términos
            </Link>
            <Link className="hover:text-white" href="/cookies">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <li>
      <Link href={href} className="hover:text-white">
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="w-9 h-9 border border-white/10 bg-white/5 grid place-items-center hover:bg-white/10"
      style={{ borderRadius: 2 }}
    >
      {children}
    </a>
  );
}