import MainWrapper from "../../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../../components/structure/Heading/Heading";
import AuctionPrefilter from "../../../components/builder/AuctionPrefilter/AuctionPrefilter";
import Footer from "../../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

export async function generateMetadata({ params }) {
  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.categorias) return notFound();

  return {
    title: `Subasta Nro ${data?.subasta?.nro}`,
    description: data?.subasta?.description,
  };
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
      <Footer />
    </MainWrapper>
  );
}
