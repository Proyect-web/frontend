// src/app/layout.tsx

import type { Metadata } from "next";
// 1. IMPORTAR 'Manrope' JUNTO CON 'Inter'
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";

// 2. CONFIGURAR AMBAS FUENTES
// 'Inter' será la fuente del cuerpo (sans)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Asignamos una variable CSS
});

// 'Manrope' será la fuente de títulos (display)
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700", "800"], // Pesos que usaremos
  variable: "--font-manrope", // Asignamos una variable CSS
});

export const metadata: Metadata = {
  title: "h2go - Innovación en Hidratación",
  description: "Descubre la innovadora botella de agua.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      {/* 3. APLICAR AMBAS VARIABLES DE FUENTE AL BODY */}
      <body className={`${inter.variable} ${manrope.variable} bg-gray-900 font-sans`}>
        {/* 'font-sans' aplica Inter por defecto a todo */}
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}