import { builder } from "@builder.io/sdk";
import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
import PrivateSalePieces from "@/src/components/structure/PrivateSalePieces/PrivateSalePieces";
import Footer from "../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
//import Image from "next/image";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata() {
  const data = await apiGetServer({
    url: `direct-sale/meta/metadata`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.title || !data?.description) return notFound();

  return generatePageMetadata({
    title: data?.title,
    description: data?.description,
    url: data?.url,
    images: {
      src: "/assets/images/sarachaga_meta_thumb.jpg",
      width: 1200,
      height: 600,
    },
  });
}

export default async function Page() {
  const data = await apiGetServer({
    url: `direct-sale`,
  });

  //Si no hay datos redireccionamos
  if (!data?.categorias) return notFound();

  const contentFooter = await builder.get("footer").toPromise();

  return (
    <MainWrapper>
      <Heading data={{ heading: "Venta privada" }} />
      <PrivateSalePieces data={data} />

      <img
        src={"/assets/images/sarachaga_meta_thumb.jpg"}
        width={1200}
        height={600}
        alt={"Martín Saráchaga Subastas"}
        style={{ display: "none" }}
      />

      {contentFooter?.data && (
        <Footer content={contentFooter?.data} model={"footer"} />
      )}
    </MainWrapper>
  );
}
