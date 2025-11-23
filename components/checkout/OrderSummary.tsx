"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";

export function OrderSummary() {
  // Importamos las funciones para modificar el carrito
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart();

  // Lógica de envío
  const shippingCost = cartTotal > 200 ? 0 : 15;
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="backdrop-blur-2xl bg-gradient-to-b from-white/[0.03] to-cyan-900/[0.05] border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6 font-sans">Resumen del Pedido</h3>

      {/* Lista de Productos con Scroll */}
      <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.uniqueId}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              {/* 1. IMAGEN CON LINK */}
              <Link 
                href={`/productos/${item.slug}`} 
                className="relative w-20 h-20 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 border border-white/5 hover:border-cyan-500/30 transition-colors group cursor-pointer"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-gray-600">
                    Sin img
                  </div>
                )}
              </Link>

              {/* INFO Y CONTROLES */}
              <div className="flex-1 flex flex-col justify-between min-h-[80px]">
                
                {/* Encabezado: Nombre y Botón Eliminar */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    {/* 2. NOMBRE CON LINK */}
                    <Link href={`/productos/${item.slug}`}>
                      <p className="text-sm font-bold text-gray-200 line-clamp-1 hover:text-cyan-400 transition-colors cursor-pointer">
                        {item.name}
                      </p>
                    </Link>
                    {item.variant && (
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                        <span 
                          className="w-2 h-2 rounded-full inline-block ring-1 ring-white/10" 
                          style={{ backgroundColor: item.variant.color }} 
                        />
                        {item.variant.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Botón Eliminar */}
                  <button 
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="text-gray-600 hover:text-red-400 transition-colors p-1 -mr-1"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Pie: Controles de Cantidad y Precio */}
                <div className="flex items-end justify-between mt-2">
                  
                  {/* 3. CONTROLES DE CANTIDAD */}
                  <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                    <button 
                      onClick={() => updateQuantity(item.uniqueId, -1)} 
                      className="text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.uniqueId, 1)} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="text-sm font-bold text-white">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cálculos */}
      <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span>S/. {cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Envío</span>
          {shippingCost === 0 ? (
            <span className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-0.5 rounded">GRATIS</span>
          ) : (
            <span>S/. {shippingCost.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Total Final */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
        <span className="text-lg font-bold text-white">Total</span>
        <div className="text-right">
          <span className="text-xs text-gray-500 block mb-0.5">PEN</span>
          <span className="text-2xl font-bold text-white">
            S/. {finalTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}