"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CarouselSectionData } from "@/lib/types";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";

interface Props {
  data: CarouselSectionData;
}

// Animación de burbujas flotantes
const bubbleVariants: Variants = {
  initial: { y: 100, opacity: 0 },
  // `animate` es una función que recibirá `custom` desde el prop `custom` del motion element
  animate: (custom: any) => ({
    y: -500,
    opacity: [0, 0.5, 0],
    transition: {
      duration: 10 + (Number(custom) || 0) * 2,
      repeat: Infinity,
      ease: "linear",
      delay: (Number(custom) || 0) * 1.5,
    },
  }),
};


export function FeaturesCarousel({ data }: Props) {
  const { slides } = data;
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false); // Pausar autoplay si el usuario interactúa
  };
  
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  const currentSlide = slides[current];
  const nextIndex = (current + 1) % slides.length;

  return (
    <section id="especificaciones" className="relative w-full py-32 bg-[#02040a] overflow-hidden">
      
      {/* === PRE-CARGA === */}
      <div className="hidden">
        {slides[nextIndex].feature_image?.url && (
          <Image src={slides[nextIndex].feature_image.url} alt="p" width={10} height={10} priority={false} />
        )}
      </div>

      {/* === AMBIENTE ACUÁTICO (FONDO) === */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Gradiente profundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#010307] to-[#020617]" />
        
        {/* Rayos de luz submarinos (Glows) */}
        <div className="absolute -top-40 left-1/4 w-[200px] h-[600px] bg-cyan-900/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen" />

        {/* Burbujas Flotantes (Partículas) */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full blur-[1px]"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: "-10%",
              scale: Math.random() * 2 + 0.5,
            }}
          />
        ))}
        
        {/* Textura de ruido sutil para simular agua */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container mx-auto px-4 md:pl-32 md:pr-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 min-h-[500px]">
          
          {/* --- COLUMNA IZQUIERDA: IMAGEN FLOTANTE --- */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-center relative h-[400px] md:h-[500px]">
            
            {/* Ondas de agua detrás de la imagen */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-[300px] h-[300px] border border-cyan-500/10 rounded-full animate-[ping_4s_linear_infinite]" />
               <div className="w-[300px] h-[300px] border border-cyan-500/10 rounded-full animate-[ping_4s_linear_infinite_1s] absolute" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full max-w-[500px] aspect-[4/3] z-10"
              >
                {currentSlide.feature_image?.url ? (
                  <Image
                    src={currentSlide.feature_image.url}
                    alt="Feature visualization"
                    fill
                    className="object-contain " // Sombra Cyan
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- COLUMNA DERECHA: TARJETA "LIQUID GLASS" --- */}
          <div className="flex-1 w-full flex flex-col items-center lg:items-start relative">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current}`}
                initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                // ESTILO "CRISTAL MOJADO"
                className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-12 w-full max-w-lg border border-white/10 shadow-2xl backdrop-blur-2xl bg-gradient-to-b from-white/[0.03] to-cyan-900/[0.05]"
              >
                {/* Brillo especular (Reflejo de agua) */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
                <div className="absolute rounded-full pointer-events-none" />

                {/* Icono  */}
                {currentSlide.card_info?.image?.url && (
                  <div className="mb-8 inline-flex">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center relative  backdrop-blur-md">
                       {/* Gota decorativa SVG */}
                       
                       
                       <Image 
                         src={currentSlide.card_info.image.url} 
                         alt="Icon" 
                         width={40} 
                         height={40} 
                         className="object-contain relative z-10 drop-shadow-md" 
                       />
                    </div>
                  </div>
                )}

                {/* Título */}
                <h3 
                  className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-100 mb-6 leading-[1.1] tracking-wide drop-shadow-sm"
                  style={{ fontFamily: "var(--titan-one-regular)" }}
                >
                  {currentSlide.card_info.title}
                </h3>

                {/* Descripción */}
                <p className="text-blue-100/70 text-lg leading-relaxed font-medium">
                  {currentSlide.card_info.description}
                </p>

              </motion.div>
            </AnimatePresence>

            {/* --- CONTROLES DE NAVEGACIÓN --- */}
            {slides.length > 1 && (
              <div className="flex items-center gap-6 mt-12">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-full border border-cyan-500/20 bg-cyan-950/10 flex items-center justify-center text-cyan-100 hover:bg-cyan-500 hover:text-black transition-all active:scale-90 backdrop-blur-md shadow-lg group"
                >
                  <ChevronLeft size={28} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                
                {/* Indicadores "Gotas de agua" */}
                <div className="flex items-center gap-3 px-6 h-14 rounded-full border border-white/5 bg-black/20 backdrop-blur-xl">
                  {slides.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`relative transition-all duration-500 rounded-full ${
                        idx === current 
                          ? "w-4 h-4 bg-cyan-950 " 
                          : "w-2 h-2 bg-blue-900/50 hover:bg-cyan-700"
                      }`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-full border border-cyan-500/20 bg-cyan-950/10 flex items-center justify-center text-cyan-100 hover:bg-cyan-500 hover:text-black transition-all active:scale-90 backdrop-blur-md shadow-lg group"
                >
                  <ChevronRight size={28} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}