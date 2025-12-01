"use client";
import { useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAppContext } from '../../../app/context/AppContext';
import styles from "./NightPrefilter.module.scss"; 

export default function NightPrefilter({ subastaId, noches }){
  
    const router = useRouter();

  
  const { setCurrentAuctionNight } = useAppContext();

  const setNight = (value) => {
    setCurrentAuctionNight(value);
    router.push(`${subastaId}/obras`);
  };

  return (

     <div className={styles.nights}>
      {noches?.map((data, i) => {
        return (
          <button
            className={styles.night}
            key={i}
            onClick={() => setNight(data.noche)}
          >
            <p className={styles.red}>Noche {data.noche}</p>
            <p className={styles.date_dsk}>{data.dia.format}</p>
            <p className={styles.date_mob}>{data.dia.short}</p>
            <p>{data.horario.system}</p>
          </button>
        );
      })}
    </div>
  )
}