"use client";

import React, { useState } from "react";

import Breadcrumb from "@/components/utils/Breadcrumb/Breadcrumb";
import MainMenu from "@/components/utils/Modals/MainMenu/MainMenu";
import Overlay from "@/components/utils/Modals/Overlay";
import FooterWithSocialLinks from "@/components/layout/Footer/Footer";


// ✅ Header
import Header from "@/components/layout/Header/Header.jsx";

// ✅ Widget flotante del carrito (AJUSTA esta ruta a donde lo tengas)


const MainLayout = ({ children }) => {
  // ✅ Estado único del carrito (lo comparte Header + Widget)
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="main-layout">
      <Overlay />
      <MainMenu />

      {/* ✅ HEADER (abre/cierra el drawer con props) */}
      <Header
        isCartOpen={isCartOpen}
        onOpenCart={() => setIsCartOpen(true)}
        onCloseCart={() => setIsCartOpen(false)}
      />

      <Breadcrumb />

      <main className="min-h-screen">{children}</main>

      <FooterWithSocialLinks />

      {/* ✅ Widget flotante del carrito:
          - Se OCULTA automáticamente cuando el carrito está abierto
          - Queda encima del chatbot si lo posicionas abajo a la derecha con offset*/}
          
        </div>

  );
};

export default MainLayout;
