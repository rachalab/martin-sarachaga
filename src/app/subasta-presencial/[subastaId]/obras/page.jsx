import apiGetServer from "@/lib/apiGetServer";
import { redirect } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `/auctions/${subastaId}`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.subasta) return redirect(`/404`);

  return {
    title: `Subasta Nro ${data.subasta.nro}`,
    description: data.subasta.description,  
  }
}

export default async function Page({ params }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `/auctions/${subastaId}`,
  });


  //Si no hay dotos redireccionamos
  if (!data?.subasta) return redirect(`/404`);

  return (
    <>
      <h1>Subasta Nro: {data.subasta.nro}</h1>


      <h2>Lotes</h2>
      <pre>
        <code>{JSON.stringify(data?.lotes ?? [], null, 2)}</code>
      </pre>

    </>
  );
}
