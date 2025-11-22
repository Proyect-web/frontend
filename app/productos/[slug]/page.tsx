// src/app/productos/[slug]/page.tsx
import { getProductBySlug } from "@/lib/strapi";
import { ProductDetail } from "@/components/sections/products/ProductDetail";
import { Metadata } from "next";

// 1. 'params' es una Promesa
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generar Metadata SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  
  // --- CORRECCIÓN AQUÍ ---
  // Verificamos si description es un string antes de cortar.
  // Si es un objeto (Rich Text), usamos un texto por defecto.
  const seoDescription = (typeof product.description === 'string')
    ? product.description.substring(0, 160)
    : `Compra ${product.name} al mejor precio en h2go.`;

  return {
    title: `${product.name} | h2go`,
    description: seoDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}