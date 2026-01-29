"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ClipboardList } from "lucide-react";
import { useQuote } from "@/context/Quote/QuoteContext";
import QuoteDrawer from "@/components/Quote/QuoteDrawer";

export default function QuoteWidget({ hidden = false }) {
  const { count } = useQuote();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || hidden) return null;

  return createPortal(
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 bottom-6 z-[9998] flex items-center gap-2 rounded-full shadow-lg px-4 py-3 bg-equielect-blue text-white hover:opacity-95"
        aria-label="Abrir cotización"
      >
        <ClipboardList size={18} />
        <span className="font-bold text-sm">Cotizar</span>

        {count > 0 && (
          <span className="ml-1 bg-yellow-400 text-black font-extrabold text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </button>

      <QuoteDrawer open={open} onClose={() => setOpen(false)} />
    </>,
    document.body
  );
}
