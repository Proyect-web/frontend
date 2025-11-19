// app/posts/page.tsx
import qs from "qs";
import Link from "next/link"; // <-- 1. IMPORTAR LINK

/*
 * 1. Definimos las Interfaces (Tipado)
 */
// ... (Interfaces Post y StrapiResponse - sin cambios)
interface Post {
  id: number;
  title: string;
  slug: string;
  content: any;
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
 * 2. Función de Fetch de Datos
 */
// ... (getStrapiPosts() - sin cambios)
async function getStrapiPosts(): Promise<StrapiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (!apiToken) {
    throw new Error("Error: STRAPI_API_TOKEN no está definido en .env.local");
  }

  const query = qs.stringify({
    populate: "*",
  }, {
    encodeValuesOnly: true,
  });

  const fetchUrl = `${apiUrl}/api/posts?${query}`;
  console.log(`Querying Strapi: ${fetchUrl}`); 

  const res = await fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Error en la respuesta de Strapi:", errorBody);
    throw new Error(`Fallo al obtener datos de Strapi: ${res.statusText}`);
  }

  return res.json();
}

/*
 * 3. El componente de la Página
 */
export default async function Home() {
  let posts: Post[] = [];
  let fetchError: string | null = null;

  try {
    const strapiData = await getStrapiPosts();
    posts = strapiData.data;
  } catch (e: any) {
    console.error("Error al Cargar la Página:", e);
    fetchError = "No se pudieron cargar los posts. Revisa la consola de Next.js y el .env.local.";
  }

  // 4. Renderizado (JSX)
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Proyecto Next.js + Strapi
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Lista de Posts obtenidos desde Strapi (Backend):
      </p>

      {/* ... (Manejo de errores - sin cambios) ... */}

      {/* --- INICIO DE LA ACTUALIZACIÓN --- */}
      <ul className="mt-6 space-y-4">
        {posts.map((post) => (
          // 2. AÑADIMOS EL LINK
          <Link 
            href={`/posts/${post.slug}`} 
            key={post.id}
            className="block"
          >
            <li 
              className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800">
                {post.title} 
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Slug: {post.slug}
              </p>
            </li>
          </Link>
          // --- FIN DE LA ACTUALIZACIÓN ---
        ))}
      </ul>
    </main>
  );
}