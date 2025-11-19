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

// La Home Page tiene un array de secciones
export type PageSection = HeroSectionData; 

export interface HomePage {
  id: number;
  title: string;
  description: string;
  // Usamos el tipo Unión aquí
  sections: PageSection[]; 

  navbar_logo: StrapiMedia;
}