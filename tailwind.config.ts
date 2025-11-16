// tailwind.config.ts
import type { Config } from "tailwindcss";
// 1. Importar el tema por defecto
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. Aquí añadimos la nueva familia de fuentes
      fontFamily: {
        // 'sans' será nuestra fuente por defecto (Inter)
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        // 'display' será nuestra nueva fuente para TÍTULOS (Manrope)
        display: ["var(--font-manrope)", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
     require('@tailwindcss/typography'), // (Asegúrate de tener este)
  ],
};
export default config;