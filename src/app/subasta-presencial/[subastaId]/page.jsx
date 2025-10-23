import { builder } from "@builder.io/sdk";
import MainWrapper from "../../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../../components/structure/Heading/Heading";
import AuctionPrefilter from "../../../components/builder/AuctionPrefilter/AuctionPrefilter";
import Footer from "../../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import Image from "next/image";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {
  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay datos redireccionamos
  if (!data?.meta?.title || !data?.meta?.description) return notFound();

  return generatePageMetadata({
    title: data?.meta?.title,
    description: data?.meta?.description,
    url: data?.meta?.url,
    images: {
      src: '/assets/images/sarachaga_meta_thumb.jpg',
      width: 1200,
      height: 600
    }
  });
}

export default async function Page({ params }) {
  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay datos redireccionamos
  if (!data?.categorias) return notFound();

  const contentFooter = await builder.get("footer").toPromise();
  
  return (
    <MainWrapper>
      <Heading data={{ heading: "SUBASTA PRESENCIAL" }} />
      <div className={styles.nights}>
        {data?.noches.map((data, i) => {
          return (
            <div className={styles.night} key={i}>
              <p className={styles.red}>Noche {data.noche}</p>
              <p className={styles.date_dsk}>{data.dia.format}</p>
              <p className={styles.date_mob}>{data.dia.short}</p>
              <p>{data.horario.format} H.</p>
            </div>
          );
        })}
      </div>
      <AuctionPrefilter subastaId={subastaId} links={data?.categorias} />
      <Image 
        src={'/assets/images/sarachaga_meta_thumb.jpg'}
        width={1200}
        height={600}
        alt={"Martín Saráchaga Subastas"}
        style={{display: "none"}}
      />      
      {contentFooter?.data && <Footer content={contentFooter?.data} model={"footer"} /> }
    </MainWrapper>
  );
}
