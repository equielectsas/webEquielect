"use client";

import useTheme from "@/hooks/useTheme";
import Link from "next/link";

//Components
import NavList from "@/components/layout/Header/NavList";

//Actions
import { ACTIONS } from "@/constants/ACTIONS.js";

const MainMenu = () => {
  const { state, dispatch } = useTheme();

  const { isMainMenuAvailable, navBarOptions } = state;

  const menuClasses = isMainMenuAvailable
    ? "translate-x-0"
    : "translate-x-full";
  
  return (
    <>
      {/* Overlay oscuro cuando el menú está abierto */}
      {isMainMenuAvailable && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {
            dispatch({ type: ACTIONS.turnOffMenuState });
          }}
        />
      )}
      
      {/* Menú lateral */}
      <div
        className={`transition-transform duration-500 transform fixed right-0 top-0 z-50 bg-gray-800 h-full w-[300px] lg:hidden ${menuClasses}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-6 w-6 absolute right-5 top-6 cursor-pointer text-white hover:text-yellow-500 transition-colors"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => {
            dispatch({ type: ACTIONS.switchMenuState });
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        
        <div className="pt-20">
          <NavList navBarOptions={navBarOptions} isDesktop={false} />
          
          <div className="px-6 mt-6">
            <Link
              href="/cotizacion"
              className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold transition-all"
              onClick={() => {
                dispatch({ type: ACTIONS.turnOffMenuState });
              }}
            >
              Cotizar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;