"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && pass.trim().length > 2;
  }, [email, pass]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    // 👇 Ejemplo: aquí luego conectas tu auth (NextAuth / API / etc.)
    alert(`Login demo:\nEmail: ${email}\nPass: ${"*".repeat(pass.length)}`);
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal */}
      <div className="relative w-full h-full flex items-center justify-center px-3 sm:px-6">
        <div
          className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden"
          style={{ borderRadius: 12 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 grid place-items-center"
                style={{ borderRadius: 10, background: "rgba(28,53,94,.08)" }}
              >
                {/* mini icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.1-8 4.7V20h16v-1.3c0-2.6-3.6-4.7-8-4.7Z"
                    fill="rgba(28,53,94,.9)"
                  />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-equielect-blue font-extrabold text-base sm:text-lg">
                  Inicia sesión
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Accede a tu cuenta Equielect
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="h-9 w-9 grid place-items-center hover:bg-black/5 active:bg-black/10"
              style={{ borderRadius: 10 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6 6 18M6 6l12 12"
                  stroke="rgba(0,0,0,.65)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Login */}
            <div className="p-5 sm:p-7">
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Ingresa tu correo
                  </label>
                  <div className="mt-2 relative">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Ej. nombre@correo.com"
                      className="w-full h-11 px-3 pr-11 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1c355e]/25"
                      style={{ borderRadius: 8 }}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 6h16v12H4V6Z"
                          stroke="rgba(28,53,94,.8)"
                          strokeWidth="2"
                        />
                        <path
                          d="m4 7 8 6 8-6"
                          stroke="rgba(28,53,94,.8)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Contraseña
                  </label>
                  <div className="mt-2 relative">
                    <input
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••••"
                      className="w-full h-11 px-3 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1c355e]/25"
                      style={{ borderRadius: 8 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-10 grid place-items-center hover:bg-black/5"
                      style={{ borderRadius: 8 }}
                      aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPass ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 3l18 18"
                            stroke="rgba(28,53,94,.8)"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"
                            stroke="rgba(28,53,94,.8)"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.7 6.7C4.6 8.1 3.1 10 2 12c2.4 4.3 6 7 10 7 1.7 0 3.3-.4 4.8-1.2"
                            stroke="rgba(28,53,94,.8)"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9.2 4.4A9.6 9.6 0 0 1 12 4c4 0 7.6 2.7 10 8-1 1.8-2.3 3.3-3.7 4.4"
                            stroke="rgba(28,53,94,.8)"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M2 12c2.5-4.5 6.1-8 10-8s7.5 3.5 10 8c-2.5 4.5-6.1 8-10 8s-7.5-3.5-10-8Z"
                            stroke="rgba(28,53,94,.8)"
                            strokeWidth="2.3"
                          />
                          <path
                            d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                            stroke="rgba(28,53,94,.8)"
                            strokeWidth="2.3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    className="mt-2 text-sm font-semibold text-equielect-blue hover:underline underline-offset-4"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full h-11 font-extrabold transition ${
                    canSubmit ? "hover:opacity-95 active:opacity-90" : "opacity-45 cursor-not-allowed"
                  }`}
                  style={{
                    borderRadius: 8,
                    background: canSubmit ? "var(--color-equielect-yellow)" : "#e5e7eb",
                    color: canSubmit ? "#000" : "#6b7280",
                  }}
                >
                  Iniciar sesión
                </button>

                {/* Otras opciones */}
                <div className="pt-2">
                  <p className="text-sm font-semibold text-gray-800">Otras opciones</p>
                  <div className="mt-2 flex flex-col gap-2 text-sm">
                    <button
                      type="button"
                      className="text-equielect-blue font-semibold hover:underline underline-offset-4 text-left"
                    >
                      Seguimiento de compras
                    </button>
                    <button
                      type="button"
                      className="text-equielect-blue font-semibold hover:underline underline-offset-4 text-left"
                    >
                      Inicio sesión empresa
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Create account */}
            <div className="p-5 sm:p-7 border-t md:border-t-0 md:border-l border-gray-200 bg-[#f8fafc]">
              <h3 className="text-lg sm:text-xl font-extrabold text-equielect-blue leading-tight">
                Crea tu cuenta, si aún no la tienes
              </h3>

              <p className="mt-2 text-sm text-gray-600 font-medium">
                Vive una experiencia completa de compra:
              </p>

              <ul className="mt-4 space-y-3 text-sm text-gray-700 font-medium">
                {[
                  "Haz seguimiento en línea.",
                  "Revisa tus boletas.",
                  "Guardar tus direcciones de envío.",
                  "Gestiona tu post venta.",
                ].map((txt) => (
                  <li key={txt} className="flex items-start gap-2">
                    <span className="mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="rgba(34,197,94,1)"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="w-full h-11 font-extrabold bg-white hover:bg-white/80 transition"
                  style={{
                    borderRadius: 8,
                    border: "2px solid rgba(28,53,94,.35)",
                    color: "var(--color-equielect-blue)",
                  }}
                >
                  Crear cuenta persona
                </button>

                <button
                  type="button"
                  className="w-full h-11 font-extrabold hover:bg-black/5 transition"
                  style={{
                    borderRadius: 8,
                    border: "1px solid rgba(28,53,94,.18)",
                    color: "var(--color-equielect-blue)",
                    background: "transparent",
                  }}
                >
                  Crear cuenta empresa
                </button>

                <p className="text-xs text-gray-500 font-medium">
                  * Demo visual. Luego conectamos la autenticación real (NextAuth/API).
                </p>
              </div>
            </div>
          </div>

          {/* Footer mini */}
          <div className="px-5 sm:px-7 py-3 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-500">
              Al continuar aceptas términos y políticas de Equielect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
