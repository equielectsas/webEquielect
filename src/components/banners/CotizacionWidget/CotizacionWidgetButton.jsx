"use client";

import { usePathname } from "next/navigation";

//Custom Hooks
import useCotizacion from "@/hooks/useCotizacion";

//Component
import ButtonRounded from "@/components/ui/ButtonRounded";

//BOOTSTRAP
import { BsCardChecklist } from "react-icons/bs";

//ACTIONS
import { ACTIONS } from "@/constants/ACTIONS.js";

const CotizacionWidgetButton = () => {
  const pathname = usePathname();
  const { dispatch } = useCotizacion();
  if (pathname === "/cotizacion") return;

  return (
    <>
      <ButtonRounded
        onClick={() => {
          dispatch({ type: ACTIONS.switchCotizacionState });
        }}
        className="z-10 fixed transition scale duration-500 bg-white shadow-xl bottom-14 right-14 cursor-pointer w-14 h-14 flex items-center justify-center"
      >
        <BsCardChecklist className="text-2xl hover:scale-110 duration-200" />
      </ButtonRounded>
    </>
  );
};

export default CotizacionWidgetButton;
