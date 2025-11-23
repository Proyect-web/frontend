// src/components/cart/CartModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartModal() {
  const { isCartOpen, closeCart, items, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Fondo Oscuro (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Panel del Carrito */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="text-cyan-400" /> Tu Carrito
              </h2>
              <button onClick={closeCart} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-blue-400 transition">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <ShoppingBag size={64} strokeWidth={1} className="opacity-50" />
                  <p className="text-lg">Tu carrito está vacío</p>
                  <button onClick={closeCart} className="text-cyan-400 hover:underline">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout 
                    key={item.uniqueId} 
                    className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
                  >
                    {/* Imagen */}
                    <div className="relative w-20 h-20 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">Sin img</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                        {item.variant && (
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.variant.color }} />
                            {item.variant.name}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-cyan-400">S/. {item.price.toFixed(2)}</p>
                        
                        {/* Controles Cantidad */}
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                          <button onClick={() => updateQuantity(item.uniqueId, -1)} className="text-gray-400 hover:text-white">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.uniqueId, 1)} className="text-gray-400 hover:text-white">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Eliminar */}
                    <button 
                      onClick={() => removeFromCart(item.uniqueId)} 
                      className="text-gray-500 hover:text-red-400 self-start p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-2xl font-bold text-white">S/. {cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                  href="/checkout" // Puedes crear esta página luego
                  onClick={closeCart}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95"
                >
                  Continuar
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}