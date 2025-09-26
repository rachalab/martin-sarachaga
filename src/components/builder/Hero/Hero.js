'use client';
import { useRef, useEffect } from 'react';
import { useAppContext } from '../../../app/context/AppContext';
import { useWindowSize } from "@uidotdev/usehooks";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import styles from "./Hero.module.scss"; 
gsap.registerPlugin(ScrollTrigger);

export default function Hero({line1, line2, cta_txt, cta_url, photo}){

  const refHero = useRef(null);
  const { setShowNavBar } = useAppContext(); 
  const windowSize = useWindowSize();

  useEffect(() => {
    let ctx = gsap.context(() => {        
      ScrollTrigger.create({
        trigger: refHero.current,
        start: "30% top",
        end: "top bottom",
        onEnter: () => {
          setShowNavBar(true);
        },
        onEnterBack: () => {
          setShowNavBar(false);
        },
      });    
    }, refHero);
    return () => ctx.revert();
  }, [windowSize]);


  return (
    <div className={styles.container} ref={refHero}>

      <div className={styles.brand}>
        <img src="/assets/images/sarachaga-brand.svg" alt="Logo" />
        <h1>MARTÍN SARÁCHAGA SUBASTAS</h1>
      </div>

      <div className={styles.wrapper}  style={photo && { backgroundImage: `url(${photo})` }}>
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
          {Array.from({ length: 600 }).map((_, i) => (
            <div key={i} className={styles.point}>
              <div className={styles.inner}></div>
            </div>
          ))}
        </div>
      </div>        
    </div>
  )
}