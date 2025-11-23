// src/components/checkout/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Mail, Phone, Truck } from "lucide-react";

export function CheckoutForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // AQUÍ CONECTAREMOS CON LA PASARELA DE PAGO EN EL FUTURO
    console.log("Datos de envío listos para procesar:", formData);
    alert("¡Datos guardados! Pasando al pago... (Próximamente)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Sección 1: Información de Contacto */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="text-cyan-400" size={20} /> Información de Contacto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">Nombre</label>
            <input 
              required
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
              placeholder="Ej: Juan"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">Apellido</label>
            <input 
              required
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
              placeholder="Ej: Pérez"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 relative">
            <label className="text-xs text-gray-400 ml-1">Email</label>
            <Mail className="absolute top-8 right-4 text-gray-600" size={16} />
            <input 
              required
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
              placeholder="juan@ejemplo.com"
            />
          </div>
          <div className="space-y-1 relative">
            <label className="text-xs text-gray-400 ml-1">Teléfono</label>
            <Phone className="absolute top-8 right-4 text-gray-600" size={16} />
            <input 
              required
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
              placeholder="999 999 999"
            />
          </div>
        </div>
      </motion.div>

      {/* Sección 2: Dirección de Envío */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="border-t border-white/10 my-6" />
        
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Truck className="text-cyan-400" size={20} /> Dirección de Envío
        </h2>

        <div className="space-y-1 relative">
          <label className="text-xs text-gray-400 ml-1">Dirección y Número</label>
          <MapPin className="absolute top-8 right-4 text-gray-600" size={16} />
          <input 
            required
            type="text" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
            placeholder="Av. Principal 123, Dpto 401"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">Ciudad / Distrito</label>
            <input 
              required
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
              placeholder="Lima"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">Código Postal (Opcional)</label>
            <input 
              type="text" 
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
              placeholder="15001"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-400 ml-1">Notas de entrega (Opcional)</label>
          <textarea 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600 resize-none"
            placeholder="Referencia: Casa de rejas blancas..."
          />
        </div>
      </motion.div>

      {/* Botón Continuar */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-4 mt-6 bg-gradient-to-r from-blue-500 to-sky-300 border-cyan-500/30 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
      >
        Continuar al Pago
      </motion.button>

    </form>
  );
}