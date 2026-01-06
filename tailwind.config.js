/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // ⚠️ Esto SOBRESCRIBE los tamaños por defecto de Tailwind.
    // Lo dejo igual como lo tienes para no romper tu proyecto.
    fontSize: {
      xs: "14px",
      sm: "16px",
      md: "18px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
    },
    extend: {
      // ✅ Colores Equielect
      colors: {
        "equielect-yellow": "#FFCD00", // PANTONE 116 C
        "equielect-blue": "#1C355E", // PANTONE 534 C
        "equielect-gray": "#98989A", // PANTONE COOL GRAY 7 C
        "equielect-dark": "#333333", // Negro suave

        // Variables CSS existentes
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      // ✅ Tipografía: Montserrat como DEFAULT (font-sans)
      // Requiere que en layout uses: <body className={`${montserrat.variable} font-sans ...`}>
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },

      // ✅ Imágenes de fondo
      backgroundImage: {
        parallax: "url('/assets/QuienesSomos/img-quienes-somos.jpg')",
        parallax2: "url('/assets/servicios/distribucion-productos.png')",
      },

      // ✅ Extras tuyos
      borderColor: ["focus-visible"],
      animation: {
        spin: "spin 1s linear infinite",
        "spin-slow": "spin 1.5s linear infinite",
      },
    },
  },
  plugins: [],
});
