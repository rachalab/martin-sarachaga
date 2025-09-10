import apiGetServer from "@/lib/apiGetServer";

export async function generateMetadata({ params }) {
  // acá params ya está disponible
  const obraId = params.obraId.split("-")[0];

  const data = await apiGetServer({
    url: `batch.php?id=${obraId}`,
  });

  if (!data) {
    return {
      title: "Obra no encontrada",
      description: "No se encontró la obra solicitada.",
    };
  }

  return {
    title: `Lote ${data.lote.titulo}`,
    description: data.lote.descripcion,
  };
}

export default async function Page({ params }) {
  const obraId = params.obraId.split("-")[0];

  const data = await apiGetServer({
    url: `batch.php?id=${obraId}`,
  });

  return (
    <>
      <h1>Obra: {data.lote.titulo}</h1>
      <p>Descripcion:</p>
      <p>{data.lote.descripcion}</p>
    </>
  );
}
