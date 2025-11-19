// src/components/sections/landing/Hero.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSectionData } from "@/lib/types";

interface HeroProps {
  data: HeroSectionData;
}

export function Hero({ data }: HeroProps) {
  const { hero_titulo, hero_subtitulo, hero_imagen, hero_background, link } = data;

  if (!hero_titulo) return null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] pt-16 md:pt-0 md:pl-24 lg:pl-24"> {/* Padding top en movil para navbar, padding left en desktop para sidebar */}
      
      {/* ========== FONDO GLOBAL (Tu diseño intacto) ========== */}
      <div className="absolute inset-0 z-0">
         {hero_background && (
           <Image 
             src={hero_background.url}
             alt="Fondo"
             fill
             className="object-cover opacity-70"
             priority
           />
         )}
         <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* ========== CONTENIDO ========== */}
      <div className="relative z-10 container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 px-4 md:px-8 py-12 lg:py-0">
        
        {/* IZQUIERDA: TEXTO */}
        <div className="flex-1 w-full max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Título Impactante */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // Responsive text sizes: text-5xl en móvil, text-8xl en desktop
            className="text-4xl  sm:text-5xl lg:text-7xl font-bold text-white leading-none tracking-wide uppercase mb-6 drop-shadow-xl"
            style={{fontFamily: "var(--titan-one-regular)",}}
          >
            {hero_titulo}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg lg:text-xl text-gray-300 font-medium mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0"
          >
            {hero_subtitulo}
          </motion.p>

          {/* === IMAGEN MÓVIL (VISIBLE SOLO EN MÓVIL, ANTES DEL BOTÓN) === */}
          <div className="lg:hidden w-full max-w-[300px] aspect-square relative mb-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full"
              >
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/30 to-blue-500/30 rounded-full blur-[40px] animate-pulse" />
                 <Image
                    src={hero_imagen.url}
                    alt="Hero Product Mobile"
                    fill
                    className="object-contain drop-shadow-2xl z-10"
                    priority
                  />
              </motion.div>
          </div>

          {/* Botón CTA */}
          {link && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href={link.href}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-500 to-sky-300 text-gray-900 text-xl font-bold uppercase tracking-wide rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-950 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {link.label}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* DERECHA: IMAGEN PRODUCTO (VISIBLE SOLO EN ESCRITORIO) */}
        <div className="hidden lg:flex flex-1 w-full h-full relative items-center justify-center lg:justify-end">
           <motion.div
             initial={{ opacity: 0, x: 50, rotate: 5 }}
             animate={{ opacity: 1, x: 0, rotate: 0 }}
             transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
             className="relative w-full max-w-[600px] xl:max-w-[800px] aspect-square"
           >
             {/* Efectos traseros */}
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 to-blue-500/20 rounded-full blur-[80px] animate-pulse" />
             
             {/* Imagen Principal */}
             <Image
               src={hero_imagen.url}
               alt="Hero Product"
               fill
               className="object-contain drop-shadow-2xl z-10"
               priority
             />
             
             {/* Elementos flotantes */}
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