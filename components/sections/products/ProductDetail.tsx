"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { 
  
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  ChevronDown,
  ChevronUp,
  
  
} from "lucide-react";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  // Estado para acordeón de características (opcional, si es muy largo)
  const [showFeatures, setShowFeatures] = useState(false);

  const currentImages = 
    product.variants && product.variants.length > 0 
      ? product.variants[selectedVariantIndex].product_images 
      : product.images;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariantIndex]);

  const renderContent = (content: any, className = "") => {
    if (!content) return null;
    if (typeof content === 'string') {
      return <p className={`whitespace-pre-line ${className}`}>{content}</p>;
    }
    if (Array.isArray(content)) {
      return (
        <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
          <BlocksRenderer content={content as BlocksContent} />
        </div>
      );
    }
    return null;
  };

  if (!currentImages || currentImages.length === 0) return <div className="pt-32 text-center text-white">Sin imágenes.</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6 md:pl-32 md:pr-12">
      <div className="container mx-auto max-w-6xl">
        
       

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          
          {/* ============================================== */}
          {/* COLUMNA IZQUIERDA: GALERÍA COMPACTA */}
          {/* ============================================== */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImages[selectedImageIndex]?.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {currentImages[selectedImageIndex] && (
                    <Image
                      src={currentImages[selectedImageIndex].url}
                      alt={product.name}
                      fill
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Miniaturas Pequeñas */}
            {currentImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {currentImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`
                      relative w-14 h-14 flex-shrink-0 bg-[#0a0a0a] rounded-lg overflow-hidden border transition-all
                      ${selectedImageIndex === idx 
                        ? "border-white opacity-100" 
                        : "border-transparent opacity-50 hover:opacity-100 hover:border-white/20"
                      }
                    `}
                  >
                    <Image src={img.url} alt="thumb" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================================== */}
          {/* COLUMNA DERECHA: INFO (LIMPIA Y COMPACTA) */}
          {/* ============================================== */}
          <div className="w-full lg:w-[45%] flex flex-col pt-2">
            
            {/* 1. Título y Precio Integrados */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight font-sans">
              {product.name}
            </h1>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl font-medium text-white">
                S/. {product.price.toFixed(2)}
              </span>
              {/* Badge opcional */}
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wide rounded-sm">
                En Stock
              </span>
            </div>

            {/* 2. Descripción Corta (Directa, sin cajas) */}
            <div className="mb-8 text-sm text-neutral-400 leading-relaxed">
              {renderContent(product.description)}
            </div>

            {/* 3. Selector de Color (Más pequeño) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Color</span>
                  <span className="text-xs text-neutral-500 uppercase">{product.variants[selectedVariantIndex].color_name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                        ${selectedVariantIndex === index 
                          ? "ring-1 ring-offset-2 ring-offset-[#050505] ring-white scale-100" 
                          : "hover:scale-110 opacity-70 hover:opacity-100"
                        }
                      `}
                      style={{ backgroundColor: variant.color_hex }}
                      title={variant.color_name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 4. Botones Compactos */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 bg-white text-black h-11 rounded-lg font-bold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                <span>Comprar Ahora</span>
             
              </button>
              <button className="flex-1 border border-neutral-800 h-11 rounded-lg font-medium text-sm hover:border-neutral-600 hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2 text-white">
                <ShoppingCart size={16} />
                <span>Añadir al carrito</span>
              </button>
            </div>

            {/* 5. Características (Acordeón Minimalista) */}
            {product.features && (
              <div className="border-t border-neutral-900 pt-4">
                <button 
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="flex items-center justify-between w-full py-2 text-left group"
                >
                  <span className="text-xs font-bold text-white uppercase tracking-wider ">Características Técnicas</span>
                  {showFeatures ? <ChevronUp  size={14} className="text-neutral-500"/> : <ChevronDown size={14} className="text-neutral-500"/>}
                </button>
                
                <AnimatePresence>
                  {showFeatures && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-2 text-sm text-neutral-400 leading-relaxed space-y-2">
                        {renderContent(product.features)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* 6. Footer de confianza (Más sutil) */}
            <div className="mt-8 flex gap-6 pt-6 border-t border-neutral-900">
              <div className="flex items-center gap-2 text-neutral-500">
                <Truck size={14} />
                <span className="text-[10px] font-medium uppercase tracking-wide">Envío Gratis &gt; S/.200</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-medium uppercase tracking-wide">Garantía 12 Meses</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}