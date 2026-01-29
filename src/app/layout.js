import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { FavoritesProvider } from "@/context/Favorites/FavoritesContext";
import { ThemeProvider } from "@/utils/tailwind/index";
import { AppThemeProvider } from "@/context/Theme/ThemeProvider";
import { AppProductProvider } from "@/context/Products/ProductProvider";
import { CartProvider } from "@/context/Cart/CartContext";
import CookieBanner from "@/components/CookieBanner";
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
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans font-normal antialiased`}>
        {/* ✅ Google Analytics */}
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
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                debug_mode: true
              });
            `,
          }}
        />

        {/* ✅ Providers (se dejan para no romper imports existentes) */}
        <ThemeProvider>
          <AppThemeProvider>
            <AppProductProvider>
              <CartProvider>
                <FavoritesProvider isLoggedIn={false}>
                  <MainLayout>
                    {children}
                    <CookieBanner />
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
