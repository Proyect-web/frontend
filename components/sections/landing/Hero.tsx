// src/components/sections/landing/Hero.tsx

"use client";


import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { StrapiMedia } from "@/lib/types";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  image: StrapiMedia;
}

// Variantes de animación (sin cambios, ya que te gustaron)
const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function Hero({ title, subtitle, image }: HeroProps) {
  const titleWords = title.split(" ");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Efecto Ken Burns (sin cambios) */}
      <motion.div
        className="absolute inset-0 z-[-10]"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={image.url}
          alt={image.alternativeText || "Fondo del Hero"}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </motion.div>

      {/* Superposición (Overlay) (sin cambios) */}
      <div className="absolute inset-0 bg-black/40 z-[-5]"></div>

      {/* --- INICIO DE LA MEJORA DE DISEÑO --- */}

      {/* 1. Contenido de Texto:
        - CAMBIADO A 'justify-end' y 'items-start' (Abajo a la izquierda)
        - CAMBIADO A 'text-left' (Alineado a la izquierda)
        - AÑADIDO PADDING: 'p-8 md:p-12 lg:p-24'
      */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end text-left text-white p-8 md:p-12 lg:p-24">
        


        {/* 2. Contenedor de Título Animado */} 
        <motion.h1
          // 3. FUENTE CAMBIADA A 'font-display' (Manrope) 
          // 4. TAMAÑO REDUCIDO: 'text-4xl md:text-6xl lg:text-7xl'
          className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight w-[75%] leading-tight"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          // 5. 'justify-start' para alinear las palabras a la izquierda
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-4 md:mr-6" // Espacio entre palabras
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>




        {/* 9. Subtítulo (Animado) */}
        <motion.p
          // 6. TAMAÑO Y ANCHURA AJUSTADOS
          className="mt-4 text-base md:text-lg max-w-3xl text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: (titleWords.length * 0.1) + 0.5, 
          }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* 10. INDICADOR DE SCROLL (REUBICADO) */}
      {/* 7. CAMBIADO A 'right-10' para balancear el diseño */}
      <motion.div
        className="absolute bottom-10 right-10" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={24} className="text-white" />
        </motion.div>
      </motion.div>

      {/* --- FIN DE LA MEJORA DE DISEÑO --- */}
    </section>
  );
}