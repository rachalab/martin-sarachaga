import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
//import AuctionPrefilter from "@/src/components/structure/AuctionPrefilter/AuctionPrefilter";
import Footer from "../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const data = await apiGetServer({
    url: `direct-sale`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.categorias) return notFound();

  return {
    title: `Venta privada`,
    description: `Ventas privada`,
  };
}

export default async function Page() {
  const data = await apiGetServer({
    url: `direct-sale`,
  });

  //Si no hay datos redireccionamos
  if (!data?.categorias) return notFound();

  return (
    <MainWrapper>
      <Heading data={{ heading: "Venta privada" }} />

      <pre>
        {data?.categorias
          ? JSON.stringify(data.categorias, null, 2)
          : "No hay categorías"}
      </pre>

      <Footer />
    </MainWrapper>
  );
}
