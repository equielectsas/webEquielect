"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Counter from "@/components/utils/Counter/Counter";
import { ACTIONS } from "@/constants/ACTIONS";

const ProductItem = ({ product, hideCounterAndDelete = false }) => {
  const { name, brand, reference, quantity, color, model, images, _id } = product;
  const [quantityState, setQuantityState] = useState(quantity);

  const handleQuantityChange = (quantity) => {
    dispatch({
      type: ACTIONS.addProductToCotizacion,
      payload: { ...product, quantity },
    });
    setQuantityState(quantity);
  };

  const handleDelete = () => {
    dispatch({
      type: ACTIONS.removeProductFromCotizacion,
      payload: { _id },
    });
  };

  return (
    <div className={`group ${hideCounterAndDelete ? 'flex flex-col border border-gray-200 p-4 shadow-sm transition-all hover:shadow-md rounded-lg h-full' : 'mt-4 flex flex-col border border-gray-600 p-4 shadow-sm transition-all hover:shadow-md'}`}>
      <div className={`flex flex-col gap-4 ${hideCounterAndDelete ? 'h-full' : 'md:flex-row md:items-center'}`}>
        <div className={`relative ${hideCounterAndDelete ? 'w-full aspect-square' : 'w-full md:w-1/4'}`}>
          <Link href={`/productos/${product._id}`} className="block">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={images[0]}
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority={true}
              />
            </div>
          </Link>
        </div>

        <div className={`flex flex-1 flex-col gap-3 ${hideCounterAndDelete ? '' : 'md:px-4'}`}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">{brand}</span>
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
            <p className="mt-1 text-sm text-gray-600">Ref: {reference}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {color && (
              <div>
                <span className="font-medium">Color:</span> {color}
              </div>
            )}
            {model && (
              <div>
                <span className="font-medium">Modelo:</span> {model}
              </div>
            )}
          </div>

          {!hideCounterAndDelete && (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Cantidad:
                </span>
                <div className="w-32">
                  <Counter
                    quantity={quantityState}
                    onModifyQuantity={handleQuantityChange}
                  />
                </div>
              </div>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <BsFillTrashFill className="text-base" />
                <span>Eliminar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;