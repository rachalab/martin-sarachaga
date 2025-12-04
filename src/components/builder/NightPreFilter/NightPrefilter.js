"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from '../../../app/context/AppContext';
import styles from "./NightPrefilter.module.scss"; 

export default function NightPrefilter({ subastaId, noches, catalogo }){  
  const router = useRouter();  
  const { setCurrentAuctionNight } = useAppContext();

  const setNight = (value) => {
    setCurrentAuctionNight(value);
    router.push(`${subastaId}/obras`);
  };

  return (
    <div className={styles.nightsPrefilter}>
      <div className={styles.nights}>
        {noches?.map((data, i) => {
          return (
            <button
              className={styles.night}
              key={i}
              onClick={() => setNight(data.noche)}
            >
              <span className={styles.red}>Noche {data.noche}</span>
              <span className={styles.date_dsk}>{data.dia.format}</span>
              <span className={styles.date_mob}>{data.dia.short}</span>
              <span>{data.horario.system}</span>
            </button>
          );
        })}
      </div>
      {catalogo && (<a href={catalogo} target="_blank" className={styles.catalogo}><img src="/assets/icons/download_ico.svg" alt="Icono"/><span><strong>Descargar</strong> Catálogo</span></a>)}
    </div>
  )
}