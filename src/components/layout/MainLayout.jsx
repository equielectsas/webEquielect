"use client";

import React from "react";

import Breadcrumb from "@/components/utils/Breadcrumb/Breadcrumb";
import MainMenu from "@/components/utils/Modals/MainMenu/MainMenu";
import Overlay from "@/components/utils/Modals/Overlay";
import FooterWithSocialLinks from "@/components/layout/Footer/Footer";

// ✅ Header
import Header from "@/components/layout/Header/Header.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Overlay />
      <MainMenu />

      {/* ✅ HEADER sin carrito/cuenta/favoritos */}
      <Header />

      <Breadcrumb />

      <main className="min-h-screen">{children}</main>

      <FooterWithSocialLinks />
    </div>
  );
};

export default MainLayout;
