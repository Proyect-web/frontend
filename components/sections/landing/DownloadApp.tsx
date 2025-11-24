// src/components/sections/landing/DownloadApp.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DownloadAppSectionData } from "@/lib/types";
import { Download } from "lucide-react";

interface Props {
  data: DownloadAppSectionData;
}

export function DownloadApp({ data }: Props) {
  const { title, description, app_image, download_link } = data;

  if (!title) return null;

  return (
    <section id="app" className="w-full bg-[#050505] py-24 relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:pl-44 md:pr-30 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
          <div className="flex-1 max-w-xl text-left">
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "var(--titan-one-regular)" }}
            >
              {title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-gray-400 font-medium leading-relaxed mb-10"
            >
              {description}
            </motion.p>

            {/* Botón de Descarga */}
            {download_link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  href={download_link.href}
                  className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg transition-all hover:bg-gray-200 hover:scale-105 shadow-lg shadow-white/5"
                >
                  <Download size={24} className="group-hover:-translate-y-1 transition-transform" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-base">{download_link.label}</span>
                  </div>
                </Link>
                
                <p className="mt-4 text-xs text-gray-600 font-medium">
                  *Disponible para Android. Próximamente iOS.
                </p>
              </motion.div>
            )}
          </div>

          {/* --- COLUMNA DERECHA: CELULAR --- */}
          <motion.div 
            className="flex-1 relative flex justify-center lg:justify-end w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Círculo decorativo detrás del celular */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/5 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-green-400/20 to-blue-500/20 rounded-full blur-[40px]" />

            {/* Contenedor del Celular - MODIFICADO */}
            <div className="relative w-[280px] md:w-[300px] aspect-[11/21] bg-black rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden z-10">
              
              {/* Notch (Decorativo) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-[#1a1a1a] rounded-b-xl z-20" />

              {/* Contenedor de la Imagen - MODIFICADO */}
              {app_image && (
                <div className="relative w-full h-full p-4"> {/* Padding de 4 (16px) */}
                  <Image
                    src={app_image.url}
                    alt="App Interface"
                    fill
                    className="object-contain" /* Cambiado de object-cover a object-contain */
                    unoptimized={app_image.url.endsWith('.gif')}
                  />
                </div>
              )}
            </div>

            {/* Elementos flotantes */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -right-4 lg:right-10 w-16 h-16 bg-blue-500 rounded-2xl blur-xl opacity-30 z-0"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}