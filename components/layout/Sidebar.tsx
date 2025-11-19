// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  Menu as MenuIcon,
  X
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
  { icon: Heart, label: "Beneficios", href: "/#philantropia" },
];

export default function Sidebar({ logoUrl }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideLogoText, setHideLogoText] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHideLogoText(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú móvil al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ============================================================== */}
      {/* TOP BAR MÓVIL (< md) */}
      {/* ============================================================== */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-black/90 backdrop-blur-md md:hidden border-b border-white/10"
      >
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image src={logoUrl} alt="Logo" width={28} height={28} className="object-contain"/>
            </div>
          ) : (
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
              <span className="text-base sm:text-lg font-black text-white">H2</span>
            </div>
          )}
          <span className="text-lg sm:text-xl font-black text-white">GOH2</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative text-white hover:text-blue-400 transition-colors">
            <ShoppingCart size={22} className="sm:hidden" />
            <ShoppingCart size={24} className="hidden sm:block" />
            <span className="absolute -top-1 -right-1 text-[9px] sm:text-[10px] bg-red-600 rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center font-bold">0</span>
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white hover:text-blue-400 transition-colors p-1"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={26} className="sm:hidden" /> : <MenuIcon size={26} className="sm:hidden" />}
            {isMobileMenuOpen ? <X size={28} className="hidden sm:block" /> : <MenuIcon size={28} className="hidden sm:block" />}
          </button>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* MENÚ MÓVIL DESPLEGABLE (OVERLAY) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] sm:max-w-[380px] bg-black/95 backdrop-blur-xl md:hidden flex flex-col overflow-y-auto"
            >
              {/* Header del menú */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white">Menú</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-red-400 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Contenido del menú */}
              <div className="flex flex-col gap-3 p-4 sm:p-6">
                {menuItems.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-4 p-3.5 sm:p-4 rounded-xl font-bold transition-all
                      ${item.active 
                        ? "bg-[#0097B2] text-black shadow-lg" 
                        : "bg-white/5 hover:bg-white/10 text-white"
                      }
                    `}
                  >
                    <item.icon size={24} />
                    <span className="text-base sm:text-lg">{item.label}</span>
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-2" />

                {extraItems.map((item, index) => (
                   <Link 
                    key={index} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors"
                  >
                    <item.icon size={24} />
                    <span className="text-base sm:text-lg">{item.label}</span>
                  </Link>
                ))}

                 <Link 
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 mt-4 p-3.5 sm:p-4 bg-[#0097B2] text-black font-bold rounded-xl hover:bg-[#0097B2]/90 transition-colors"
                  >
                    <LogIn size={20} />
                    <span className="text-base sm:text-lg">Iniciar Sesión</span>
                  </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* SIDEBAR ESCRITORIO (>= md) */}
      {/* ============================================================== */}
      <div className="hidden md:block">
        
        {/* TOP BAR Desktop: Login / Carrito */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-4 md:top-6 right-4 md:right-6 z-50 flex items-center gap-3 md:gap-4"
        >
          <button className="hidden md:flex items-center gap-2 lg:gap-3 px-4 py-2 md:px-6 md:py-2.5 lg:px-5 lg:py-2 bg-black hover:bg-gray-800 text-white rounded-full text-sm md:text-xs lg:text-sm font-bold transition-all border border-white/10 shadow-lg hover:shadow-xl">
            <span className="hidden lg:inline">Iniciar sesión</span>
            <span className="lg:hidden">Login</span>
            <LogIn size={18} className="md:hidden" />
            <LogIn size={20} className="hidden md:block lg:hidden" />
            <LogIn size={22} className="hidden lg:block" />
          </button>

          <button className="text-white transition-colors hover:text-blue-400 relative group">
            <ShoppingCart size={28} className="md:hidden" />
            <ShoppingCart size={32} className="hidden md:block lg:hidden" />
            <ShoppingCart size={36} className="hidden lg:block" />
            <span className="absolute -top-1 -right-1 text-[10px] md:text-xs bg-red-600 rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">0</span>
          </button>

        </motion.div>

        {/* LOGO + MENÚ PRINCIPAL */}
        <div className="fixed top-8 md:top-12 left-3 md:left-4 lg:left-6 z-50 flex flex-col gap-4 md:gap-5 lg:gap-6 items-start">

          {/* LOGO + TEXTO GOH2 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2 md:gap-3 lg:gap-4 pl-1 md:pl-2 mb-2 group">
              {logoUrl ? (
                <div className="relative w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                  <Image 
                    src={logoUrl} 
                    alt="Logo" 
                    width={36}
                    height={36}
                    className="object-contain md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px]"
                  />
                </div>
              ) : (
                <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="font-bold text-white text-base md:text-lg lg:text-xl">H2</span>
                </div>
              )}

              {/* TEXTO GOH2 - Se oculta con scroll */}
              <AnimatePresence>
                {!hideLogoText && (
                  <motion.span
                    initial={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl md:text-2xl lg:text-xl font-black text-white tracking-tight drop-shadow-md"
                  >
                    GOH2
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* MENÚ FLOTANTE (PÍLDORA) */}
          {/* MENÚ FLOTANTE (PÍLDORA) - MÁS PEQUEÑO */}
          <motion.nav
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative flex flex-col bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-4xl md:rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
              width: isHovered ? "220px" : "75px",
              minHeight: "420px",
              padding: "8px",
              transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            
            {/* Lista Principal */}
            <div className="flex flex-col gap-1.5 md:gap-2">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className={`
                    relative flex items-center h-11 md:h-12 lg:h-13 px-2.5 md:px-3 lg:px-3.5 rounded-[1.25rem] md:rounded-[1.5rem] transition-all duration-300 group
                    ${item.active 
                      ? "bg-button text-black font-bold shadow-[0_0_18px_rgba(0,151,178,0.5)]" 
                      : "text-gray-100 hover:text-white hover:bg-white/8"
                    }
                  `}
                >
                  <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 shrink-0">
                    <item.icon 
                      size={22}
                      className="md:hidden"
                      strokeWidth={item.active ? 2.5 : 2} 
                    />
                    <item.icon 
                      size={24}
                      className="hidden md:block lg:hidden"
                      strokeWidth={item.active ? 2.5 : 2} 
                    />
                    <item.icon 
                      size={26}
                      className="hidden lg:block"
                      strokeWidth={item.active ? 2.5 : 2} 
                    />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2.5 md:ml-3 text-xs md:text-sm lg:text-[15px] font-semibold whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>

            {/* Separador Extras */}
            <div className="mt-5 md:mt-6 mb-2 px-2.5 md:px-3">
              <AnimatePresence>
                {isHovered ? (
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="text-[9px] md:text-[10px] lg:text-xs font-bold text-gray-100 uppercase tracking-widest"
                  >
                    Extras
                  </motion.span>
                ) : (
                  <div className="h-0.5 w-full bg-white/10 mx-auto rounded-full" />
                )}
              </AnimatePresence>
            </div>

            {/* Lista Extras */}
            <div className="flex flex-col gap-1.5 md:gap-2">
              {extraItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className="relative flex items-center h-11 md:h-12 lg:h-13 px-2.5 md:px-3 lg:px-3.5 rounded-[1.25rem] md:rounded-[1.5rem] text-gray-100 hover:text-white hover:bg-white/8 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 shrink-0">
                    <item.icon size={22} className="md:hidden" strokeWidth={2} />
                    <item.icon size={24} className="hidden md:block lg:hidden" strokeWidth={2} />
                    <item.icon size={26} className="hidden lg:block" strokeWidth={2} />
                  </div>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-2.5 md:ml-3 text-xs md:text-sm lg:text-[15px] font-semibold whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>

            {/* Decorativo gradiente */}
            <div className="absolute bottom-0 left-0 right-0 h-28 md:h-32 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none rounded-b-[2rem] md:rounded-b-[2.5rem] lg:rounded-b-[3rem]" />
          </motion.nav>
        </div>
      </div>
    </>
  );
}