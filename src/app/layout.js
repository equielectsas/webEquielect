import { Montserrat } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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
  const MAIN_GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  const ANDRES_GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID_ANDRES;

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

        {MAIN_GA_ID ? <GoogleAnalytics gaId={MAIN_GA_ID} /> : null}

        {MAIN_GA_ID &&
        ANDRES_GA_ID &&
        ANDRES_GA_ID !== MAIN_GA_ID ? (
          <Script id="google-analytics-andres" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('config', '${ANDRES_GA_ID}');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}