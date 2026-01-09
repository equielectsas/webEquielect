"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock, Instagram, Linkedin, Facebook } from "lucide-react";

export default function FooterEcommerce() {
  const year = new Date().getFullYear();

  // ✅ WhatsApp asesores (cambia el número si es otro)
  const whatsappPhone = "573001112233";
  const whatsappMsg = "Hola, quiero cotizar con un asesor de Equielect.";
  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  return (
    <footer className="bg-[#0b2a4d] text-white">
      {/* Línea superior (acento corporativo) */}
      <div className="h-[3px] bg-[#ffcd00]" />

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Izquierda: LOGO + redes */}
          <div>
            {/* Logo */}
            <div className="relative w-[220px] max-w-full h-[52px]">
              <Image
                src="/assets/Logs/eqwhite_bg.png"
                alt="Equielect"
                fill
                className="object-contain object-left"
                priority={false}
              />
            </div>

            {/* Redes debajo del logo */}
            <div className="mt-5 flex items-center gap-3">
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

            {/* Mensajito corto (opcional y sin cansar) */}
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-white/75">
              <span className="w-2 h-2 bg-[#ffcd00]" />
              Suministros eléctricos • Telecom • Iluminación
            </div>
          </div>

          {/* Centro: links (pocos) */}
          <div>
            <h4 className="text-sm font-bold tracking-wide">Atención</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <FooterLink href="/contacto" label="Contacto" />
              <FooterLink href="/preguntas-frecuentes" label="Preguntas frecuentes" />
              <FooterLink href="/envios" label="Envíos" />
              <FooterLink href="/garantias" label="Garantías y devoluciones" />
            </ul>
          </div>

          {/* Derecha: contacto + CTA */}
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
                <a className="hover:text-white" href="mailto:soporte@equielect.com">
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
            <Link className="hover:text-white" href="/politica-privacidad">
              Privacidad
            </Link>
            <Link className="hover:text-white" href="/terminos">
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
