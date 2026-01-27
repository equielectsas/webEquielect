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
      {/* 1. BANNER A RAS DEL SITIO (W-FULL) SIN TEXTO */}
      <section className="w-full">
        <div className="relative w-full overflow-hidden aspect-[1212/250] bg-gray-100">
          <picture>
            <source media="(min-width: 1024px)" srcSet={brand.images.desktop} />
            <img
              src={brand.images.mobile}
              alt={`Banner ${brand.name}`}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </picture>
          {/* Se eliminó el gradiente y el texto para que la imagen luzca limpia como en image_2f2c80.jpg */}
        </div>
      </section>

      {/* 2. INFO CENTRAL (Alineada al contenedor del sitio) */}
      <section className="max-w-[1212px] mx-auto px-4 py-10 text-center">
        <div className="flex justify-center mb-6">
          <img src={brand.logoPath} alt={brand.name} className="h-16 w-auto object-contain" />
        </div>
        <p className="max-w-3xl mx-auto text-gray-700 font-medium leading-relaxed">
          {brand.description}
        </p>
        
        {/* Botones de acción centrados */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={`/productos?marca=${brand.slug}`} className="bg-[#ffcd00] text-[#0b2a4d] font-extrabold px-8 py-3 rounded-lg uppercase text-sm shadow-md hover:bg-yellow-400 transition-all">
            Ver productos
          </Link>
          <Link href="/contactanos" className="border border-gray-300 text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-50 text-sm uppercase">
            Cotizar con un asesor
          </Link>
        </div>

        <h2 className="text-4xl font-black text-black mt-12 uppercase tracking-tighter">
          Productos
        </h2>
      </section>

      {/* 3. GRILLA DE PRODUCTOS ESTILO CENTELSA */}
      <section className="max-w-[1212px] mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => <SkeletonLoader key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white border border-gray-100 shadow-sm flex flex-col p-4 group transition-all hover:shadow-lg">
                <div className="flex flex-col mb-2">
                  <span className="text-[9px] font-bold text-white bg-[#0b2a4d] px-2 py-0.5 w-fit">
                    REF: {product.reference || 'N/A'}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">Stock Disponible</span>
                </div>

                <div className="aspect-square w-full flex items-center justify-center p-2 mb-4">
                  <img src={product.images?.[0] || '/placeholder.png'} alt={product.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                </div>

                <div className="flex flex-col flex-grow text-left">
                  <span className="text-[10px] font-black text-blue-600 uppercase italic">
                    {product.brand || brand.name}
                  </span>
                  <h3 className="text-xs font-bold text-gray-800 leading-tight mt-1 line-clamp-2 min-h-[32px]">
                    {product.name}
                  </h3>

                  <div className="mt-4 space-y-2 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-3 h-3 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-[7px] text-blue-500">✓</span>
                      </div>
                      <span className="text-[9px] font-medium">Certificación de calidad garantizada</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-xs">🚚</span>
                      <span className="text-[9px] font-medium">Despacho a nivel nacional</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-xs">🏢</span>
                      <span className="text-[9px] font-medium">Recogida en sede principal</span>
                    </div>
                  </div>
                </div>

                <Link href={`/productos/${product._id}`} className="mt-4 bg-[#005cb9] text-white text-[10px] font-black uppercase py-2.5 text-center flex items-center justify-center gap-2 hover:bg-[#004a96]">
                  Ver Detalles <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}