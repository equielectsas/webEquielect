"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import APIproducts from "@/services/products.services";
import SkeletonLoader from "@/components/utils/Loading/SkeletonLoader";

export default function BrandPage({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const brand = brands.find((b) => b.slug === params.slug);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await APIproducts.getProducts();
        const dataArray = Array.isArray(response) ? response : (response.products || response.data || []);
        setProducts(dataArray); 
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  if (!brand) return notFound();

  return (
    <main className="bg-white min-h-screen">
      {/* 1. BANNER LIMPIO A RAS DE BORDE */}
      <section className="w-full">
        <div className="relative w-full overflow-hidden aspect-[1212/250] bg-gray-50">
          <picture>
            <source media="(min-width: 1024px)" srcSet={brand.images.desktop} />
            <img
              src={brand.images.mobile}
              alt={`Banner ${brand.name}`}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </picture>
        </div>
      </section>

      {/* 2. INFO DE MARCA (Sin botones, estilo Centelsa) */}
      <section className="max-w-[1212px] mx-auto px-4 pt-12 pb-6 text-center">
        {/* Logo Centrado */}
        <div className="flex justify-center mb-8">
          <img 
            src={brand.logoPath} 
            alt={brand.name} 
            className="h-20 w-auto object-contain" 
          />
        </div>
        
        {/* Descripción de la Marca */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            {brand.description}
          </p>
        </div>

        {/* Título de Sección Productos */}
        <h2 className="text-5xl font-black text-black uppercase tracking-tight mb-12">
          Productos
        </h2>
      </section>

      {/* 3. CATÁLOGO DE PRODUCTOS (5 Columnas) */}
      <section className="max-w-[1212px] mx-auto px-4 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => <SkeletonLoader key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white border border-gray-100 flex flex-col p-4 shadow-sm hover:shadow-md transition-shadow group">
                {/* Header de la Card: REF y Stock */}
                <div className="flex flex-col mb-4">
                  <span className="text-[10px] font-bold text-white bg-[#1e293b] px-2 py-0.5 w-fit">
                    REF: {product.reference || 'STD'}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                    Stock Disponible
                  </span>
                </div>

                {/* Imagen del Producto */}
                <div className="aspect-square w-full flex items-center justify-center mb-6">
                  <img 
                    src={product.images?.[0] || '/placeholder.png'} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Detalles del Producto */}
                <div className="flex flex-col flex-grow text-left">
                  <span className="text-[11px] font-black text-blue-500 uppercase italic">
                    {product.brand || brand.name}
                  </span>
                  <h3 className="text-[13px] font-bold text-gray-800 leading-snug mt-1 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Beneficios / Trust Badges */}
                  <div className="mt-6 space-y-2 border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-[9px] text-blue-500">✓</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">Certificación de calidad</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-xs">🚚</span>
                      <span className="text-[10px] font-medium">Despacho nacional</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-xs">🏢</span>
                      <span className="text-[10px] font-medium">Recogida en sede</span>
                    </div>
                  </div>
                </div>

                {/* Botón Detalles */}
                <Link 
                  href={`/productos/${product._id}`}
                  className="mt-6 bg-[#005cb9] text-white text-[11px] font-black uppercase py-3 text-center flex items-center justify-center gap-2 hover:bg-[#004a96] transition-colors"
                >
                  Ver Detalles <span className="text-sm">→</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}