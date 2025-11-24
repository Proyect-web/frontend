"use client";

import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Componente que maneja los searchParams
function CheckoutContent() {
  const { items } = useCart();
  const { setAuth } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      // Guardamos en localStorage Y actualizamos el contexto global
      localStorage.setItem("auth_token", tokenFromUrl);
      setAuth(tokenFromUrl);
      // Limpiamos la URL para que no se vea feo
      router.replace("/checkout");
    }
  }, [searchParams, router, setAuth]);

  // Si no hay items, mostramos un estado vacío
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-400 mb-8">Agrega productos innovadores antes de pasar por caja.</p>
        <Link
          href="/"
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-6xl">

        {/* Header Simple */}
        <div className="mb-10 flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-sans">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* COLUMNA IZQUIERDA: FORMULARIO (7 columnas) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckoutForm />
          </motion.div>

          {/* COLUMNA DERECHA: RESUMEN (5 columnas) */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OrderSummary />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// Componente principal con Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}