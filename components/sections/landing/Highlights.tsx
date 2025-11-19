// src/components/sections/landing/Highlights.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HighlightsSectionData } from "@/lib/types";
import { clsx } from "clsx"; 

interface HighlightsProps {
  data: HighlightsSectionData;
}

// LÓGICA DE TAMAÑOS (HARDCODED POR ÍNDICE)
const getCardStyles = (index: number) => {
  switch (index) {
    case 0: // Tarjeta Grande Izquierda (El personaje/render)
      return "md:col-span-2 md:row-span-2 h-[570px]"; // Altura fija grande
    case 1: // Tarjeta Ancha Arriba Derecha (Apple Intelligence)
      return "md:col-span-2 h-[260px]"; // Mitad de altura
    case 2: // Tarjeta Pequeña Abajo Centro (Sol)
      return "md:col-span-1 h-[270px]";
    case 3: // Tarjeta Pequeña Abajo Derecha (Batería)
      return "md:col-span-1 h-[270px]";
    default:
      return "col-span-1 h-[240px]";
  }
};

export function Highlights({ data }: HighlightsProps) {
  const { cards } = data;

  if (!cards || cards.length === 0) return null;

  return (
    // PADDING LEFT AJUSTADO (md:pl-32) para respetar tu Sidebar
    <section id="caracteristicas" className="w-full bg-black py-12 px-4 md:pl-48 md:pr-8">
      
      <div className="container mx-auto">
        {/* Título de Sección */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-white mb-10 font-bold px-1"
          style={{ fontFamily: "var(--titan-one-regular)" }}
        >
          Potencia tu día.
        </motion.h2>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-4xl overflow-hidden ${getCardStyles(index)}`}
            >
              
              {/* Borde Gradiente (Opcional por tarjeta) */}
              {card.hasGradient ? (
                <div className="absolute inset-0 p-0.5 rounded-4xl bg-linear-to-r from-blue-500 via-cyan-400 to-blue-600 animate-pulse">
                  <div className="h-full w-full bg-[#151515] rounded-[1.9rem] overflow-hidden relative">
                    <CardContent card={card} index={index} />
                  </div>
                </div>
              ) : (
                // Tarjeta Normal (Fondo gris oscuro)
                <div className="h-full w-full bg-[#151515] relative overflow-hidden border border-white/5">
                   <CardContent card={card} index={index} />
                </div>
              )}

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CONTENIDO INTERNO DE LA TARJETA
function CardContent({ card, index }: { card: any, index: number }) {
  
  // La tarjeta 0 es la "Especial" (Imagen full cover)
  const isLargeCard = index === 0; 
  
  return (
    <div className="relative h-full w-full flex flex-col p-6 md:p-8">
      
      {/* === IMAGEN === */}
      {/* Si es Large: Se renderiza como FONDO ABSOLUTO detrás de todo */}
      {/* Si es Normal: Se renderiza como icono/imagen relativa */}
      {card.image && (
        <div className={clsx(
          "transition-transform duration-700 group-hover:scale-105",
          isLargeCard ? "absolute inset-0 w-full h-full z-0" : "w-16 h-16 mb-4 relative z-10"
        )}>
          <Image
            src={card.image.url}
            alt={card.title}
            fill={isLargeCard} // Fill solo para la grande
            width={!isLargeCard ? 80 : undefined}
            height={!isLargeCard ? 80 : undefined}
            className={isLargeCard ? "object-cover object-center" : "object-contain"}
            priority={isLargeCard}
          />
          
          {/* OVERLAY OSCURO SOLO PARA LA TARJETA GRANDE */}
          {/* Para que el texto blanco se lea sobre la imagen */}
          {isLargeCard && (
             <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
          )}
        </div>
      )}

      {/* === TEXTOS === */}
      <div className={clsx(
        "relative z-10 flex flex-col gap-2",
        // Si es grande, empujamos el texto al fondo (mt-auto)
        isLargeCard ? "mt-auto" : ""
      )}>
        <h3 className={clsx(
          "font-bold text-white leading-tight",
          // Texto más grande para la tarjeta principal
          isLargeCard ? "text-3xl md:text-4xl drop-shadow-lg" : "text-xl md:text-2xl"
        )}>
          {card.title}
        </h3>
        
        {card.description && (
          <p className={clsx(
            "font-medium leading-relaxed",
            isLargeCard ? "text-gray-200 text-base md:text-lg drop-shadow-md" : "text-gray-400 text-sm md:text-base"
          )}>
            {card.description}
          </p>
        )}
      </div>

    </div>
  );
}