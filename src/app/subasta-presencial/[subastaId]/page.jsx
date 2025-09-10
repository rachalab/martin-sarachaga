import apiGetServer from "@/lib/apiGetServer";

export async function generateMetadata({ params, searchParams }) {

  const data = await apiGetServer({
    url: `auctions.php?id=${params.subastaId}`,
  });

  if(!data) return;


  return {
    title: `Subasta Nro ${data.subasta.nro}`,
    description: data.subasta.description,  
  }
}

export default async function Page({ params }) {

  const data = await apiGetServer({
    url: `auctions.php?id=${params.subastaId}`,
  });

  return (
    <>
      <h1>Subasta Nro: {data.subasta.nro}</h1>
    </>
  );
}
