// src/lib/types.ts

// Interfaz para un Post (estructura plana de Strapi v5)
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: any; // El 'any' es para el JSON de Blocks
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Añadiremos más campos aquí luego (ej: image)
}

// Interfaz para la respuesta genérica de la API de Strapi
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  url: string;        // La URL de Cloudinary
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}


export interface HomePage {
  id: number;
  hero_titulo: string;
  hero_subtitulo: string;
  hero_imagen: StrapiMedia; // Usamos la interfaz de Media
  // mas campos,
}