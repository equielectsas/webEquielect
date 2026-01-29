"use client";
import { useEffect, useMemo, useState, createContext, useContext } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import APIproducts from "@/services/products.services";
import SkeletonLoader from "@/components/utils/Loading/SkeletonLoader";

/* =========================
   1) CONTEXTO DE COTIZACIÓN
========================= */
const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToQuote = (product) => {
    if (!product?._id) return;
    setItems((prev) => {
      if (prev.find((i) => i._id === product._id)) return prev;
      return [...prev, product];
    });
    setIsOpen(true);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i._id !== id));

  const sendToWhatsApp = () => {
    const phone = "573000000000"; 
    let msg = "Hola Equielect, me gustaría cotizar estos productos:\n\n";
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} (REF: ${item.reference || "N/A"})\n`;
    });
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <QuoteContext.Provider value={{ items, addToQuote, removeItem, isOpen, setIsOpen, sendToWhatsApp }}>
      {children}
    </QuoteContext.Provider>
  );
}

const useQuote = () => useContext(QuoteContext);

/* =========================
   2) SIDEBAR IZQUIERDO
========================= */
function QuoteSidebar() {
  const { items, removeItem, isOpen, setIsOpen, sendToWhatsApp } = useQuote();

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] bg-[#FFCC00] hover:bg-[#e6b800] p-3 rounded-r-xl shadow-xl flex flex-col items-center gap-2 border-y border-r border-yellow-600 transition-all group"
        >
          <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-bold group-hover:scale-110 transition-transform">
            {items.length}
          </span>
          <span className="font-black text-[10px] [writing-mode:vertical-lr] rotate-180 tracking-[0.2em] text-black uppercase">
            Cotización
          </span>
        </button>
      )}

      <div
        className={`fixed inset-0 bg-black/40 z-[110] transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed left-0 top-0 h-full w-full max-w-[320px] bg-white z-[120] shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Mi Lista</h3>
            <button onClick={() => setIsOpen(false)} className="text-3xl text-slate-300 hover:text-red-500">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {items.length === 0 ? (
              <div className="text-center py-20 text-slate-400 text-sm">No hay productos seleccionados.</div>
            ) : (
              items.map((item) => (
                <div key={item._id} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 items-center">
                  <img src={item.images?.[0] || "/placeholder.png"} className="w-12 h-12 object-contain bg-white rounded border border-slate-200" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[9px] text-slate-400 font-mono uppercase">REF: {item.reference || "N/A"}</p>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-600 text-xl font-bold">&times;</button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={sendToWhatsApp}
            disabled={items.length === 0}
            className="w-full mt-6 bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1ebe57] transition-all disabled:opacity-50"
          >
            Ir a Cotizar (WhatsApp)
          </button>
        </div>
      </div>
    </>
  );
}

/* =========================
   3) PÁGINA PRINCIPAL
========================= */
export default function BrandPage({ params }) {
  return (
    <QuoteProvider>
      <BrandContent params={params} />
      <QuoteSidebar />
    </QuoteProvider>
  );
}

function BrandContent({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToQuote } = useQuote();

  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return notFound();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await APIproducts.getProducts();
        const dataArray = Array.isArray(response) ? response : response.products || response.data || [];
        setProducts(dataArray);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const bSlug = (brand.slug || "").toLowerCase().trim();
    const bName = (brand.name || "").toLowerCase().trim();
    return (products || []).filter((p) => {
      const pb = (p.brand || "").toLowerCase().trim();
      return pb.includes(bSlug) || pb.includes(bName);
    });
  }, [products, brand]);

  const featured = useMemo(() => filteredProducts.slice(0, 10), [filteredProducts]);

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      {/* Banner Superior */}
      <section className="w-full">
        <div className="relative w-full overflow-hidden aspect-[1212/250] bg-gray-50">
          <picture>
            <source media="(min-width: 1024px)" srcSet={brand.images.desktop} />
            <img src={brand.images.mobile} alt={`Banner ${brand.name}`} className="w-full h-full object-cover" loading="eager" />
          </picture>
        </div>
      </section>

      <section className="max-w-[1212px] mx-auto px-4 pt-12">
        {/* Logo y Descripción */}
        <div className="flex flex-col items-center mb-16 text-center">
          <img src={brand.logoPath} alt={brand.name} className="h-20 w-auto object-contain mb-8" />
          <p className="max-w-4xl text-gray-700 text-lg leading-relaxed font-medium">{brand.description}</p>
        </div>

        {/* ✅ CARDS MANUALES (Líneas Destacadas) */}
        {(brand.featuredCards?.length ?? 0) > 0 && (
          <div className="max-w-6xl mx-auto mb-24">
            <h2 className="text-xl font-bold text-black mb-10 text-center uppercase tracking-[0.2em]">Líneas Destacadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {brand.featuredCards.slice(0, 3).map((c, idx) => (
                <div key={idx} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden rounded-xl">
                  <div className="h-64 flex items-center justify-center bg-gray-50 p-8 overflow-hidden">
                    <img src={c.img} alt={c.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 text-center border-t border-gray-50">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#005cb9] mb-3">{c.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ GRID DINÁMICO DE PRODUCTOS */}
        <div className="mb-10 flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Catálogo {brand.name}</h2>
            <div className="hidden md:block h-1 w-20 bg-[#005cb9]"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => <SkeletonLoader key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
            {featured.map((product) => (
              <div key={product._id} className="bg-white border border-slate-200 flex flex-col p-4 shadow-sm hover:shadow-md transition-all group rounded-sm">
                <div className="mb-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">REF: {product.reference || "CONSULTAR"}</span>
                </div>
                
                <div className="aspect-square w-full flex items-center justify-center mb-6 bg-white overflow-hidden">
                  <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform" />
                </div>

                <div className="flex flex-col flex-grow text-center">
                  <span className="text-[9px] font-black text-[#005cb9] uppercase mb-1">{brand.name}</span>
                  <h3 className="text-[12px] font-bold text-slate-800 leading-tight mb-4 min-h-[32px] line-clamp-2">{product.name}</h3>
                  <div className="mt-auto space-y-2 text-[9px] text-slate-500 mb-5 py-3 border-t border-slate-50">
                    <p className="flex items-center justify-center gap-1">
                      <span className="text-blue-500 font-bold">✓</span> Certificación de calidad
                    </p>
                    <p className="flex items-center justify-center gap-1">
                       <span className="text-slate-400">📦</span> Despacho nacional
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={() => addToQuote(product)} className="bg-[#005cb9] text-white text-[10px] font-bold uppercase py-2.5 rounded-sm hover:bg-blue-800 transition-colors">
                    + Cotizar
                  </button>
                  <Link href={`/productos/${product._id}`} className="text-[9px] text-center font-bold text-slate-400 uppercase py-1.5 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ SECCIÓN INFERIOR: LISTA LIMPIA (SIN CUADRO NI LÍNEAS) */}
        <section className="max-w-4xl mx-auto mt-24 text-left px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 tracking-tight">
            Algunas otras líneas de productos {brand.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Equipos de control y protección para arranque de motor.",
              "Interruptores automáticos industriales.",
              "Variadores de velocidad y arrancadores.",
              "Detección, mando y señalización.",
              "Monitoreo y medidores de energía.",
              "Módulos lógicos programables.",
            ].map((line, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#005cb9] shrink-0" />
                <p className="text-slate-700 text-sm md:text-[15px] font-medium leading-relaxed">{line}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
             <p className="text-slate-900 font-bold text-sm mb-6 uppercase tracking-wider">
               Calidad garantizada y soporte técnico especializado.
             </p>
             <div className="flex gap-3">
                <div className="h-2 w-20 bg-[#005cb9] rounded-full"></div>
                <div className="h-2 w-20 bg-[#FFCC00] rounded-full"></div>
             </div>
          </div>
        </section>
      </section>
    </main>
  );
}