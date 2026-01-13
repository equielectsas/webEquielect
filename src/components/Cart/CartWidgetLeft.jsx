"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/Cart/CartContext";

export default function CartWidgetLeft({ hidden = false }) {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || hidden) return null;

  const openCartFromHeaderButton = () => {
    // 1) Busca el botón real que abre el carrito (el del header)
    const btn = document.querySelector('[data-open-cart="true"]');

    // 2) Si existe, lo clickea (abre el drawer con tu lógica actual)
    if (btn) {
      btn.click();
      return;
    }

    // 3) Fallback por si no existe (opcional)
    window.dispatchEvent(new CustomEvent("ui:cart", { detail: { open: true } }));
  };

  return createPortal(
    <button
      type="button"
      onClick={openCartFromHeaderButton}
      aria-label="Abrir carrito"
      className={[
        "fixed left-6 bottom-6", // ajusta a tu altura del chat
        "z-[9999] h-12 w-12 rounded-full",
        "bg-equielect-yellow border border-equielect-yellow shadow-lg",
        "flex items-center justify-center",
        "hover:shadow-xl active:scale-95 transition",
      ].join(" ")}
    >
      <ShoppingCart className="h-6 w-6 text-black" />

      {cartCount > 0 && (
        <span
          className={[
            "absolute -top-2 -right-2",
            "min-w-6 h-6 px-1 rounded-full",
            "bg-yellow-400 text-black",
            "text-xs font-bold flex items-center justify-center",
            "border border-white",
          ].join(" ")}
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>,
    document.body
  );
}
