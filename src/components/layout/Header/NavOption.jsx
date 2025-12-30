"use client";

import useTheme from "@/hooks/useTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

//ACTIONS
import { ACTIONS } from "@/constants/ACTIONS.js";

const NavOption = ({ name, url, isDesktop = true }) => {
  const { dispatch } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const isHome = pathname === "/";
  const isActive = pathname === url;

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determinar el color del texto según el contexto
  const getTextColor = () => {
    // Para menú móvil, siempre texto blanco (el sidebar es oscuro)
    if (!isDesktop) {
      return "text-white";
    }
    
    // Evitar hidratación incorrecta
    if (!isMounted) {
      return "text-gray-800";
    }
    
    if (isHome && !isScrolled) {
      // En home sin scroll: texto blanco con sombra
      return "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]";
    }
    // En otras páginas o con scroll: texto oscuro
    return "text-gray-800";
  };

  const getHoverColor = () => {
    if (!isDesktop) {
      return "hover:text-yellow-400";
    }
    if (isHome && !isScrolled && isDesktop) {
      return "hover:text-yellow-400";
    }
    return "hover:text-yellow-600";
  };

  const getActiveStyle = () => {
    if (isActive) {
      return "text-yellow-500 font-bold";
    }
    return "";
  };

  return (
    <li>
      <Link
        href={url}
        onClick={() => {
          dispatch({ type: ACTIONS.turnOffMenuState });
        }}
        className={`
          block px-1 text-center font-medium transition-all duration-200
          ${getTextColor()}
          ${getHoverColor()}
          ${getActiveStyle()}
          hover:scale-105
          ${!isDesktop ? 'py-3 px-4 rounded-lg hover:bg-gray-700/50' : ''}
        `}
      >
        {name}
      </Link>
    </li>
  );
};

export default NavOption;