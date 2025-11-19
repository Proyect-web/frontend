// /app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins, Rubik } from "next/font/google"; // Usamos Rubik como pediste antes
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
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

// Ajustamos Titan One/Rubik según tu preferencia
const titan = Rubik({
  subsets: ["latin"],
  weight: ["900"], 
  variable: "--titan-one-regular", // Mantenemos el nombre de variable que usas en Hero
});

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
      <body className={`${inter.variable} ${poppins.variable} ${titan.variable} bg-gray-900 text-white antialiased overflow-x-hidden`}>
        <Sidebar logoUrl={logoUrl} />
        <main className="w-full min-h-screen relative">
            {children}
        </main>
      </body>
    </html>
  );
}