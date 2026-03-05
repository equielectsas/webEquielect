"use client";

import React from "react";
import Reveal from "@/components/ui/reveal";
import FeaturedBrandProducts from "@/components/home/FeaturedBrandsProducts.jsx";

export default function HomeFeaturedProductsSection() {
  return (
    <Reveal delay={120}>
      <section className="bg-white pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-equielect-blue">
              Producto destacados por marca
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Selección rápida para comprar con soporte y garantía.
            </p>
          </div>
          <div className="mt-5">
            <FeaturedBrandProducts />
          </div>
        </div>
      </section>
    </Reveal>
  );
}