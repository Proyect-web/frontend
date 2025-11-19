// src/components/sections/landing/Banner.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BannerSectionData } from "@/lib/types";

interface BannerProps {
  data: BannerSectionData;
}

export function Banner({ data }: BannerProps) {
  const { banner_title, banner_subtitle, banner_image, link } = data;

  if (!banner_title) return null;

  return (
    // Padding para respetar el sidebar y separar del resto
    <section className="w-full bg-[#000000] py-14 px-4 md:pl-64 md:pr-30 flex justify-center">
      
      {/* --- CONTENEDOR TARJETA (CARD) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-full bg-[#111] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
      >
        
        {/* ============ FONDOS INTERNOS DE LA TARJETA ============ */}
        
        {/* 1. Grid sutil de fondo */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        {/* 2. Brillo Radial Azul/Cian detrás de todo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        {/* ============ CONTENIDO (Flex Row Invertido en Desktop) ============ */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 gap-12">
          
          {/* --- COLUMNA IZQUIERDA: IMAGEN (Ahora aquí) --- */}
          <div className="flex-1 w-full flex justify-center lg:justify-start order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative w-[280px] sm:w-[350px] lg:w-[450px] aspect-[3/4] lg:aspect-square"
             >
               {/* Efecto "Pedestal" de luz */}
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-cyan-500/40 blur-xl rounded-full" />
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-[60px] scale-75" />

               <Image
                 src={banner_image.url}
                 alt="Product Banner"
                 fill
                 className="object-contain drop-shadow-2xl z-10"
               />
             </motion.div>
          </div>

          {/* --- COLUMNA DERECHA: TEXTOS (Ahora aquí) --- */}
          <div className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right order-1 lg:order-2 max-w-2xl">
            
            <motion.h2 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-7xl text-white mb-6 font-bold leading-[0.95]"
              style={{ fontFamily: "var(--titan-one-regular)" }}
            >
              {banner_title}
            </motion.h2>

            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-blue-600 rounded-full mb-8"
            />

            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 font-medium mb-10 leading-relaxed"
            >
              {banner_subtitle}
            </motion.p>

            {link && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link 
                  href={link.href}
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-white text-black text-lg font-black uppercase tracking-wide rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Efecto hover sutil */}
                  <div className="absolute inset-0 bg-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
}