import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { FavoritesProvider } from "@/context/Favorites/FavoritesContext";
import { ThemeProvider } from "@/utils/tailwind/index";
import { AppThemeProvider } from "@/context/Theme/ThemeProvider";
import { AppProductProvider } from "@/context/Products/ProductProvider";
import { CartProvider } from "@/context/Cart/CartContext";
import MainLayout from "@/components/layout/MainLayout";
import { GA_TRACKING_ID } from "../../lib/analytics";

// ✅ Clara chatbot
import ClaraChatWidget from "@/components/chat/ClaraChatWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Equielect",
  description:
    "Somos un equipo con la capacidad de brindar soluciones prácticas y establecer alianzas duraderas.",
};

export default function RootLayout({ children }) {
  // debug solo en desarrollo
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans font-normal antialiased`}>
        {/* ✅ Google Analytics (solo si existe GA_TRACKING_ID) */}
        {GA_TRACKING_ID ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    debug_mode: ${isDev ? "true" : "false"}
                  });
                `,
              }}
            />
          </>
        ) : null}

        {/* ✅ Providers (no se tocan) */}
        <ThemeProvider>
          <AppThemeProvider>
            <AppProductProvider>
              <CartProvider>
                <FavoritesProvider isLoggedIn={false}>
                  <MainLayout>
                    {children}
                    <ClaraChatWidget />
                  </MainLayout>
                </FavoritesProvider>
              </CartProvider>
            </AppProductProvider>
          </AppThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}