import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
import PrivateSalePieces from "@/src/components/structure/PrivateSalePieces/PrivateSalePieces";
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
      <PrivateSalePieces data={data} />
      <Footer />
    </MainWrapper>
  );
}
