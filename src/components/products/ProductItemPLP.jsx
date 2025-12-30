import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState } from "react";

const ProductItemPLP = ({ product }) => {
  const { name, reference, brand, images, createdAt } = product;
  const [isHovered, setIsHovered] = useState(false);

  const isNew = new Date() - new Date(createdAt) < 30 * 24 * 60 * 60 * 1000;

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-2 w-full max-w-[300px] flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/productos/${product._id}`} className="block">
        <div className="relative">
          <div className="w-full aspect-square flex items-center justify-center p-4 bg-gray-50 relative">
            <Image
              src={images[0]}
              width={200}
              height={200}
              alt={name || "Product image"}
              className={`object-contain transition-transform duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          </div>

          <div className="absolute top-2 left-2 flex gap-2">
            {isNew && (
              <span className="bg-blue-300 text-white text-xs px-2 py-1 rounded">
                Nuevo
              </span>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <p className="text-sm text-gray-500 truncate max-w-[200px]">
            {reference}
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 truncate max-w-[140px]">
              {brand}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#52abff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 truncate text-base mt-1">
            {name}
          </h3>
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto">
        <Link href={`/productos/${product._id}`}>
          <Button className="bg-[#FFCD00] text-white border-[#FFCD00] text-sm w-full text-center p-2 duration-200 md:bg-transparent md:text-[#343434] md:border-[#343434] md:border-[1px] md:p3 md:hover:bg-[#FFCD00] md:hover:border-transparent">
            Ver producto
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItemPLP;