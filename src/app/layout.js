import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { ThemeProvider } from "@/utils/tailwind/index";
import { AppThemeProvider } from "@/context/Theme/ThemeProvider";
import { AppProductProvider } from "@/context/Products/ProductProvider";
import { AppCotizacionProvider } from "@/context/Cotizacion/CotizacionProvider";
import { CartProvider } from "@/context/Cart/CartContext";

import MainLayout from "@/components/layout/MainLayout";
import { GA_TRACKING_ID } from "../../lib/analytics";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Equielect",
  description:
    "Somos un equipo con la capacidad de brindar soluciones prácticas y establecer alianzas duraderas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* ✅ Usa variable + font-sans para que TODO Tailwind use Montserrat */}
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

        {/* ✅ Providers */}
        <ThemeProvider>
          <AppThemeProvider>
            <AppProductProvider>
              <AppCotizacionProvider>
                <CartProvider>
                  <MainLayout>{children}</MainLayout>
                </CartProvider>
              </AppCotizacionProvider>
            </AppProductProvider>
          </AppThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
