"use client";
import { useRef, useEffect } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useAppContext } from '../../../app/context/AppContext';
import { gsap } from 'gsap';
import PrefilterImagesChange from './PrefilterImagesChange/PrefilterImagesChange';
import Link from 'next/link';
import styles from "./AuctionPrefilter.module.scss"; 

export default function AuctionPrefilter({ subastaId, links }){
  const container = useRef(null);
  const router = useRouter();
  const windowSize = useWindowSize();
  const {setCurrentAuctionCategory} = useAppContext(); 

  const handleClick = (value) => {
    setCurrentAuctionCategory(value);
    router.push(`${subastaId}/obras`);
  }

  useEffect(() => {
    if(windowSize.width >= 1025){

      const containerEl = container.current;
      if (!containerEl) return;

      const images = gsap.utils.toArray(`.${styles.images} .${styles.image_wrapper}`);
      const buttons = gsap.utils.toArray(`.${styles.categories_wrapper} button`);

      const handleMouseMove = (e) => {
        const rect = containerEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        gsap.to(images, {
          x: mouseX,
          y: mouseY,
          xPercent: -40,
          yPercent: -45,
          stagger: 0.02,
          ease: "power3.out"
        });
      };

      containerEl.addEventListener('mousemove', handleMouseMove);

      const mouseEnterHandlers = [];
      const mouseLeaveHandlers = [];

      buttons.forEach((category) => {
        const { label } = category.dataset;

        const handleMouseEnter = () => {
          gsap.to(`.${styles.image_wrapper}[data-image=${label}]`, { opacity: 1, scale: 1 });
          gsap.set(`button[data-label=${label}]`, { zIndex: 4 });
        };

        const handleMouseLeave = () => {
          gsap.to(`.${styles.image_wrapper}[data-image=${label}]`, { opacity: 0, scale: 0 });
          gsap.set(`button[data-label=${label}]`, { zIndex: 0 });
        };

        category.addEventListener('mouseenter', handleMouseEnter);
        category.addEventListener('mouseleave', handleMouseLeave);

        mouseEnterHandlers.push({ category, handler: handleMouseEnter });
        mouseLeaveHandlers.push({ category, handler: handleMouseLeave });
      });

      return () => {
        containerEl.removeEventListener('mousemove', handleMouseMove);
        mouseEnterHandlers.forEach(({ category, handler }) => {
          category.removeEventListener('mouseenter', handler);
        });
        mouseLeaveHandlers.forEach(({ category, handler }) => {
          category.removeEventListener('mouseleave', handler);
        });
      };

    }    
  }, [windowSize.width]);
  

  return (
    <>
      <div className={styles.images}>
        {windowSize.width >= 1025 &&
          links?.map((link, i) => {               
            return (
              <div className={styles.image_wrapper} data-image={`id_${link.id}`} key={i}>
                <PrefilterImagesChange images={link.images} />
              </div>            
            );
          })
        }       
      </div>

      <section className={styles.categories_wrapper} ref={container}>      

        {links?.map((data, i) => {               
          return (
            <button onClick={() => handleClick(data.id)} className={styles.link} data-label={`id_${data.id}`} key={i}>{data.nombre}</button>
          );
        })}

        <div className={styles.lines}>
          {links?.map((data, i) => {               
            return (
              <div className={styles.line} key={i}>{data.nombre}</div>
            );
          })}
        </div>        

        <Link href={`${subastaId}/obras`} className={`${styles.link} ${styles.cta}`}>Ver todo ➔</Link>
      </section>
    </>
  )
}