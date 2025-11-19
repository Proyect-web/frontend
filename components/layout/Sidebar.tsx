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
  Menu // Icono menú para móvil
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
];

const extraItems = [
  { icon: Heart, label: "Beneficios", href: "/#philantropia" },
];

export default function Sidebar({ logoUrl }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para menú móvil

  return (
    <>
      {/* ============================================================== */}
      {/* TOP BAR (MÓVIL Y ESCRITORIO) */}
      {/* ============================================================== */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 md:justify-end pointer-events-none">
        
        {/* Logo en Móvil (Solo visible en pantallas pequeñas) */}
        <Link href="/" className="flex items-center gap-2 md:hidden pointer-events-auto">
           {logoUrl ? (
             <div className="relative w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden">
               <Image src={logoUrl} alt="Logo" width={30} height={30} className="object-contain"/>
             </div>
           ) : (
             <span className="text-xl font-black text-white">H2</span>
           )}
           <span className="text-xl font-black text-white">GOH2</span>
        </Link>

        {/* Acciones Derecha (Login / Carrito) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-black hover:bg-gray-900 text-white rounded-full text-sm font-bold transition-all border border-white/10 shadow-lg">
            <span>Iniciar sesión</span>
            <LogIn size={18} />
          </button>
          
          <button className="relative p-2 bg-black/50 rounded-full border border-white/10 text-white hover:text-blue-400 transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
          </button>

          {/* Botón Menú Hamburguesa (Solo Móvil) */}
          <button 
            className="md:hidden p-2 bg-black/50 rounded-full border border-white/10 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SIDEBAR (SOLO ESCRITORIO - md:flex) */}
      {/* ============================================================== */}
      <div className="hidden md:flex fixed top-12 left-6 z-40 flex-col gap-6 items-start">
        
        {/* Logo Desktop */}
        <Link href="/" className="flex items-center gap-4 pl-2 mb-2 group">
          {logoUrl ? (
             <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
               <Image src={logoUrl} alt="Logo" width={60} height={60} className="object-contain"/>
             </div>
          ) : (
            <div className="relative w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-xl">H2</span>
            </div>
          )}
          <span className="text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-md">GOH2</span>
        </Link>

        {/* Menú Píldora Desktop */}
        <motion.nav
          className="relative flex flex-col bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
          initial={{ width: "80px" }}
          animate={{ width: isHovered ? "280px" : "80px" }}
          transition={{ duration: 0.4, type: "spring", bounce: 0, damping: 20 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ height: "auto", minHeight: "500px", padding: "12px" }}
        >
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className={`relative flex items-center h-14 px-3.5 rounded-full transition-all duration-300 group ${item.active ? "bg-[#0097B2] text-black font-bold" : "text-gray-100 hover:bg-white/10"}`}
              >
                <div className="flex items-center justify-center w-10 h-10 shrink-0">
                  <item.icon size={28} strokeWidth={item.active ? 2.5 : 2} />
                </div>
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-4 text-[16px] font-semibold whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>
          {/* ... (Extras y demás igual que tu código) ... */}
        </motion.nav>
      </div>

      {/* ============================================================== */}
      {/* MENÚ MÓVIL (OVERLAY) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-xl font-bold text-white hover:text-blue-400"
                >
                  <item.icon size={28} />
                  {item.label}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
               <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-xl font-bold text-green-400"
                >
                  <LogIn size={28} />
                  Iniciar Sesión
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}