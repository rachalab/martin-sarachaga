import apiGetServer from "@/lib/apiGetServer";

export async function generateMetadata({ params }) {

  const{ subastaId } = await params;

  const data = await apiGetServer({
    url: `category.php?id=${subastaId}`,
  });

  if (!data || !data.subasta) return {};

  return {
    title: `Subasta Nro ${data.subasta.nro}`,
    description: data.subasta.description,  
  };
}

export default async function Page({ params }) {
  return (
    <>
      <h1>404 - Not Found</h1>
    </>
  );
}