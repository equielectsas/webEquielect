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
  ShieldCheck,
} from "lucide-react";

export default function FooterEcommerce() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0b2a4d] text-white overflow-hidden">
      {/* Patrón de circuitos (fondo.png) aplicado con sutileza */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `url('/assets/banners/fondo.png')`,
          backgroundSize: '450px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Línea de acento corporativo */}
      <div className="h-[4px] bg-[#ffcd00] relative z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* COLUMNA 1: Identidad y Redes */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative w-[240px] h-[70px]">
              <Image
                src="/assets/Logs/Logo-equielect.png"
                alt="Equielect Logo"
                fill
                className="object-contain object-left scale-110"
              />
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
              Desde 1986, somos el aliado estratégico en suministros eléctricos 
              e ingeniería para la industria, minería y construcción en Colombia.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon href="https://www.linkedin.com/company/equielect/posts/?feedView=all" label="LinkedIn"><Linkedin className="w-5 h-5" /></SocialIcon>
              <SocialIcon href="https://www.instagram.com/equielectsas/" label="Instagram"><Instagram className="w-5 h-5" /></SocialIcon>
              <SocialIcon href="https://www.facebook.com/equielect" label="Facebook"><Facebook className="w-5 h-5" /></SocialIcon>
            </div>
          </div>

          {/* COLUMNA 2: Enlaces rápidos */}
          <div className="md:col-span-3">
            <h4 className="text-[#ffcd00] uppercase tracking-[0.2em] text-[11px] font-black mb-6">
              Servicio al Cliente
            </h4>
            <ul className="space-y-3 text-sm font-light text-white/70">
              <FooterLink href="/contactanos" label="Centro de Contacto" />
              <FooterLink href="/preguntas-frecuentes" label="Preguntas Frecuentes" />
              <FooterLink href="/envios" label="Políticas de Envío" />
              <FooterLink href="/garantias" label="Garantías" />
            </ul>
          </div>

          {/* COLUMNA 3: Datos de Contacto */}
          <div className="md:col-span-4">
            <h4 className="text-[#ffcd00] uppercase tracking-[0.2em] text-[11px] font-black mb-6">
              Sede Principal
            </h4>
            <div className="space-y-4 text-sm text-white/70">
              <ContactItem icon={<MapPin className="w-4 h-4" />}>
                Medellín, Antioquia - Colombia
              </ContactItem>
              <ContactItem icon={<Phone className="w-4 h-4" />}>
                <a
                  href="https://api.whatsapp.com/send/?phone=573146453033"
                  className="hover:underline underline-offset-4"
                >
                  +57 3146453033
                </a>
                <span className="text-slate-400"> - </span>
                <a
                  href="tel: 6044443133"
                  className="hover:underline underline-offset-4"
                >
                  (604) 444 3133
                </a>
              </ContactItem>

              <ContactItem icon={<Mail className="w-4 h-4" />}>
                equielect@equielect.com
              </ContactItem>
              <ContactItem icon={<Clock className="w-4 h-4" />}>
                Lun–Vie 7:00–5:45 | Sáb 8:00–12:00
              </ContactItem>
            </div>
            
            {/* Certificación sutil */}
            <div className="mt-8 flex items-center gap-3 text-white/40">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-widest font-bold">
                Cumplimiento Normativo RETIE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE CIERRE LEGAL */}
      <div className="bg-[#081f3a] py-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/30 font-medium tracking-wider uppercase text-center md:text-left">
            © {year} EQUIELECT S.A.S. | NIT: 890.940.672-1 | Ingeniería que Conecta
          </p>
          <div className="flex gap-6 text-[10px] text-white/30 uppercase font-bold tracking-tighter">
            <Link className="hover:text-white transition-colors" href="#">Privacidad</Link>
            <Link className="hover:text-white transition-colors" href="#">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componentes internos limpios
function FooterLink({ href, label }) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors flex items-center gap-2 group">
        <span className="w-0 h-[1px] bg-[#ffcd00] group-hover:w-3 transition-all" />
        {label}
      </Link>
    </li>
  );
}

function ContactItem({ icon, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-[#ffcd00]/50">{icon}</div>
      <span className="font-light">{children}</span>
    </div>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="w-9 h-9 border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#ffcd00] hover:text-[#0b2a4d] transition-all duration-300"
    >
      {children}
    </a>
  );
}