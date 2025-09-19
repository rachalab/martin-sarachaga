import MainWrapper from "../../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../../components/structure/Heading/Heading";
import LinksList from "../../../components/builder/AuctionPrefilter/AuctionPrefilter";
import AuctionPrefilter from "../../../components/builder/AuctionPrefilter/AuctionPrefilter";
import Footer from "../../../components/structure/Footer/Footer";
import apiGetServer from "@/lib/apiGetServer";
import { redirect } from "next/navigation";
import styles from "./page.module.scss"

export async function generateMetadata({ params }) {

  const{ subastaId } = await params;

  const data = await apiGetServer({
    url: `category/${subastaId}`,
  });

  //Si no hay dotos redireccionamos
  if (!data?.categorias) return redirect(`/404`);

  return {
    title: `Subasta Nro ${data.subasta.nro}`,
    description: data.subasta.description,  
  };
}

export default async function Page({ params }) {

  const { subastaId } = await params;

  const data = await apiGetServer({
    url: `category.php?id=${subastaId}`,
  });

  //Si no hay datos redireccionamos
  if (!data?.categorias) return redirect(`/404`);

  
  return (
    <MainWrapper> 
      <Heading data={{heading: 'SUBASTA PRESENCIAL'}} />
        <div className={styles.nights}>
          {data?.noches.map((data, i) => {               
                return (
                  <div className={styles.night} key={i}>
                    <p className={styles.red}>Noche {data.noche}</p>
                    <p>{data.dia.format.substring(data.dia.format.indexOf(',') + 1)}</p> 
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