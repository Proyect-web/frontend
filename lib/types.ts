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
}

// La Home Page tiene un array de secciones
export type PageSection = HeroSectionData | HighlightsSectionData | BannerSectionData;

export interface HomePage {
  id: number;
  title: string;
  description: string;
  // Usamos el tipo Unión aquí
  sections: PageSection[]; 

  navbar_logo: StrapiMedia;
}