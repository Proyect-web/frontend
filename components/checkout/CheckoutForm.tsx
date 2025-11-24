"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Mail, Phone, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CheckoutForm() {
  const { items, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  // ESTADO LIMPIO
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
  });

  // 🔹 Autocompletar datos del usuario
  useEffect(() => {
    const fillUserData = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000/api";

        const res = await fetch(`${apiUrl}/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const user = await res.json();
          setFormData((prev) => ({
            ...prev,
            firstName: user.nombre || "",
            email: user.email || "",
          }));
        }
      } catch (e) {
        console.error("Error al obtener perfil:", e);
      }
    };

    fillUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Procesar pedido y redirigir a Mercado Pago
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      alert("Tu sesión no es válida. Inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000/api";

      // URL del sitio actual para que MP retorne aquí
      const landingUrl = window.location.origin;

      const payload = {
        shippingData: {
                ...formData,
                lastName: "" // Aseguramos que lastName vaya vacío aunque no esté en el form
            },
        items: items,
        subtotal: cartTotal,
        total: cartTotal + (cartTotal > 200 ? 0 : 15),
        landingUrl: landingUrl, // ⬅ NUEVO
      };

      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const urlPago = data.sandbox_init_point || data.init_point;

        if (urlPago) {
          window.location.href = urlPago;
        } else {
          alert("Error: No se generó el link de pago.");
          setLoading(false);
        }
      } else {
        alert(`Error: ${data.error || "No se pudo procesar el pedido"}`);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
        alert("Error de conexión con el servidor.");
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ---------------------------------------------------------------------- */}
      {/* 🔹 INFORMACIÓN DE CONTACTO */}
      {/* ---------------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="text-cyan-400" size={20} /> Información de Contacto
        </h2>

        {/* Nombre */}
        <div className="space-y-1 relative">
          <label className="text-xs text-gray-400 ml-1">Nombre Completo</label>
          <User className="absolute top-8 right-4 text-gray-600" size={16} />
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-600"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        {/* Email - Teléfono */}
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

      {/* ---------------------------------------------------------------------- */}
      {/* 🔹 DIRECCIÓN DE ENVÍO */}
      {/* ---------------------------------------------------------------------- */}
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

        {/* Dirección */}
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

        {/* Ciudad - Zip */}
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
            <label className="text-xs text-gray-400 ml-1">
              Código Postal (Opcional)
            </label>
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

        {/* Notas */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400 ml-1">
            Notas de entrega (Opcional)
          </label>
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

      {/* ---------------------------------------------------------------------- */}
      {/* 🔹 BOTÓN MERCADO PAGO */}
      {/* ---------------------------------------------------------------------- */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full py-4 mt-6 bg-[#009EE3] hover:bg-[#0081b9] text-white font-bold text-lg rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>Procesando...</span>
        ) : (
          <>
            <span>Continuar con el pago</span>
            <CreditCard size={20} />
          </>
        )}
      </motion.button>
    </form>
  );
}
