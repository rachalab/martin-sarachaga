import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import MainWrapper from "../../../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../../../components/structure/Heading/Heading";
import AuctionPieces from "@/src/components/structure/AuctionPieces/AuctionPieces";
import Footer from "../../../../components/structure/Footer/Footer";

export async function generateMetadata({ params, searchParams }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `/auctions/${subastaId}`,
  });

  //Si no hay datos redireccionamos
  if (!data?.subasta) return notFound();

  return {
    title: `Subasta Nro ${data?.subasta?.nro}`,
    description: data?.subasta?.description,  
  }
}

export default async function Page({ params }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `/auctions/${subastaId}`,
  });


  //Si no hay datos redireccionamos
  if (!data?.subasta) return notFound();


  return (
    <MainWrapper>
      <Heading data={{heading: 'SUBASTA PRESENCIAL'}} />
      <AuctionPieces data={data} />
      <Footer />
    </MainWrapper>
  );
}
