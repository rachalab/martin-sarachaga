import { notFound, permanentRedirect } from "next/navigation";

export default async function apiGetServer({ url, slug = false, id = false }) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    let url2 = apiUrl + url;

    const res = await fetch( url2, {
      next: { revalidate: 120 },
      headers: {
        "Content-Type": "application/json"
      },
    });
    
    // Si la respuesta no es exitosa
    if (!res.ok) {
      if (res.status === 404) {
        // Para 404, usamos notFound()
        notFound();
      } else {
        // Para otros errores (401, 500, etc.), lanzamos un error que error.js puede capturar
        throw new Error('Failed to fetch data');
      }
    }

    const data = await res.json();

    /** 
     * Condicionamientos para obras
     * ----------------------------
     * Si la subasta no coincide 404
    */

    if(data?.lote?.subasta && id){
      if(data?.lote?.subasta !== parseInt(id)){
        notFound();
      }
    }

    //Si el slug del obra no coincide redireciona a la verdadera
    if(data?.lote?.slug && slug){
      if(data?.lote?.slug !== slug){
        permanentRedirect(data.lote.url);
      }
    }

    return data;

}