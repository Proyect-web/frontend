"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FeaturedProductsSectionData } from "@/lib/types";

interface FeaturedProductsProps {
  data: FeaturedProductsSectionData;
}

export function FeaturedProducts({ data }: FeaturedProductsProps) {
  const { section_title, products } = data;

  if (!products || products.length === 0) return null;

  return (
    // --- CAMBIO PRINCIPAL: Padding Left idéntico a Highlights (md:pl-48) ---
    <section id="tienda" className="w-full bg-black py-20 px-4 md:pl-48 md:pr-8 border-t border-white/5">
      
      <div className="container mx-auto">
         
        {/* Título de la Sección (Estilo Titan One consistente) */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-white mb-12 font-bold px-1"
          style={{ fontFamily: "var(--titan-one-regular)" }}
        >
          {section_title}
        </motion.h2>

        <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory pb-12 pt-12 px-5 scrollbar-hide">
          
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="snap-center shrink-0"
            >
              <Link href={`/productos/${product.slug}`} className="group block">
                
                {/* --- TARJETA CON EFECTO ACUÁTICO (Tu diseño aprobado) --- */}
                <div className="relative w-[330px] h-[480px] rounded-[2rem] overflow-hidden flex flex-col shadow-lg transition-all duration-500 hover:-translate-y-2 border border-white/10 bg-gradient-to-b from-white/[0.02] to-cyan-900/[0.03] backdrop-blur-sm hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                  
                  {/* Efecto de brillo acuático en hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 1. IMAGEN (Superior - Full Cover) */}
                  <div className="relative h-[65%] w-full overflow-hidden">
                    {product.images && product.images[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
                        sizes="(max-width: 768px) 100vw, 330px"
                      />
                    )}
                    
                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
                  </div>

                  {/* 2. INFORMACIÓN (Inferior) */}
                  <div className="relative h-[30%] w-full p-6 flex flex-col justify-between border-t border-white/5 bg-black/40 backdrop-blur-md">
                    
                    {/* Texto Superior */}
                    <div className="space-y-1">
                      <h3 className="text-xl text-white font-bold leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Precio y Botón */}
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-300 uppercase tracking-wider font-medium mb-0.5">Precio</span>
                        <span className="text-2xl font-black text-white tracking-tight">
                          S/. {product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}