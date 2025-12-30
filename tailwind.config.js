


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
    // Nota: Mantuviste 'fontSize' fuera de 'extend'. Esto SOBRESCRIBE los tamaños por defecto.
    // Si querías MANTENER los tamaños por defecto (como text-3xl, text-4xl, etc.),
    // deberías mover esta sección DENTRO de 'extend'. Lo he dejado como estaba para no romper tu configuración.
    fontSize: {
      xs: "14px",
      sm: "16px",
      md: "18px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
    },
    extend: {
      // 1. COLORES PERSONALIZADOS DE EQUSELECT (Incluyendo el Negro Suave)
      colors: {
        // Colores de la marca:
        'equielect-yellow': '#FFCD00',   // PANTONE 116 C
        'equielect-blue': '#1C355E',     // PANTONE 534 C
        'equielect-gray': '#98989A',     // PANTONE COOL GRAY 7 C

        // Negro Suave (Aproximadamente un 80% de negro. Usando #333333 o un gris muy oscuro)
        'equielect-dark': '#333333',     // Negro no 100% para evitar la pesadez visual.

        // Mantenemos tus variables CSS existentes, pero asegurando que no entren en conflicto:
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      
      // 2. TIPOGRAFÍA MONTSERRAT
      // Asume que '--font-montserrat' está definido en tu archivo _app.js o layout.js
      fontFamily: { 
        montserrat: ["var(--font-montserrat)", "sans-serif"], 
        // Si quieres usar Montserrat como el tipo de letra por defecto,
        // puedes sobreescribir 'sans':
        // sans: ["var(--font-montserrat)", "sans-serif"],
      }, 

      // 3. IMÁGENES DE FONDO
      backgroundImage: {
        parallax: "url('/assets/QuienesSomos/img-quienes-somos.jpg')",
        parallax2: "url('/assets/servicios/distribucion-productos.png')",
      },
      
      // 4. BORDES NO REDONDEADOS (Minimalista)
      // Tailwind por defecto no aplica border-radius a menos que se use la clase 'rounded-*'.
      // Para asegurar que los elementos de Material Tailwind o plugins no introduzcan bordes redondeados
      // sin tu permiso, no es necesario un cambio aquí, pero es una buena práctica evitar
      // clases de redondez en tu código para mantener el estilo minimalista de "líneas rectas".
      
      borderColor: ["focus-visible"],
      animation: {
        spin: "spin 1s linear infinite",
        "spin-slow": "spin 1.5s linear infinite",
      },
    },
  },
  plugins: [],
});