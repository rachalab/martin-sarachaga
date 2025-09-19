import apiGetServer from "@/lib/apiGetServer";
import MainWrapper from "../../../../../components/structure/MainWrapper/MainWrapper";
import ItemDetail from "@/src/components/structure/ItemDetail/ItemDetail";
import Footer from "../../../../../components/structure/Footer/Footer";

export async function generateMetadata({ params }) {

  const { obraId } = await params;

  // acá params ya está disponible
  const batchId = obraId.split("-")[0];

  const data = await apiGetServer({
    url: `batch/${batchId}`,
  });

  return {
    title: `Lote ${data.lote.titulo}`,
    description: data.lote.descripcion,
  };
}

export default async function Page({ params }) {
  const { obraId } = await params;

  // acá params ya está disponible
  const batchId = obraId.split("-")[0];

  const data = await apiGetServer({
    url: `batch/${batchId}`,
  });

  return (   
    <MainWrapper>
      <ItemDetail dataPiece={data.lote} />
      <Footer />
    </MainWrapper>
  );
} 