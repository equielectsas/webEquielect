"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductAreasCarousel = ({ areas }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % areas.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + areas.length) % areas.length
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden bg-gray-50 shadow-lg">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {areas.map((area, index) => (
          <div
            key={index}
            className="min-w-full py-6 px-16 flex flex-col md:flex-row items-center"
          >
            <Image
              height={300}
              width={300}
              src={area.image}
              alt={area.title}
              className="w-48 h-48 object-cover shadow-md md:mr-6 md:w-64 md:h-64"
            />
            <div className="text-center md:text-left w-72 md:w-80">
              <h3 className="text-sm font-normal text-gray-700 mt-4 md:text-md">
                {area.title}
              </h3>
              <p className="mt-4 mb-6 text-[#343434] w-full text-sm md:text-md">
                {area.description}
              </p>
              <Link
                href="/productos"
                className="text-sm duration-200 px-4 py-2 bg-transparent text-[#343434] border-[1px] border-[#343434] hover:bg-[#FFCD00] hover:border-transparent"
              >
                Ver productos
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="w-10 h-10 absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-600 p-2 rounded-full hover:bg-gray-100"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="w-10 h-10 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 p-2 rounded-full hover:bg-gray-100"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ProductAreasCarousel;
