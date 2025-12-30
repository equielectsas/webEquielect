"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

import APIproducts from "@/services/products.services";
import ProductItemPLP from "./ProductItemPLP";
import SkeletonLoader from "../utils/Loading/SkeletonLoader";
import ProductGhostPLP from "./ProductGhostPLP";

const formatCOP = (n) =>
  Number(n || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const toInt = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export default function ProductListPLP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ UI estados (vienen desde URL)
  const urlQ = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "Todas";
  const urlBrand = searchParams.get("brand") || "Todas";
  const urlMin = toInt(searchParams.get("min"), 0);
  const urlMax = toInt(searchParams.get("max"), 2000000);
  const urlStock = searchParams.get("stock") === "1";
  const urlSort = searchParams.get("sort") || "relevancia";

  const [q, setQ] = useState(urlQ);
  const [category, setCategory] = useState(urlCategory);
  const [brand, setBrand] = useState(urlBrand);
  const [minPrice, setMinPrice] = useState(urlMin);
  const [maxPrice, setMaxPrice] = useState(urlMax);
  const [onlyStock, setOnlyStock] = useState(urlStock);
  const [sort, setSort] = useState(urlSort);

  const [filtersOpen, setFiltersOpen] = useState(false);

  // ✅ Ajusta esto a tu gusto:
  const MIN_GRID = 12; // mínimo de tarjetas visibles
  const MAX_GHOSTS = 12; // para no llenar infinito

  // ✅ sync (back/forward)
  useEffect(() => {
    setQ(urlQ);
    setCategory(urlCategory);
    setBrand(urlBrand);
    setMinPrice(urlMin);
    setMaxPrice(urlMax);
    setOnlyStock(urlStock);
    setSort(urlSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ✅ fetch productos desde backend usando queryString
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await APIproducts.getAllProducts(queryString);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryString]);

  // ✅ helpers: empujar filtros a URL
  const pushUrl = (next = {}) => {
    const sp = new URLSearchParams(searchParams.toString());

    const setOrDelete = (key, value, emptyValue) => {
      if (value === undefined || value === null || value === emptyValue) sp.delete(key);
      else sp.set(key, String(value));
    };

    setOrDelete("q", next.q ?? q, "");
    setOrDelete("category", next.category ?? category, "Todas");
    setOrDelete("brand", next.brand ?? brand, "Todas");
    setOrDelete("min", next.minPrice ?? minPrice, 0);
    setOrDelete("max", next.maxPrice ?? maxPrice, 2000000);
    setOrDelete("stock", (next.onlyStock ?? onlyStock) ? 1 : "", "");
    setOrDelete("sort", next.sort ?? sort, "relevancia");

    router.replace(`/productos?${sp.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    setQ("");
    setCategory("Todas");
    setBrand("Todas");
    setMinPrice(0);
    setMaxPrice(2000000);
    setOnlyStock(false);
    setSort("relevancia");
    router.replace("/productos", { scroll: false });
  };

  // ✅ opciones prácticas desde lo que llegó
  const categories = useMemo(() => {
    const set = new Set((products || []).map((p) => p.category || p.categoria).filter(Boolean));
    return ["Todas", ...Array.from(set)];
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set((products || []).map((p) => p.brand || p.marca).filter(Boolean));
    return ["Todas", ...Array.from(set)];
  }, [products]);

  // ✅ GHOST COUNT: si hay menos que MIN_GRID, completa
  const ghostCount = useMemo(() => {
    if (loading) return 0;
    const need = Math.max(0, MIN_GRID - (products?.length || 0));
    return Math.min(need, MAX_GHOSTS);
  }, [loading, products]);

  const FiltersPanel = ({ onClose }) => (
    <div className="bg-white border border-gray-200" style={{ borderRadius: 0 }}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <p className="font-extrabold text-equielect-blue">Filtros</p>
        {onClose && (
          <button onClick={onClose} className="text-gray-600 hover:text-black" aria-label="Cerrar">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="p-4 grid gap-4">
        {/* Buscar */}
        <div>
          <p className="text-xs font-bold text-equielect-blue mb-2">BUSCAR</p>
          <div className="flex border border-gray-300" style={{ borderRadius: 0 }}>
            <div className="px-3 flex items-center text-gray-400">
              <Search size={16} />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") pushUrl({ q: e.currentTarget.value });
              }}
              placeholder="Ej: cable, LED, Schneider..."
              className="w-full py-2 pr-3 outline-none text-sm"
            />
          </div>
          <button
            onClick={() => pushUrl({ q })}
            className="mt-2 w-full bg-equielect-yellow py-2 font-bold hover:opacity-90"
            style={{ borderRadius: 0 }}
          >
            Aplicar búsqueda
          </button>
        </div>

        {/* Categoría */}
        <div>
          <p className="text-xs font-bold text-equielect-blue mb-2">CATEGORÍA</p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              pushUrl({ category: e.target.value });
            }}
            className="w-full border border-gray-300 px-3 py-2 text-sm font-semibold text-equielect-blue outline-none bg-white"
            style={{ borderRadius: 0 }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Marca */}
        <div>
          <p className="text-xs font-bold text-equielect-blue mb-2">MARCA</p>
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              pushUrl({ brand: e.target.value });
            }}
            className="w-full border border-gray-300 px-3 py-2 text-sm font-semibold text-equielect-blue outline-none bg-white"
            style={{ borderRadius: 0 }}
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div>
          <p className="text-xs font-bold text-equielect-blue mb-2">PRECIO</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value || 0))}
              className="border border-gray-300 px-3 py-2 text-sm outline-none"
              style={{ borderRadius: 0 }}
              placeholder="Mín"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value || 0))}
              className="border border-gray-300 px-3 py-2 text-sm outline-none"
              style={{ borderRadius: 0 }}
              placeholder="Máx"
            />
          </div>

          <button
            onClick={() => pushUrl({ minPrice, maxPrice })}
            className="mt-2 w-full border border-gray-300 py-2 font-bold hover:bg-gray-50"
            style={{ borderRadius: 0 }}
          >
            Aplicar precio ({formatCOP(minPrice)} – {formatCOP(maxPrice)})
          </button>
        </div>

        {/* Stock */}
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={onlyStock}
            onChange={(e) => {
              setOnlyStock(e.target.checked);
              pushUrl({ onlyStock: e.target.checked });
            }}
          />
          Solo disponibles
        </label>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={clearAll}
            className="border border-gray-300 py-2 font-bold hover:bg-gray-50"
            style={{ borderRadius: 0 }}
          >
            Limpiar
          </button>
          <button
            onClick={() => onClose?.()}
            className="bg-equielect-yellow py-2 font-bold hover:opacity-90"
            style={{ borderRadius: 0 }}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* Header interno PLP */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-equielect-blue">Productos</h1>
              <p className="text-sm text-equielect-gray">
                {loading ? "Cargando…" : `${products.length} resultados`}
              </p>
            </div>

            <button
              className="md:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 font-bold bg-white"
              style={{ borderRadius: 0 }}
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
          </div>

          {/* Ordenar */}
          <div className="mt-3 flex items-center justify-end gap-2">
            <span className="text-xs font-bold text-equielect-blue">ORDENAR:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  pushUrl({ sort: e.target.value });
                }}
                className="border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-equielect-blue outline-none pr-8"
                style={{ borderRadius: 0 }}
              >
                <option value="relevancia">Relevancia</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="name_asc">Nombre: A-Z</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-6">
        {/* sidebar desktop */}
        <div className="hidden md:block">
          <FiltersPanel />
        </div>

        {/* grid */}
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
            {/* ✅ LOADING */}
            {loading &&
              Array(12)
                .fill(0)
                .map((_, index) => <SkeletonLoader key={`sk-${index}`} />)}

            {/* ✅ DATA */}
            {!loading &&
              products.map((product) => <ProductItemPLP key={product._id} product={product} />)}

            {/* ✅ GHOSTS (negros) incluso si products=0 */}
            {!loading &&
              Array.from({ length: ghostCount }).map((_, index) => (
                <ProductGhostPLP key={`gh-${index}`} />
              ))}
          </div>

          {/* ✅ Mensaje si NO hay reales */}
          {!loading && products.length === 0 && (
            <div className="mt-2 text-sm text-gray-600">
              No hay productos reales aún. Mostrando placeholders.
              <button className="ml-2 font-bold text-equielect-blue underline" onClick={clearAll}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* drawer filtros móvil */}
      <div className={`fixed inset-0 z-[999] ${filtersOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${filtersOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setFiltersOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-[320px] bg-white shadow-2xl transition-transform duration-300 ${
            filtersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ borderRadius: 0 }}
        >
          <FiltersPanel onClose={() => setFiltersOpen(false)} />
        </div>
      </div>
    </div>
  );
}
