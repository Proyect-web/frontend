"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Product, ProductVariant } from "@/lib/types";

// Item dentro del carrito
export interface CartItem {
  uniqueId: string;
  id: number;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: {
    name: string;
    color: string;
  };
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, variantIndex?: number) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ======================
  // 1. Cargar carrito
  // ======================
  useEffect(() => {
    try {
      const stored = localStorage.getItem("h2go_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      console.error("Error al cargar carrito:", e);
    }
    setIsLoaded(true);
  }, []);

  // ======================
  // 2. Guardar carrito
  // ======================
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("h2go_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Error al guardar carrito:", e);
    }
  }, [items, isLoaded]);

  // ======================
  // Control de UI del carrito
  // ======================
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // ======================
  // Añadir al carrito
  // ======================
  const addToCart = (product: Product, variantIndex?: number) => {
    const variant: ProductVariant | null =
      typeof variantIndex === "number"
        ? product.variants?.[variantIndex] ?? null
        : null;

    // ID seguro basado en variant.id
    const uniqueId = variant
      ? `${product.id}-${variant.id}`
      : `${product.id}-default`;

    setItems((prev) => {
      // ¿Ya existe el item?
      const existing = prev.find((item) => item.uniqueId === uniqueId);

      if (existing) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Imagen correcta (variante o principal)
      let imageUrl = product.images?.[0]?.url ?? "";
      if (variant?.product_images?.length) {
        imageUrl = variant.product_images[0]?.url ?? imageUrl;
      }

      return [
        ...prev,
        {
          uniqueId,
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: imageUrl,
          variant: variant
            ? {
                name: variant.color_name,
                color: variant.color_hex,
              }
            : undefined,
        },
      ];
    });

    openCart();
  };

  // ======================
  // Eliminar del carrito
  // ======================
  const removeFromCart = (uniqueId: string) => {
    setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // ======================
  // Cambiar cantidad (0 → eliminar)
  // ======================
  const updateQuantity = (uniqueId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.uniqueId !== uniqueId) return item;

          const newQuantity = item.quantity + delta;

          if (newQuantity <= 0) return null;

          return { ...item, quantity: newQuantity };
        })
        .filter((x): x is CartItem => x !== null)
    );
  };

  // ======================
  // Cálculos derivados (optimizados)
  // ======================
  const cartCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const cartTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para consumir el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}