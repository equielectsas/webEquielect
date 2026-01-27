"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Search, SlidersHorizontal, X, RotateCcw, Box, Tag, 
  CircleDollarSign, CheckCircle2, Layers, Zap, Filter
} from "lucide-react";

import APIproducts from "@/services/products.services";
import ProductItemPLP from "./ProductItemPLP";
import SkeletonLoader from "../utils/Loading/SkeletonLoader";
import ProductGhostPLP from "./ProductGhostPLP";

export default function ProductListPLP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // --- States ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Local UI state for the search input (debouncing)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // --- Logic: URL Synchronization ---
  const currentFilters = useMemo(() => ({
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "Todas",
    subCategory: searchParams.get("subCategory") || "Todas",
    brand: searchParams.get("brand") || "Todas",
    min: searchParams.get("min") || "0",
    max: searchParams.get("max") || "5000000",
    stock: searchParams.get("stock") === "1",
    sort: searchParams.get("sort") || "relevancia"
  }), [searchParams]);

  const updateFilters = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "Todas" || value === "" || value === false || value === "0") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset pagination if you have it
    params.delete("page"); 
    router.replace(`/productos?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // --- Data Fetching ---
  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const data = await APIproducts.getAllProducts(searchParams.toString());
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    getItems();
  }, [searchParams]);

  // --- Helpers for Sidebar Data ---
  const lookup = useMemo(() => ({
    categories: ["Todas", ...new Set(products.map(p => p.category || p.categoria).filter(Boolean))],
    subCategories: ["Todas", ...new Set(products.map(p => p.subCategory || p.sub_categoria).filter(Boolean))],
    brands: ["Todas", ...new Set(products.map(p => p.brand || p.marca).filter(Boolean))]
  }), [products]);

  // --- Sub-Components ---
  const FilterGroup = ({ label, icon: Icon, children }) => (
    <div className="space-y-3 pb-6 border-b border-gray-100 last:border-0">
      <h3 className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 tracking-tighter">
        {Icon && <Icon size={14} />} {label}
      </h3>
      {children}
    </div>
  );

  const Sidebar = ({ isMobile, close }) => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-5 border-b flex items-center justify-between lg:bg-gray-50">
        <span className="font-black uppercase text-xs tracking-tight flex items-center gap-2">
          <Filter size={16} className="text-equielect-blue" /> Panel Técnico
        </span>
        {isMobile && <button onClick={close}><X size={20} /></button>}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {/* Search */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Referencia o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && updateFilters({ q: searchTerm })}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-equielect-blue focus:bg-white p-2.5 text-sm font-bold transition-all outline-none"
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={16} />
        </div>

        <FilterGroup label="Categorías" icon={Box}>
          <div className="flex flex-col gap-1">
            {lookup.categories.map(c => (
              <button
                key={c}
                onClick={() => updateFilters({ category: c, subCategory: "Todas" })}
                className={`text-left text-xs p-2 rounded transition-colors ${currentFilters.category === c ? 'bg-equielect-blue text-white font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Sub-Categoría" icon={Layers}>
          <select 
            value={currentFilters.subCategory}
            onChange={(e) => updateFilters({ subCategory: e.target.value })}
            className="w-full border p-2 text-xs font-bold outline-none rounded bg-white"
          >
            {lookup.subCategories.map(sc => <option key={sc} value={sc}>{sc}</option>)}
          </select>
        </FilterGroup>

        <FilterGroup label="Marcas" icon={Tag}>
          <div className="flex flex-wrap gap-2">
            {lookup.brands.map(b => (
              <button
                key={b}
                onClick={() => updateFilters({ brand: b })}
                className={`px-2 py-1 text-[10px] font-bold border rounded transition-all ${currentFilters.brand === b ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
              >
                {b}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Precio Máximo" icon={CircleDollarSign}>
          <input 
            type="range" 
            min="0" 
            max="10000000" 
            step="50000"
            value={currentFilters.max}
            onChange={(e) => updateFilters({ max: e.target.value })}
            className="w-full accent-equielect-blue"
          />
          <div className="flex justify-between text-[10px] font-mono font-bold text-gray-500">
            <span>$0</span>
            <span className="text-equielect-blue">${Number(currentFilters.max).toLocaleString()}</span>
          </div>
        </FilterGroup>

        <button 
          onClick={() => updateFilters({ stock: !currentFilters.stock })}
          className={`w-full p-3 border-2 flex items-center justify-between transition-all ${currentFilters.stock ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Solo en Stock</span>
          <CheckCircle2 size={16} />
        </button>
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <button 
          onClick={() => { setSearchTerm(""); router.replace("/productos"); }}
          className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase border border-gray-300 bg-white hover:bg-gray-100"
        >
          <RotateCcw size={14}/> Resetear Filtros
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar de Control */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-lg uppercase italic tracking-tighter">Inventario <span className="text-equielect-blue">EQ</span></h1>
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />
            <span className="hidden sm:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {loading ? "Sincronizando..." : `${products.length} productos listos`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select 
              value={currentFilters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="text-[11px] font-bold uppercase border-2 border-gray-100 p-1.5 outline-none rounded"
            >
              <option value="relevancia">Relevancia</option>
              <option value="price_asc">Precio: Bajo a Alto</option>
              <option value="price_desc">Precio: Alto a Bajo</option>
            </select>
            <button 
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden p-2 bg-black text-white rounded"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 h-[calc(100vh-64px)] sticky top-16">
          <Sidebar />
        </aside>

        {/* Product Feed */}
        <main className="flex-1 p-4 lg:p-8 bg-gray-50/50 min-h-screen">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {loading ? (
              Array(10).fill(0).map((_, i) => <SkeletonLoader key={i} />)
            ) : (
              <>
                {products.map((p) => <ProductItemPLP key={p._id} product={p} />)}
                {/* Ghost fill to keep grid consistent */}
                {!loading && products.length > 0 && products.length < 10 && 
                  Array.from({ length: 10 - products.length }).map((_, i) => <ProductGhostPLP key={i} />)
                }
              </>
            )}
          </div>

          {!loading && products.length === 0 && (
            <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-white">
              <Zap size={40} className="text-gray-200 mb-4" />
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No hay stock para esta combinación</p>
              <button 
                onClick={() => { setSearchTerm(""); router.replace("/productos"); }}
                className="mt-4 text-equielect-blue font-black underline text-xs"
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[280px] shadow-2xl">
            <Sidebar isMobile close={() => setFiltersOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}