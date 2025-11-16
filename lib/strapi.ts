// src/lib/strapi.ts

import qs from "qs";
import { Post, StrapiResponse, HomePage, StrapiMedia } from "./types";

//url strapi
function getStrapiURL(): string {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
}

//token
function getStrapiToken(): string {
  const token = process.env.STRAPI_API_TOKEN;
  if (!token) {
    throw new Error("Error: STRAPI_API_TOKEN no está definido en .env.local");
  }
  return token;
}

//peticiones a la api con uso de Fetch
async function fetchStrapiAPI<T>(endpoint: string, query: object = {}, options: RequestInit = {}): Promise<T> {
  const apiUrl = getStrapiURL();
  const apiToken = getStrapiToken();

  const queryString = qs.stringify(query, {
    encodeValuesOnly: true,
  });

  const fetchUrl = `${apiUrl}${endpoint}?${queryString}`;
  
  console.log(`Querying Strapi: ${fetchUrl}`); //log

  const res = await fetch(fetchUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Error en la respuesta de Strapi:", errorBody);
    throw new Error(`Fallo al obtener datos de Strapi: ${res.statusText}`);
  }

  const data = await res.json();
  return data as T;
}

// --- INICIO DE LA CORRECCIÓN ---
// Esta es la interfaz que faltaba.
// Es para la respuesta de un "Single Type" (como la Homepage).
// Nota que 'data' NO es un array.
interface StrapiSingleResponse<T> {
  data: T;
  meta: object;
}
// --- FIN DE LA CORRECCIÓN ---


export async function getHomePageData(): Promise<HomePage> {
  const query = {
    // Le pedimos que "popule" la imagen
    populate: {
      hero_imagen: true, 
    },
  };

  // La ruta para Single Types es solo /api/nombre-del-tipo
  // Ahora TypeScript encontrará 'StrapiSingleResponse' y no dará error.
  const response = await fetchStrapiAPI<StrapiSingleResponse<HomePage>>(
    "/api/pagina-de-inicio", // <-- Asegúrate que coincida con tu API ID
    query,
    { cache: "no-store" }
  );

  // Strapi v5 aplana los 'attributes' en los Single Types también
  return response.data;
}

/**
 * Obtiene todos los posts publicados.
 */
export async function getStrapiPosts(): Promise<Post[]> {
  const query = {
    populate: "*",
    sort: { publishedAt: 'desc' }, //ordena
  };
  
  // Usamos StrapiResponse<Post> para tipar la respuesta completa
  const response = await fetchStrapiAPI<StrapiResponse<Post>>(
    "/api/posts", 
    query, 
    { cache: "no-store" } // Deshabilitar caché en desarrollo
  );
  
  return response.data; // Devolvemos solo el array de posts
}

//post de acuerdo al slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*",
  };

  const response = await fetchStrapiAPI<StrapiResponse<Post>>(
    "/api/posts", 
    query, 
    { cache: "no-store" }
  );

  if (response.data.length === 0) {
    return null; // No encontrado
  }

  return response.data[0]; // Devolvemos el primer (y único) post
}