'use client';
import Link from 'next/link';
import styles from "./Hero.module.scss"; 

export default function Hero({line1, line2, cta_txt, cta_url, photo}){

  return (
    <div className={styles.container}>
      <div 
        className={styles.wrapper} 
        style={photo && { backgroundImage: `url(${photo})` }}
      >

        <div className={styles.info}>
          {(line1 || line2) && (
            <h2 className={styles.headline}>
              {line1}
              {line1 && line2 && <br />}
              {line2}
            </h2>
          )}
          {cta_txt && 
            <Link href={cta_url ? cta_url : "#"} className={styles.view_pieces_btn}>{cta_txt}</Link>
          }
        </div>

        <div className={styles.point_grid}>
          {Array.from({ length: 510 }).map((_, i) => (
            <div key={i} className={styles.point}>
              <div className={styles.inner}></div>
            </div>
          ))}
        </div>
      </div>        
    </div>
  )
}