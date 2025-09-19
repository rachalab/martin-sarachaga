"use client";
import Link from 'next/link';
import styles from "./LinksList.module.scss"; 

export default function LinksList({ title, links }){

  return (
      <section className={styles.wrapper}>
        {title?.value && <h3 className={styles.heading}>{title.value}</h3>}
        
        {links?.map((data, i) => {               
          return (
            <Link href={`/`} className={styles.link} key={i}>{data.nombre}</Link>
          );
        })}

      </section>
  )
}