// src/app/posts/[slug]/page.tsx

import qs from "qs";
import Link from "next/link";
// ¡EL NUEVO IMPORT!
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

/*
 * 1. Definimos las Interfaces (igual que en la homepage)
 */
interface Post {
  id: number;
  title: string;
  slug: string;
  content: any; // El 'any' es para el JSON de Blocks
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/*
 * 2. Función de Fetch para UN SOLO Post por Slug
 */
async function getPostBySlug(slug: string): Promise<Post | null> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (!apiToken) {
    throw new Error("Error: STRAPI_API_TOKEN no está definido.");
  }

  // Query para filtrar por slug
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*", // Aún queremos todos los campos
  }, {
    encodeValuesOnly: true,
  });

  const fetchUrl = `${apiUrl}/api/posts?${query}`;
  console.log(`Querying Strapi (Single Post): ${fetchUrl}`);

  const res = await fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Error en la respuesta de Strapi:", errorBody);
    throw new Error(`Fallo al obtener datos de Strapi: ${res.statusText}`);
  }

  const strapiData: StrapiResponse = await res.json();

  // La API de filtros SIEMPRE devuelve un array,
  // así que tomamos el primer elemento.
  if (strapiData.data.length === 0) {
    return null; // No encontrado
  }

  return strapiData.data[0];
}

/*
 * 3. El Componente de la Página de Detalle
 */
// Next.js nos pasa los 'params' (el slug) automáticamente
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  // Manejo si el post no se encuentra
  if (!post) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-6">
          Error 404 - Post No Encontrado
        </h1>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Volver al inicio
        </Link>
      </main>
    );
  }

  // 4. Renderizado (El "Diseño")
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        &larr; Volver a todos los posts
      </Link>
      
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        {post.title}
      </h1>
      
      <p className="text-gray-500 text-sm mb-8">
        Publicado: {new Date(post.publishedAt).toLocaleDateString()}
      </p>

      {/* AQUÍ ESTÁ LA MAGIA:
        Usamos BlocksRenderer para interpretar el JSON de Strapi
      */}
      <div className="prose lg:prose-xl max-w-none">
        <BlocksRenderer content={post.content} />
      </div>
    </main>
  );
}