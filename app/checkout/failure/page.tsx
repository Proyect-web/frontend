"use client";

import Link from "next/link";
import { useEffect, Suspense } from "react";
import { XCircle, Home, ShoppingBag, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Componente que lee los parámetros de la URL
function FailureContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    return (
        <div className="bg-white/5 rounded-xl p-4 mb-8 text-left space-y-2 border border-red-500/20">
            <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-red-400" size={18} />
                <span className="text-sm font-bold text-red-400">Detalles del Error</span>
            </div>
            <div className="flex justify-between">
                <span className="text-sm text-gray-500">Pedido ID:</span>
                <span className="text-sm text-white font-mono">{orderId || "---"}</span>
            </div>
            {paymentId && (
                <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Operación MP:</span>
                    <span className="text-sm text-white font-mono">{paymentId}</span>
                </div>
            )}
            <div className="flex justify-between">
                <span className="text-sm text-gray-500">Estado:</span>
                <span className="text-sm text-red-400 font-bold uppercase">{status || "Rechazado"}</span>
            </div>
        </div>
    );
}

export default function FailurePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <XCircle className="text-red-500 w-10 h-10" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--titan-one-regular)" }}>
                    Algo salió mal...
                </h1>

                <p className="text-gray-400 mb-8">
                    No pudimos procesar tu pago. Por favor, intenta nuevamente con otro medio de pago o verifica tus datos.
                </p>

                {/* Detalles del error */}
                <Suspense fallback={<div className="text-gray-500 text-sm py-4">Cargando detalles...</div>}>
                    <FailureContent />
                </Suspense>

                {/* Sugerencias */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 text-left">
                    <h3 className="text-sm font-bold text-yellow-400 mb-2">¿Qué puedo hacer?</h3>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Verifica que tu tarjeta tenga fondos suficientes</li>
                        <li>• Asegúrate de que los datos sean correctos</li>
                        <li>• Intenta con otro medio de pago</li>
                        <li>• Contacta a tu banco si el problema persiste</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/checkout"
                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={18} />
                        Pagar con otro medio
                    </Link>
                    <Link
                        href="/"
                        className="w-full py-3 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Volver al Inicio
                    </Link>
                </div>

            </div>
        </div>
    );
}
