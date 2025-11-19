// src/components/sections/landing/Hero.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSectionData } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  data: HeroSectionData;
}

export function Hero({ data }: HeroProps) {
  const { hero_titulo, hero_subtitulo, hero_imagen, hero_background, link } = data;

  // Protección
  if (!hero_titulo) return null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] pl-20 md:pl-24"> {/* Padding left para el sidebar */}
      
      {/* ========== FONDO GLOBAL ========== */}
      <div className="absolute inset-0 z-0">
         {/* Imagen de fondo desde Strapi */}
         {hero_background && (
           <Image 
             src={hero_background.url}
             alt="Fondo"
             fill
             className="object-cover opacity-70"
             priority
           />
         )}
         {/* Gradiente de oscurecimiento para legibilidad */}
         <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
         <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black" />
      </div>

      {/* ========== CONTENIDO ========== */}
      <div className="relative z-10 container mx-auto h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 px-6 md:px-12 pt-20">
        
        {/* IZQUIERDA: TEXTO */}
        <div className="flex-1 max-w-2xl flex flex-col items-start text-left">
          
          {/* Título Impactante */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className=" text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-wide uppercase mb-6"
            style={{fontFamily: "var(--titan-one-regular)",}}
          >
            {hero_titulo}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 font-medium mb-10 max-w-2xl"
           
          >
            {hero_subtitulo}
          </motion.p>

          {/* Botón CTA Estilo Referencia */}
          {link && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href={link.href}
                className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-linear-to-r from-blue-500  to-sky-300 text-gray-900 text-xl font-bold uppercase tracking-wide rounded-2xl overflow-hidden  hover:shadow-blue-950 "
              >
                <span className="relative z-10 flex items-center gap-3">
                  {link.label}
                 
                </span>
                {/* Efecto brillo hover */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
          
            </motion.div>
          )}
        </div>

        {/* DERECHA: IMAGEN PRODUCTO */}
        <div className="flex-1 w-full h-full relative flex items-center justify-center lg:justify-end">
           <motion.div
             initial={{ opacity: 0, x: 50, rotate: 5 }}
             animate={{ opacity: 1, x: 0, rotate: 0 }}
             transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
             className="relative w-full max-w-[800px] aspect-square"
           >
             {/* Efectos traseros */}
             <div className="absolute inset-0 bg-linear-to-tr from-blue-800/20 to-blue-500/20 rounded-full blur-[80px] animate-pulse" />
             
             {/* Imagen Principal */}
             <Image
               src={hero_imagen.url}
               alt="Hero Product"
               fill
               className="object-contain drop-shadow-2xl z-10"
               priority
             />
             
             {/* Elementos flotantes decorativos (opcional, si quieres simular la referencia) */}
             <motion.div 
               animate={{ y: [0, -20, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 rounded-xl blur-xl opacity-40" 
             />
             
           </motion.div>
        </div>

      </div>
    </section>
  );
}