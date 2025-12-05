import { builder } from "@builder.io/sdk";
import apiGetServer from "@/lib/apiGetServer";
import MainWrapper from "../../../components/structure/MainWrapper/MainWrapper";
import ItemDetail from "@/src/components/structure/ItemDetail/ItemDetail";
import Footer from "../../../components/structure/Footer/Footer";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import { notFound } from "next/navigation";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {

  const { obraId } = await params;

  // acá params ya está disponible
  const batchId = obraId.split("-")[0];

  const data = await apiGetServer({
    url: `object/${batchId}`,
    slug: obraId
  });

  if (!data?.lote ) return notFound();

  //Parametros para Imagen
  let image = [];

  if(data?.lote?.images?.length > 0){    
    image = data?.lote?.images[0];
  }
  
  const titulo = data?.lote?.categoria !== 1 && data?.lote?.categoria !== 22 ?         data?.lote?.titulo : data?.lote?.autor;
  const lote = `${data?.lote?.lote} ${data?.lote?.bis ? 'Bis' : ''}`;

  return generatePageMetadata({

    title: `${titulo} — Lote N° ${lote} — Martín Saráchaga Subastas`,
    description: data?.lote?.descripcion,
    url: data?.lote?.url,
    images: [image],
  });
}

export default async function Page({ params }) {
  const { obraId } = await params;

  // acá params ya está disponible
  const batchId = obraId.split("-")[0];

  const data = await apiGetServer({
    url: `object/${batchId}`,
    slug: obraId  
  });

  if (!data?.lote ) return notFound();

  const contentFooter = await builder.get("footer").toPromise();

  return (   
    <MainWrapper>
      <ItemDetail dataPiece={data.lote} />
      {contentFooter?.data && <Footer content={contentFooter?.data} model={"footer"} /> }
    </MainWrapper>
  );
} 