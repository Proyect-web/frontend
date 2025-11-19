// /app/layout.tsx

import type { Metadata } from "next";
import { Inter, Poppins, Titan_One, Rubik } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar"; // Importamos el nuevo componente
// 1. Importar la función de fetch
import { getHomePageData } from "@/lib/strapi";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"], 
  variable: "--font-poppins",
});

const titan = Rubik({

  weight: ["900"], 
  variable: "--titan-one-regular",
})

export const metadata: Metadata = {
  title: "h2go - Innovación en Hidratación",
  description: "Descubre la innovadora botella de agua.",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  let logoUrl = null;
  try {
    const homeData = await getHomePageData();
    if (homeData && homeData.navbar_logo) {
      logoUrl = homeData.navbar_logo.url;
    }
  } catch (error) {
    console.error("Error cargando el logo:", error);
  }

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} ${titan.variable} bg-gray-900  text-white antialiased`}>
       
       
        <Sidebar logoUrl={logoUrl} />
        <main>{children}</main>
      </body>
    </html>
  );
}