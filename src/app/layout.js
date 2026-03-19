import { Montserrat } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";

import { FavoritesProvider } from "@/context/Favorites/FavoritesContext";
import { ThemeProvider } from "@/utils/tailwind/index";
import { AppThemeProvider } from "@/context/Theme/ThemeProvider";
import { AppProductProvider } from "@/context/Products/ProductProvider";
import { CartProvider } from "@/context/Cart/CartContext";
import MainLayout from "@/components/layout/MainLayout";
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
  const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} font-sans font-normal antialiased`}
      >
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

        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}