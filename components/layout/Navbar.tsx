// src/components/layout/Navbar.tsx
"use client"; // <-- ¡AÑADIDO EN LÍNEA 1!

import Link from "next/link";
import { Menu, User, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion"; // Importamos motion

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#caracteristicas", label: "Características" },
  { href: "/#especificaciones", label: "Especificaciones" },
  { href: "/#galeria", label: "Galería" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 py-5 px-4 sm:px-6 lg:px-8 
                 bg-black/20 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        
        {/* 1. Logo (Izquierda) */}
        <Link href="/" className="text-2xl font-bold text-white uppercase tracking-widest">
          h2go
        </Link>

        {/* 2. Links (Centro) */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white text-sm font-medium uppercase tracking-wider 
                         transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-1/2 w-0 h-0.5 bg-cyan-400 
                             transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* 3. Iconos (Derecha) */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-300 hover:text-white transition-colors duration-300">
            <User size={20} />
          </button>
          <button className="text-gray-300 hover:text-white transition-colors duration-300">
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Botón de Menú Móvil (Solo visible en móviles) */}
        <div className="md:hidden">
          <button className="text-white p-2">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </motion.nav>
  );
}