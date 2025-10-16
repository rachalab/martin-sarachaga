import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
import PrivateSalePieces from "@/src/components/structure/PrivateSalePieces/PrivateSalePieces";
import Footer from "../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import Image from "next/image";

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
    images: [data?.image],
  });
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

      <Image 
        src={"/assets/images/sarachaga_meta_thumb.jpg"}
        width={1200}
        height={600}
        alt={"Martín Saráchaga Subastas"}
        style={{display: "none"}}
      />
    
      <Footer />
    </MainWrapper>
  );
}
