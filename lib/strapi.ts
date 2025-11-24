// /lib/strapi.ts
import qs from "qs";
import { HomePage } from "./types";
import { Product } from "./types"; 

function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
}

function getStrapiToken() {
  return process.env.STRAPI_API_TOKEN || "";
}

// 1. Añadir parámetro 'options' al fetch
async function fetchStrapiAPI<T>(endpoint: string, query: object = {}, options: RequestInit = {}): Promise<T> {
  const apiUrl = getStrapiURL();
  const apiToken = getStrapiToken();
  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  
  // 2. Usar opciones o fallback inteligente
  // Si no pasamos 'next' o 'cache', usamos 'no-store' por defecto para mantener tu lógica actual en productos,
  // PERO permitimos sobreescribirlo.
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    cache: options.next ? undefined : "no-store", // Si hay config 'next', dejamos que ella controle el caché
    ...options // Sobreescribimos con lo que nos pasen
  };

  const res = await fetch(`${apiUrl}${endpoint}?${queryString}`, fetchOptions);

  if (!res.ok) throw new Error(`Error Strapi: ${res.statusText}`);
  const json = await res.json();
  return json.data; 
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      images: true, 
      variants: {
        populate: {
          product_images: true 
        }
      }
    },
  };

  // Mantenemos comportamiento dinámico (o puedes añadir ISR aquí también si quieres)
  const data = await fetchStrapiAPI<Product[]>("/api/products", query);

  if (!data || data.length === 0) {
    return null;
  }

  return data[0];
}

export async function getHomePageData(): Promise<HomePage> {
  const query = {
    populate: {
      navbar_logo: true,
      sections: {
        on: {
          'layout.hero-section': { 
            populate: {
              hero_imagen: true,
              hero_background: true,
              link: true
            }
          },
          'layout.highlights-section': {
            populate: {
              cards: {
                populate: {
                  image: true 
                }
              }
            }
          },
          'layout.banner-section': {
            populate: {
              banner_image: true,
              link: true
            }
          },
          'layout.featured-products': {
            populate: {
              products: {
                populate: {
                  images: true 
                }
              }
            }
          },
          'layout.carousel-section': {
            populate: {
              slides: {
                populate: {
                  feature_image: true, 
                  card_info: {
                    populate: {
                      image: true 
                    }
                  }
                }
              }
            }
          },
          'layout.download-app-section': {
            populate: {
              app_image: true,
              download_link: true
            }
          },
        }
      }
    },
  };

  // 3. IMPORTANTE: Usar ISR (Revalidación) para la Home/Layout
  // Esto permite que se genere estáticamente y se actualice cada 60 segundos
  // Solucionando el error de "Dynamic server usage" en el build.
  return await fetchStrapiAPI<HomePage>("/api/home-page", query, {
    next: { revalidate: 60 } 
  });
}