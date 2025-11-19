// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Ticket, 
  Gift, 
  Gamepad2, 
  ShoppingBag, 
  Heart,
  LogIn,
  ShoppingCart,

} from "lucide-react";

interface SidebarProps {
  logoUrl?: string | null;
}

const menuItems = [
  { icon: Home, label: "Inicio", href: "/", active: true },
  { icon: Ticket, label: "Caracteristicas", href: "/#caracteristicas" },
  { icon: ShoppingBag, label: "Tienda", href: "/#tienda" },
  { icon: Gift, label: "Especificaciones", href: "/#especificaciones" },
  { icon: Gamepad2, label: "Eventos", href: "/#eventos" },
  { icon: Gamepad2, label: "Galeria", href: "/#galeria" },

];

const extraItems = [
  { icon: Heart, label: "Beneficios ", href: "/#philantropia" },
];

export default function Sidebar({ logoUrl }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Top Bar para Login/Carrito (Fijo arriba a la derecha) */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button className="hidden md:flex items-center gap-3 px-7 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-lg font-bold transition-all border border-white/10 shadow-lg">
          <span>Iniciar sesión</span>
          <LogIn size={22} />
        </button>
        
        {/* Carrito */}
        <button className="text-white transition-colors hover:text-blue-400 relative">
          <ShoppingCart size={36} />
          <span className="absolute -top-1 -right-1 text-xs bg-red-600 rounded-full w-5 h-5 flex items-center justify-center font-bold">
            0
          </span>
        </button>
      </div>

      {/* Contenedor Principal Izquierdo (Logo + Menú) */}
      <div className="fixed top-12 left-6 z-50 flex flex-col gap-6 items-start">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 pl-2 mb-2 group">
          {logoUrl ? (
             <div className="relative w-24 h-24 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
               <Image 
                 src={logoUrl} 
                 alt="Logo" 
                 width={70}
                 height={70}
                 className="object-contain"
               />
             </div>
          ) : (
            <div className="relative w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-xl">H2</span>
            </div>
          )}
          {/* Texto del Logo */}
          <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
            GOH2
          </span>
        </Link>

        {/* MENÚ FLOTANTE (PÍLDORA) - MÁS GRANDE */}
        <motion.nav
          className="relative flex flex-col bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-[3.5rem] shadow-2xl overflow-hidden"
          initial={{ width: "100px" }} // Ancho colapsado más grande
          animate={{ width: isHovered ? "300px" : "100px" }} // Ancho expandido más amplio
          transition={{ duration: 0.4, type: "spring", bounce: 0, damping: 20 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            height: "auto",
            minHeight: "580px",
            padding: "12px"
          }}
        >
          
          {/* Lista Principal */}
          <div className="flex flex-col gap-3">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className={`
                  relative flex items-center h-16 px-4 rounded-4xl transition-all duration-300 group
                  ${item.active 
                    ? "bg-[#0097B2] text-black font-bold shadow-[0_0_25px_rgba(28,111,217,0.5)]" 
                    : "text-gray-100 hover:text-white hover:bg-white/8"
                  }
                `}
              >
                {/* Icono MÁS GRANDE */}
                <div className="flex items-center justify-center w-10 h-10 shrink-0">
                  <item.icon size={32} strokeWidth={item.active ? 2.5 : 2} />
                </div>
                
                {/* Texto */}
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="ml-5 text-[17px] font-semibold whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Separador "Extras" */}
          <div className="mt-8 mb-3 px-5">
             <AnimatePresence>
               {isHovered ? (
                 <motion.span 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   exit={{ opacity: 0 }}
                   className="text-sm font-bold text-gray-100 uppercase tracking-widest"
                 >
                   Extras
                 </motion.span>
               ) : (
                 <div className="h-0.5 w-full bg-white/10 mx-auto rounded-full" />
               )}
             </AnimatePresence>
          </div>

          {/* Lista Extras */}
          <div className="flex flex-col gap-3">
            {extraItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="relative flex items-center h-16 px-5 rounded-4xl text-gray-100 hover:text-white hover:bg-white/8 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-10 h-10 shrink-0">
                  <item.icon size={32} strokeWidth={2} />
                </div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-5 text-[17px] font-semibold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Decoración de fondo (gradiente sutil) */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-blue-900/20 to-transparent pointer-events-none rounded-b-[3.5rem]" />

        </motion.nav>

      </div>
    </>
  );
}