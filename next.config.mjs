/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },
  images: {
    domains: [
      "th.bing.com",
      "app.interfuerza.com",
      "download.schneider-electric.com",
      "http2.mlstatic.com",
      "m.media-amazon.com",
      "madereriaveracruz.com",
      "importadoramatrix.com",
      "www.proveedoresmineros.com",
      "www.tiendaelectricavirtual.com",
      "static.wixstatic.com",
      "5.imimg.com",
      "www.mic-led.com",
      "static.grainger.com",
      "img.pchome.com.tw",
      "promart.vteximg.com.br",
      "images-na.ssl-images-amazon.com",
      "www.puntoelectrico.com.uy",
      "www.esinsa.com",
      "image.made-in-china.com",
      "cartegomart.com",
      "manelsa.com.pe",
      "i5.walmartimages.com",
      "i0.wp.com",
      "cdnx.jumpseller.com",
      "mlstaticquic-a.akamaihd.net",
      "ipi-peru.com",
    ],
  },
};

export default nextConfig;