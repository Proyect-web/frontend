// /lib/strapi.ts
import qs from "qs";
import { HomePage } from "./types";
import { Product } from "./types"; // Asegúrate de importar Product
function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
}

function getStrapiToken() {
  return process.env.STRAPI_API_TOKEN || "";
}

async function fetchStrapiAPI<T>(endpoint: string, query: object = {}): Promise<T> {
  const apiUrl = getStrapiURL();
  const apiToken = getStrapiToken();
  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  
  const res = await fetch(`${apiUrl}${endpoint}?${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store", 
  });

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
      images: true, // Imágenes generales del producto
      variants: {
        populate: {
          product_images: true // <--- CORRECCIÓN: Usamos el nombre real del campo en Strapi
        }
      }
    },
  };

  // Nota: Como es una colección, Strapi devuelve un array.
  // Asegúrate de que tu endpoint en Strapi sea '/api/products' (plural)
  const data = await fetchStrapiAPI<Product[]>("/api/products", query);

  if (!data || data.length === 0) {
    return null;
  }

  return data[0];
}

export async function getHomePageData(): Promise<HomePage> {
  // Consulta para el componente "layout.hero-section"
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
                  image: true // Traemos la imagen de cada tarjeta
                }
              }
            }
          },

          // --- NUEVA SECCIÓN BANNER ---
          'layout.banner-section': {
            populate: {
              banner_image: true,
              link: true
            }
          },


          // --- NUEVA SECCIÓN: PRODUCTOS ---
          'layout.featured-products': {
            populate: {
              products: {
                populate: {
                  images: true // Traemos las imágenes de cada producto
                }
              }
            }
          },


          // --- NUEVA SECCIÓN: CARRUSEL ---
          'layout.carousel-section': {
            populate: {
              slides: {
                populate: {
                  feature_image: true, // Imagen grande
                  card_info: {
                    populate: {
                      image: true // Icono dentro de la tarjeta
                    }
                  }
                }
              }
            }
          },



          // --- NUEVA SECCIÓN: DOWNLOAD APP ---
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

  

 
  return await fetchStrapiAPI<HomePage>("/api/home-page", query);
}

