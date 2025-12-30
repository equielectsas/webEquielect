"use client";

import useCotizacion from "@/hooks/useCotizacion";

//Actions
import { ACTIONS } from "@/constants/ACTIONS.js";

//Components
import CotizacionWidget from "@/components/cotizacion/CotizacionWidget/CotizacionWidget";

const CotizacionWidgetModal = () => {
  const { state, dispatch } = useCotizacion();

  const { isCotizacionAvailable } = state;

  const menuClasses = isCotizacionAvailable
    ? "translate-x-0"
    : "translate-x-[-100%]";
  return (
    <div
      className={`transition-transform duration-500 transform fixed left-0 top-0 z-30 bg-white h-full w-[350px] ${menuClasses}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="h-6 w-6 absolute right-5 top-6 cursor-pointer"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={() => {
          dispatch({ type: ACTIONS.turnOffCotizacionState });
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <div>
        <CotizacionWidget />
      </div>
    </div>
  );
};

export default CotizacionWidgetModal;
