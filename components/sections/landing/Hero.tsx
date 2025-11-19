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
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] px-4 md:pl-28 md:pr-8 pt-24 md:pt-0 flex items-center"> 
      
      {/* ========== FONDO (Sin cambios) ========== */}
      <div className="absolute inset-0 z-0">
         {hero_background && (
           <Image 
             src={hero_background.url}
             alt="Fondo"
             fill
             className="object-cover opacity-60"
             priority
           />
         )}
         <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* ========== CONTENIDO ========== */}
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        
        {/* IZQUIERDA: TEXTO + IMAGEN MÓVIL + BOTÓN */}
        <div className="flex-1 w-full max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* 1. Título */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-black text-5xl sm:text-6xl lg:text-8xl text-white leading-[0.9] tracking-wide uppercase mb-6 drop-shadow-xl"
            style={{fontFamily: "var(--titan-one-regular)",}}
          >
            {hero_titulo}
          </motion.h1>

          {/* 2. Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0"
          >
            {hero_subtitulo}
          </motion.p>

          {/* 3. IMAGEN (VERSIÓN MÓVIL - SOLO VISIBLE EN MÓVIL) */}
          {/* lg:hidden oculta esto en pantallas grandes */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="block lg:hidden relative w-full max-w-[280px] aspect-square mb-8"
           >
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/30 to-blue-500/30 rounded-full blur-[50px] animate-pulse" />
             <Image
                  src={hero_imagen.url}
                  alt="Hero Product Mobile"
                  fill
                  className="object-contain drop-shadow-2xl z-10"
                  priority
             />
          </motion.div>

          {/* 4. Botón CTA */}
          {link && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full lg:w-auto"
            >
              <Link 
                href={link.href}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-400 text-gray-900 text-xl font-bold uppercase tracking-wide rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {link.label}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* DERECHA: IMAGEN PRODUCTO (VERSIÓN ESCRITORIO - SOLO VISIBLE EN PC) */}
        {/* hidden lg:flex oculta esto en móviles */}
        <div className="hidden lg:flex flex-1 w-full items-center justify-center lg:justify-end mt-4 lg:mt-0">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
             className="relative w-full max-w-[800px] aspect-square lg:aspect-auto h-auto lg:h-[80vh]"
           >
             <div className="absolute inset-0 bg-linear-to-tr from-blue-800/30 to-blue-500/30 rounded-full blur-[60px] animate-pulse" />
             
             <div className="relative w-full h-full">
                <Image
                  src={hero_imagen.url}
                  alt="Hero Product Desktop"
                  fill
                  className="object-contain drop-shadow-2xl z-10"
                  priority
                />
             </div>
             
             {/* Elemento flotante */}
             <motion.div 
               animate={{ y: [0, -20, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-5 -right-5 w-16 h-16 bg-blue-500 rounded-full blur-xl opacity-40" 
             />
           </motion.div>
        </div>

      </div>
    </section>
  );
}