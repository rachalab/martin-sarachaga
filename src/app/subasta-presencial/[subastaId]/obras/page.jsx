import apiGetServer from "@/lib/apiGetServer";
import { redirect } from "next/navigation";
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


  //Si no hay datos redireccionamos
  if (!data?.subasta) return redirect(`/404`);


  return (
    <MainWrapper>
      <Heading data={{heading: 'SUBASTA PRESENCIAL'}} />
      <AuctionPieces data={data} />
      <Footer />
    </MainWrapper>
  );
}
