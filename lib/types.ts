// /lib/types.ts

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  url: string;
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

export interface LinkComponent {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
}

// Definimos el componente Hero tal como viene en la sección
export interface HeroSectionData {
  id: number;
  __component: "layout.hero-section";
  hero_titulo: string;
  hero_subtitulo: string;
  hero_imagen: StrapiMedia;
  hero_background: StrapiMedia;
  link: LinkComponent;

}


//second section

// 1. Definimos la Tarjeta Individual
export interface HighlightCard {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
  hasGradient: boolean;
 
}

// 2. Definimos la Sección Completa
export interface HighlightsSectionData {
  id: number;
  __component: "layout.highlights-section";
  cards: HighlightCard[];
}

//section 

export interface BannerSectionData {
  id: number;
  __component: "layout.banner-section";
  banner_title: string;
  banner_subtitle: string;
  banner_image: StrapiMedia;
  link: LinkComponent;
  banner_badge: string;
}


// 1. Interfaz del Producto (Collection Type)

export interface ProductVariant {
  id: number;
  color_name: string;
  color_hex: string;
  product_images: StrapiMedia[];
}

export interface Product {
  id: number;
  documentId: string; // Strapi v5 usa documentId a veces para relaciones
  name: string;
  slug: string;
  price: number;
  description: string;
  features: string;
  images: StrapiMedia[];// Array de imágenes
  variants: ProductVariant[];
  
  // variants: ... (Lo definiremos cuando hagamos la página de detalle)
}

// 2. Interfaz de la Sección de Productos Destacados
export interface FeaturedProductsSectionData {
  id: number;
  __component: "layout.featured-products";
  section_title: string;
  products: Product[]; // Array de productos relacionados
}


// 1. Definimos la Diapositiva
export interface FeatureSlide {
  id: number;
  feature_image: StrapiMedia; // Imagen grande izquierda
  card_info: HighlightCard;   // Reutilizamos tu componente Card para la derecha
}

// 2. Definimos la Sección del Carrusel
export interface CarouselSectionData {
  id: number;
  __component: "layout.carousel-section";
  slides: FeatureSlide[];
}

export interface DownloadAppSectionData {
  id: number;
  __component: "layout.download-app-section";
  title: string;
  description: string;
  app_image: StrapiMedia;
  download_link: LinkComponent;
}
// La Home Page tiene un array de secciones
export type PageSection = 
  HeroSectionData | 
  HighlightsSectionData | 
  BannerSectionData | 
  FeaturedProductsSectionData | 
  CarouselSectionData | 
  DownloadAppSectionData;

export interface HomePage {
  id: number;
  title: string;
  description: string;
  // Usamos el tipo Unión aquí
  sections: PageSection[]; 

  navbar_logo: StrapiMedia;
}