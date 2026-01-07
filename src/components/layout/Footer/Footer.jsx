"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock, CreditCard, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

export default function FooterEcommerce() {
  return (
    <footer className="bg-[#0b1220] text-white">
      {/* TOP: Newsletter + confianza */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">
              Recibe ofertas y novedades
            </h3>
            <p className="mt-2 text-white/70 text-sm">
              Suscríbete y te enviamos promociones, lanzamientos y disponibilidad de stock.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1">
                <label className="sr-only">Email</label>
                <input
                  type="email"
                  placeholder="Tu correo"
                  className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl px-5 py-3 bg-[#ffcd00] text-[#1c355e] font-extrabold text-sm hover:opacity-90"
              >
                Suscribirme
              </button>
            </form>

            <p className="mt-3 text-xs text-white/55">
              Al suscribirte aceptas recibir comunicaciones comerciales. Puedes darte de baja cuando quieras.
            </p>
          </div>

          {/* Confianza */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <TrustItem icon={<Truck className="w-5 h-5" />} title="Envíos" desc="A todo Colombia" />
            <TrustItem icon={<ShieldCheck className="w-5 h-5" />} title="Garantía" desc="Respaldo" />
            <TrustItem icon={<RefreshCcw className="w-5 h-5" />} title="Devolución" desc="Políticas claras" />
            <TrustItem icon={<CreditCard className="w-5 h-5" />} title="Pagos" desc="Medios seguros" />
          </div>
        </div>
      </div>

      {/* MID: columnas */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3">
            {/* Si tienes logo, úsalo */}
            <div className="w-11 h-11 rounded-xl bg-white/10 grid place-items-center overflow-hidden">
              {/* Ejemplo: /assets/logo.png */}
              {/* <Image src="/assets/logo.png" alt="Equielect" width={44} height={44} /> */}
              <span className="font-black text-[#ffcd00]">E</span>
            </div>
            <div>
              <div className="font-extrabold text-lg">Equielect</div>
              <div className="text-xs text-white/60">Ecommerce • Industrial</div>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Compra productos eléctricos, telecomunicaciones e iluminación con respaldo,
            disponibilidad y atención rápida.
          </p>

          {/* Métodos de pago (puedes poner logos reales) */}
          <div className="mt-5">
            <div className="text-xs font-semibold text-white/70 mb-2">Medios de pago</div>
            <div className="flex flex-wrap gap-2">
              {["VISA", "Mastercard", "PSE", "Nequi"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Comprar */}
        <div>
          <h4 className="font-bold text-sm tracking-wide text-white/90">Comprar</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <FooterLink href="/productos" label="Productos" />
            <FooterLink href="/marcas" label="Marcas" />
            <FooterLink href="/categoria/telecomunicaciones" label="Telecomunicaciones" />
            <FooterLink href="/categoria/iluminacion" label="Iluminación" />
            <FooterLink href="/categoria/cableado" label="Cableado" />
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h4 className="font-bold text-sm tracking-wide text-white/90">Ayuda</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <FooterLink href="/preguntas-frecuentes" label="Preguntas frecuentes" />
            <FooterLink href="/envios" label="Envíos y entregas" />
            <FooterLink href="/garantias" label="Garantías y devoluciones" />
            <FooterLink href="/contacto" label="Contacto" />
            <FooterLink href="/terminos" label="Términos y condiciones" />
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-bold text-sm tracking-wide text-white/90">Contacto</h4>

          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-white/60" />
              <div>Medellín, Colombia</div>
            </div>

            <div className="flex gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-white/60" />
              <a className="hover:text-white" href="tel:+573001112233">
                +57 300 111 2233
              </a>
            </div>

            <div className="flex gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-white/60" />
              <a className="hover:text-white" href="mailto:soporte@equielect.com">
                soporte@equielect.com
              </a>
            </div>

            <div className="flex gap-3">
              <Clock className="w-4 h-4 mt-0.5 text-white/60" />
              <div>Lun–Vie 8:00–5:30 | Sáb 8:00–12:00</div>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <a
            href="https://wa.me/573001112233?text=Hola%2C%20necesito%20ayuda%20con%20mi%20compra%20en%20Equielect."
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-[#25D366] text-black font-extrabold py-3 text-sm hover:opacity-90"
          >
            Hablar por WhatsApp
          </a>

          <div className="mt-4 text-xs text-white/55">
            Respuesta promedio: 5–15 min (horario laboral).
          </div>
        </div>
      </div>

      {/* BOTTOM: legales */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} Equielect S.A.S. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
            <Link className="hover:text-white" href="/politica-privacidad">Privacidad</Link>
            <Link className="hover:text-white" href="/terminos">Términos</Link>
            <Link className="hover:text-white" href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <li>
      <Link href={href} className="hover:text-white hover:underline underline-offset-4">
        {label}
      </Link>
    </li>
  );
}

function TrustItem({ icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="text-[#ffcd00]">{icon}</div>
      <div className="mt-2 font-bold text-sm">{title}</div>
      <div className="text-xs text-white/65 mt-1">{desc}</div>
    </div>
  );
}
