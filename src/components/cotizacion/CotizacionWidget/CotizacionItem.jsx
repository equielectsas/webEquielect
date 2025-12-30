"use client";

import useCotizacion from "@/hooks/useCotizacion";
import { BsFillTrashFill } from "react-icons/bs";
import Counter from "@/components/utils/Counter/Counter";
import { ACTIONS } from "@/constants/ACTIONS";
import Image from "next/image";

const CotizacionItem = ({ product }) => {
  const { dispatch } = useCotizacion();

  const handleOnClick = (quantity) => {
    dispatch({
      type: ACTIONS.addProductToCotizacion,
      payload: { ...product, quantity },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: ACTIONS.removeProductFromCotizacion,
      payload: { _id: productId },
    });
  };

  return (
    <div key={product._id} className="flex items-center border-b py-4">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={64}
        height={64}
        className="rounded-md object-cover mr-4"
        priority={true}
      />

      <div className="flex-1">
        <h4 className="text-sm font-semibold">{product.name}</h4>
        <p className="text-gray-600 text-sm">Modelo: {product.model}</p>

        <Counter quantity={product.quantity} onModifyQuantity={handleOnClick} />
      </div>

      <button
        onClick={() => removeFromCart(product._id)}
        className="text-gray-600 px-3 hover:text-gray-800 text-xl text-center"
      >
        <BsFillTrashFill />
      </button>
    </div>
  );
};

export default CotizacionItem;
