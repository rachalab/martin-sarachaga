"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from '../../../app/context/AppContext';
import Link from 'next/link';
import styles from "./AuctionPrefilter.module.scss"; 

export default function AuctionPrefilter({ subastaId, links }){

   const router = useRouter();
   const {setCurrentAuctionCategory} = useAppContext(); 

    const handleClick = (value) => {
      setCurrentAuctionCategory(value);
      router.push(`${subastaId}/obras`);
    }

  return (
      <section className={styles.wrapper}>
        
        {links?.map((data, i) => {               
          return (
            <button onClick={() => handleClick(data.id)} className={styles.link} key={i}>{data.nombre}</button>
          );
        })}

        <Link href={`${subastaId}/obras`} className={`${styles.link} ${styles.cta}`}>Ver todo ➔</Link>
      </section>
  )
}