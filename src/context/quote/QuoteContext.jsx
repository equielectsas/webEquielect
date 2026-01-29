"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const QuoteContext = createContext(null);

const STORAGE_KEY = "equielect_quote_items_v1";

export function QuoteProvider({ children }) {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  // cargar desde localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // guardar en localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, mounted]);

  const addItem = (product) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          code: product.code || product.sku || "",
          brand: product.brand || "",
          qty: 1,
        },
      ];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const setQty = (id, qty) => {
    const safe = Math.max(1, Number(qty || 1));
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: safe } : p)));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((acc, p) => acc + (p.qty || 1), 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQty, clear, count }),
    [items, count]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote debe usarse dentro de <QuoteProvider />");
  return ctx;
};
