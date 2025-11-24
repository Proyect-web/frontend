"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const { items, removeFromCart } = useCart(); // Usamos esto para limpiar
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("payment_id"); // Viene de Mercado Pago
  const status = searchParams.get("status");        // Viene de Mercado Pago

  // Limpiar carrito al entrar si el pago fue exitoso
  useEffect(() => {
    if (status === "approved") {
      // Borramos todos los items (uno por uno o reseteando el localStorage)
      // Como tu contexto no tiene 'clearCart', podemos borrar el localStorage directamente
      localStorage.removeItem("h2go_cart");
      // Opcional: forzar recarga para limpiar estado visual si es necesario
      // window.location.reload(); 
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
        
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="text-green-500 w-10 h-10" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--titan-one-regular)" }}>
          ¡Pago Exitoso!
        </h1>
        
        <p className="text-gray-400 mb-8">
          Gracias por tu compra. Tu pedido ha sido registrado correctamente y te enviaremos un correo con los detalles.
        </p>

        <div className="bg-white/5 rounded-xl p-4 mb-8 text-left space-y-2 border border-white/5">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Pedido ID:</span>
            <span className="text-sm text-white font-mono">{orderId || "---"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Operación MP:</span>
            <span className="text-sm text-white font-mono">{paymentId || "---"}</span>
          </div>
          <div className="flex justify-between">
             <span className="text-sm text-gray-500">Estado:</span>
             <span className="text-sm text-green-400 font-bold uppercase">{status || "Aprobado"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/" 
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Volver al Inicio
          </Link>
          <Link 
            href="/#tienda" 
            className="w-full py-3 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Seguir Comprando
          </Link>
        </div>

      </div>
    </div>
  );
}