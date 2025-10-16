import MainWrapper from "../../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../../components/structure/Heading/Heading";
import AuctionPrefilter from "../../../components/builder/AuctionPrefilter/AuctionPrefilter";
import Footer from "../../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.meta?.title || !data?.meta?.description) return notFound();

  return generatePageMetadata({
    title: data?.meta?.title,
    description: data?.meta?.description,
    url: data?.meta?.url,
    images: [data?.meta?.image],
  });
}

export default async function Page({ params }) {
  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay datos redireccionamos
  if (!data?.categorias) return notFound();

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
        src={data?.meta?.image?.src ?? '/assets/images/sarachaga_meta_thumb.jpg'}
        width={data?.meta?.image?.width ?? 1200}
        height={data?.meta?.image?.height ?? 600}
        alt={"Martín Saráchaga Subastas"}
        style={{display: "none"}}
      />      
      <Footer />
    </MainWrapper>
  );
}
