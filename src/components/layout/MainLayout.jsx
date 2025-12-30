"use client";

import Breadcrumb from "@/components/utils/Breadcrumb/Breadcrumb";
import MainMenu from "@/components/utils/Modals/MainMenu/MainMenu";
import Overlay from "@/components/utils/Modals/Overlay";
import FooterWithSocialLinks from "@/components/layout/Footer/Footer";

import CotizacionWidget from "@/components/utils/Modals/CotizacionWidget/CotizacionWidgetModal";
import CotizacionWidgetButton from "@/components/cotizacion/CotizacionWidget/CotizacionWidgetButton";
import WhatsappButton from "@/components/layout/Header/WhatsappButton";

// ✅ IMPORTA AQUÍ TU HEADER NUEVO (ECOMMERCE)
// ⚠️ Cambia esta ruta por la real donde dejaste el nuevo header.
import Header from "@/components/layout/Header/Header.jsx"; 
// Ejemplos si tu header nuevo está en otra carpeta:
// import Header from "@/components/Cart/Header";
// import Header from "@/components/layoutNew/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Overlay />
      <MainMenu />
      

      {/* ✅ HEADER NUEVO */}
      <Header />

      <Breadcrumb />
      
      <WhatsappButton />

      {/* ✅ Si el header es fixed, esto evita que el contenido quede debajo */}
      <main className="min-h-screen">{children}</main>

      <FooterWithSocialLinks />
    </div>
  );
};

export default MainLayout;
