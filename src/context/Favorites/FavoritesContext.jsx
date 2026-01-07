"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

// ✅ Cookie con SOLO IDs (por límite 4KB)
const COOKIE_KEY = "eq_fav_ids_v1";
const COOKIE_DAYS = 90;

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift() || "";
  return "";
}

function setCookie(name, value, days = 90) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function loadIdsFromCookie() {
  try {
    const raw = decodeURIComponent(getCookie(COOKIE_KEY) || "");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveIdsToCookie(ids) {
  try {
    setCookie(COOKIE_KEY, JSON.stringify(ids), COOKIE_DAYS);
  } catch {}
}

export function FavoritesProvider({ children, isLoggedIn = false }) {
  const [ids, setIds] = useState([]);

  // Load (cookie)
  useEffect(() => {
    setIds(loadIdsFromCookie());
  }, []);

  // Save (cookie)
  useEffect(() => {
    saveIdsToCookie(ids);
  }, [ids]);

  // ✅ Opcional: si estás logueado, sincroniza con tu backend
  // (para que no se pierdan y funcionen en otra sesión/dispositivo)
  useEffect(() => {
    if (!isLoggedIn) return;

    // Si NO tienes backend aún, puedes borrar este bloque sin problema.
    (async () => {
      try {
        const res = await fetch("/api/favorites/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });

        if (!res.ok) return;

        const data = await res.json();
        // backend te devuelve lista final (merged)
        if (Array.isArray(data?.ids)) setIds(data.ids);
      } catch (_) {}
    })();
  }, [isLoggedIn]); // cuando cambia login

  const api = useMemo(() => {
    const has = (id) => ids.includes(String(id));

    const add = (id) => {
      const k = String(id);
      setIds((prev) => (prev.includes(k) ? prev : [k, ...prev]));
    };

    const remove = (id) => {
      const k = String(id);
      setIds((prev) => prev.filter((x) => x !== k));
    };

    const toggle = (id) => {
      const k = String(id);
      setIds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [k, ...prev]));
    };

    const clear = () => setIds([]);

    return {
      ids,
      count: ids.length,
      has,
      add,
      remove,
      toggle,
      clear,
    };
  }, [ids]);

  return <FavoritesContext.Provider value={api}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}
