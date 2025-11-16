// src/app/page.tsx

import React from "react";
// 1. Importar la nueva función de fetch y el componente Hero
import { getHomePageData } from "@/lib/strapi";
import Hero from "@/components/sections/landing/Hero";

/*
 * La página de inicio ahora es un Server Component 'async'.
 * Obtiene los datos de la 'Página de Inicio' desde Strapi.
 */
export default async function Home() {
  
  let homeData;
  try {
    homeData = await getHomePageData();
  } catch (error) {
    console.error("Error al obtener datos de la Homepage:", error);
    // Renderizado de fallback en caso de error
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Error al cargar el contenido. Revisa la conexión con Strapi.
      </div>
    );
  }
  
  // Verificamos que los datos necesarios existen
  if (!homeData || !homeData.hero_imagen) {
     return (
      <div className="h-screen flex items-center justify-center text-yellow-500">
        Contenido de la Página de Inicio no encontrado.
        ¿Publicaste la 'Página de Inicio' en Strapi?
      </div>
    );
  }

  return (
    <>
      {/* Sección 1: Hero */}
      {/* Pasamos los datos dinámicos como props */}
      <Hero
        title={homeData.hero_titulo}
        subtitle={homeData.hero_subtitulo}
        image={homeData.hero_imagen}
      />

      {/* Aquí puedes añadir el resto de secciones:
      <Features />
      <Specifications />
      <Gallery />
      ... 
      */}
    </>
  );
}