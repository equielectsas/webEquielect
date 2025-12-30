"use client";

import { useEffect, useState } from "react";
import APIproducts from "@/services/products.services";
import ProductItem from "@/components/cotizacion/CotizacionPage/ProductItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ brand, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await APIproducts.getAllProducts({ marca: brand });
        const filteredProducts = data.filter(product => product._id !== currentProductId);
        setProducts(filteredProducts);
      } catch (error) {
        setError(error.message || "Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchProducts();
    }
  }, [brand, currentProductId]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.ceil(products.length / 2) - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === Math.ceil(products.length / 2) - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center">No hay productos de la misma marca.</div>;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: Math.ceil(products.length / 2) }).map((_, groupIndex) => (
            <div key={groupIndex} className="w-full flex-shrink-0 flex gap-4 p-2">
              {products.slice(groupIndex * 2, groupIndex * 2 + 2).map((product) => (
                <div key={product._id} className="w-1/2">
                  <ProductItem product={product} hideCounterAndDelete />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProductCarousel;