// app/page.tsx

import React from "react";
import { Metadata } from "next";
import { getHomePageData } from "@/lib/strapi";
import { PageSection } from "@/lib/types";

// Importamos el componente Hero actualizado
import { Hero } from "@/components/sections/landing/Hero"; 

// Función para generar metadatos SEO dinámicos
export async function generateMetadata(): Promise<Metadata> {
  try {
    const homeData = await getHomePageData();
    return {
      title: homeData?.title || "GOH2",
      description: homeData?.description || "La mejor hidratación para ti.",
    };
  } catch (e) {
    return { title: "Goh2", description: "Error de conexión" };
  }
}

// Función que decide qué componente renderizar según el nombre en Strapi
function SectionRenderer(section: PageSection, index: number) {
  switch (section.__component) {
    case "layout.hero-section":
      // Pasamos toda la sección como 'data' al componente Hero
      return <Hero key={index} data={section} />;
    
    // Aquí agregarás más casos en el futuro (ej: case "layout.features": ...)
    
    default:
      return null;
  }
}

export default async function Home() {
  let homeData;

  try {
    // Obtenemos los datos desde Strapi (Backend en Aiven)
    homeData = await getHomePageData();
  } catch (error) {
    console.error("Error en Home:", error);
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p>Error conectando con el servidor. Revisa tu terminal.</p>
      </div>
    );
  }

  // Validación: Si no hay datos o la zona dinámica está vacía
  if (!homeData || !homeData.sections || homeData.sections.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-gray-400">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Contenido no encontrado</h1>
          <p>En procesos de cambiosss.</p>
        </div>
      </div>
    );
  }

  // Renderizado: Mapeamos las secciones dinámicamente
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {homeData.sections.map((section, index) => SectionRenderer(section, index))}
    </main>
  );
}