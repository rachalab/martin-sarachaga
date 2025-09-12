import apiGetServer from "@/lib/apiGetServer";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {

  const{ subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.categorias) return redirect(`/404`);

  return {
    title: `Subasta Nro ${data.subasta.nro}`,
    description: data.subasta.description,  
  };
}

export default async function Page({ params }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category.php?id=${subastaId}`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.categorias) return redirect(`/404`);

  return (
    <>
      <h1>Subasta Nro: {data?.subasta?.nro}</h1>

      <h2>Categorías</h2>
      <pre>
        <code>{JSON.stringify(data?.categorias ?? [], null, 2)}</code>
      </pre>
      <h2>Noches</h2>
      <pre>
        <code>{JSON.stringify(data?.noches ?? [], null, 2)}</code>
      </pre>
    </>
  );
}