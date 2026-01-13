"use client";
import useTheme from "@/hooks/useTheme";
import useProduct from "@/hooks/useProduct";
import { ACTIONS } from "@/constants/ACTIONS.js";

const Overlay = () => {
  const { state, dispatch } = useTheme();
  const { state: stateProduct, dispatch: dispatchProduct } = useProduct();;

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
      stateProduct.areFiltersAvailable &&
    Overlay)
  );
};

export default Overlay;
