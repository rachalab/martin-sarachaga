import { builder } from "@builder.io/sdk";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import MainWrapper from "../../../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../../../components/structure/Heading/Heading";
import AuctionPieces from "@/src/components/structure/AuctionPieces/AuctionPieces";
import Footer from "../../../../components/structure/Footer/Footer";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import Image from "next/image";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {
  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `/auctions/${subastaId}/meta/metadata`,
  });

  //Si no hay datos redireccionamos
  if (!data?.title || !data?.description) return notFound();

  return generatePageMetadata({
    title: data?.title,
    description: data?.description,
    url: data?.url,
    images: [data?.image],
  });
}

export default async function Page({ params }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `/auctions/${subastaId}`,
  });


  //Si no hay datos redireccionamos
  if (!data?.subasta) return notFound();

  const contentFooter = await builder
    .get("footer", { userAttributes: { urlPath: "/footer" } })
    .toPromise();

  return (
    <MainWrapper>
      <Heading data={{heading: 'SUBASTA PRESENCIAL'}} />
      <AuctionPieces data={data} />

      <Image 
        src={"/assets/images/sarachaga_meta_thumb.jpg"}
        width={1200}
        height={600}
        alt={"Martín Saráchaga Subastas"}
        style={{display: "none"}}
      />

      {contentFooter?.data && <Footer content={contentFooter?.data} model={"footer"} /> }
    </MainWrapper>
  );
}
