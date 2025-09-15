import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {

  const { subastaId, obraId } = await params;

  // acá params ya está disponible
  const batchId = obraId.split("-")[0];

  const data = await apiGetServer({
    url: `batch/${batchId}`,
    slug: obraId
  });

  if(data.lote.subasta !== parseInt(subastaId)){
    notFound();
  }

  return {
    title: `Lote ${data.lote.titulo}`,
    description: data.lote.descripcion,
  };
}

export default async function Page({ params }) {
  const { subastaId, obraId } = await params;

  // acá params ya está disponible
  const batchId = obraId.split("-")[0];

  const data = await apiGetServer({
    url: `batch/${batchId}`,
    slug: obraId  
  });


  if(data.lote.subasta !== parseInt(subastaId)){
    notFound();
  }

  return (
    <>
      <h1>Id Subasta: {data.subasta.id}</h1>
      <h1>Obra: {data.lote.titulo}</h1>

      <h2>Obra</h2>
      <pre>
        <code>{JSON.stringify(data?.lote ?? [], null, 2)}</code>
      </pre>
      <h2>Subasta</h2>
      <pre>
        <code>{JSON.stringify(data?.subasta ?? [], null, 2)}</code>
      </pre>
      <h2>Categorías</h2>
      <pre>
        <code>{JSON.stringify(data?.categoria ?? [], null, 2)}</code>
      </pre>
      <h2>Noches</h2>
      <pre>
        <code>{JSON.stringify(data?.noche ?? [], null, 2)}</code>
      </pre>




    </>
  );
}
