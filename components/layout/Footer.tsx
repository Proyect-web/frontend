"use client";

import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { XLogo, DiscordLogo, GithubLogo, InstagramLogo } from "@phosphor-icons/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#02040a] border-t border-white/5 pt-20 pb-20 overflow-hidden font-jost">
      {/* Fondo decorativo (Glows sutiles) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-8 md:px-16 lg:px-20 relative z-10 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* 1. COLUMNA MARCA */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1 group">
              <Image src={Logo} alt="h2go Logo" className="h-14 w-14 flex items-center justify-center"/>
              <span className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "var(--titan-one-regular)" }}>
                GOH2
              </span>
            </Link>
            
            {/* Redes Sociales */}
            <div className="flex gap-6">
              {[XLogo, GithubLogo, DiscordLogo, InstagramLogo ].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="flex items-center justify-center text-gray-400 hover:text-cyan-500 transition-all duration-300"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Entérate sobre nuestras novedades.
            </p>
          </div>

          {/* 2. ENLACES RÁPIDOS */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Recursos</h3>
            <ul className="space-y-4">
              {[
                { label: "Inicio", href: "/#inicio" },
                { label: "Características", href: "/#caracteristicas" },
                { label: "Tienda", href: "/#tienda" },
                { label: "App Móvil", href: "/#app" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyan-400 text-sm flex items-center gap-2 group transition all duration-300 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACTO */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <span>Tecsup - Trujillo, Perú</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <span>contacto@h2go.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {currentYear} h2go, Inc.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}