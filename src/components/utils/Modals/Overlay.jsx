"use client";
import useTheme from "@/hooks/useTheme";
import useProduct from "@/hooks/useProduct";
import useCotizacion from "@/hooks/useCotizacion";
import { ACTIONS } from "@/constants/ACTIONS.js";

const Overlay = () => {
  const { state, dispatch } = useTheme();
  const { state: stateProduct, dispatch: dispatchProduct } = useProduct();
  const { state: stateCotizacion, dispatch: dispatchCotizacion } =
    useCotizacion();

  const Overlay = (
    <div
      onClick={() => {
        dispatch({ type: ACTIONS.turnOffMenuState });
        dispatchProduct({ type: ACTIONS.turnOffFiltersState });
        dispatchCotizacion({ type: ACTIONS.turnOffCotizacionState });
      }}
      className="fixed top-0 w-full h-full z-20 bg-black/[.54]"
    />
  );

  return (
    (state.isMainMenuAvailable ||
      stateProduct.areFiltersAvailable ||
      stateCotizacion.isCotizacionAvailable) &&
    Overlay
  );
};

export default Overlay;
