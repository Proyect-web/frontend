// /lib/strapi.ts
import qs from "qs";
import { HomePage } from "./types";

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
          }

          
        }
      }
    },
  };

 
  return await fetchStrapiAPI<HomePage>("/api/home-page", query);
}