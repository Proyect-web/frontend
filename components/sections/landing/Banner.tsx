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
    <section className="w-full bg-black py-12 px-4 md:pl-48 md:pr-8">
      
      {/* ============ CARD CONTAINER ============ */}
      {/* CAMBIO: Usar container mx-auto igual que Highlights */}
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-linear-to-b from-[#111] to-black shadow-2xl"
        >
          
          {/* --- FONDOS DE LA TARJETA --- */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* ============ CONTENIDO INTERNO ============ */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            
            {/* Flex Container: 1/3 Imagen - 2/3 Texto */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* --- COLUMNA IZQUIERDA: IMAGEN (1/3 del ancho) --- */}
              <motion.div 
                className="w-full lg:w-1/3 flex justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative w-[250px] md:w-[280px] lg:w-[320px] aspect-[3/4]">
                    
                    {/* Brillo trasero */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-cyan-400/15 blur-[50px] rounded-full" />

                    <Image
                      src={banner_image.url}
                      alt="Product Banner"
                      fill
                      className="object-contain drop-shadow-2xl z-10"
                      priority
                    />
                    
                    {/* Sombra */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/50 blur-md rounded-full" />
                </div>
              </motion.div>

              {/* --- COLUMNA DERECHA: TEXTO (2/3 del ancho) --- */}
              <div className="w-full lg:w-2/3 flex flex-col items-start text-left">
                
                {/* Badge decorativo */}
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20"
                >
                  Innovación
                </motion.span>

                {/* Título principal */}
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-black leading-tight tracking-tight"
                  style={{ fontFamily: "var(--titan-one-regular)" }}
                >
                  {banner_title}
                </motion.h2>

                {/* Subtítulo */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-300 font-medium mb-8 leading-relaxed max-w-2xl"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {banner_subtitle}
                </motion.p>

                {/* Botón CTA */}
                {link && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Link 
                      href={link.href}
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black text-base font-bold uppercase tracking-wide rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {link.label}
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      {/* Efecto de brillo al hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                    </Link>
                  </motion.div>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}