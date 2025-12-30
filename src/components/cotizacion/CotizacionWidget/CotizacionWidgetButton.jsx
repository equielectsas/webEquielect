"use client";

import { usePathname } from "next/navigation";

// Custom Hooks
import useCotizacion from "@/hooks/useCotizacion";

// Component
import ButtonRounded from "@/components/ui/ButtonRounded";

// BOOTSTRAP
import { BsCardChecklist } from "react-icons/bs";

// ACTIONS
import { ACTIONS } from "@/constants/ACTIONS.js";

const CotizacionWidgetButton = () => {
  const pathname = usePathname();
  const { state, dispatch } = useCotizacion();

  if (pathname === "/cotizacion") return null;

  const hasProducts = state.cotizacionProducts.length > 0;

  return (
    <>
      <ButtonRounded
        onClick={() => {
          dispatch({ type: ACTIONS.switchCotizacionState });
        }}
        className="z-[2] fixed transition scale duration-500 bg-white shadow-md bottom-8 right-8 cursor-pointer w-11 h-11 flex items-center justify-center md:bottom-14 md:right-14 md:w-14 md:h-14"
      >
        <BsCardChecklist className="text-xl hover:scale-110 duration-200 md:text-2xl" />
        {hasProducts && (
          <span className="absolute flex items-center justify-center bottom-8 right-7 text-xs md:text-sm bg-black text-white rounded-full w-5 h-5 md:w-5 md:h-5 md:bottom-10 md:right-9">
            {state.cotizacionProducts.length}
          </span>
        )}
      </ButtonRounded>
    </>
  );
};

export default CotizacionWidgetButton;
