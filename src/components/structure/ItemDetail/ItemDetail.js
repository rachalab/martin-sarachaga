'use client'
import { useRef, useEffect, useState } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import ImageMagnifier from '../ImageMagnifier/ImageMagnifier';
import styles from "./ItemDetail.module.scss"; 
gsap.registerPlugin(ScrollTrigger);

export default function ItemDetail({ dataPiece }){
  const windowSize = useWindowSize();
  const container = useRef(null);
  const colLeft = useRef(null);
  const [colLeftHeight, setColLeftHeight] = useState(0);


  useEffect(() => {
    if(windowSize.width >= 1025){
      if (!colLeft.current) return;
      const resizeObserver = new ResizeObserver(() => {
        setColLeftHeight(colLeft.current.offsetHeight);
      });
      resizeObserver.observe(colLeft.current);            
      return () => resizeObserver.disconnect();  
    }      
  }, [windowSize.width]);  


  useEffect(() => {  
    if(windowSize.width >= 1025){
      let st = ScrollTrigger.create({
        trigger: colLeft.current,
        start: "top top", 
        end: () => `+=${colLeftHeight} 90%`,          
        pin: `.${styles.col_right}`,
        pinSpacing: false,
        scrub: true,              
      });    
      return () => st.revert(); 
    }                   
  }, [windowSize.width, colLeftHeight]);


  return (
    <div className={styles.wrapper} ref={container}>

      {windowSize.width >= 1025 &&
        <div className={styles.col_left} ref={colLeft}>
          
          {dataPiece?.images.map((photo, i) => {   
            return(
              <div key={i} className={styles.img_wrapper}>
                <ImageMagnifier photo={photo} /> 
              </div>                                           
            );
          })} 
        </div>
      }      

      <div className={styles.col_right}>

        <div className={styles.header}>
          <Link href={`/subasta-presencial/${dataPiece.subasta}/obras`} className={styles.link_back}>VOLVER</Link> 
           <button onClick={ () => window.print() } className={styles.print_btn}>IMPRIMIR</button>
        </div>
        <h2 className={styles.headline}>{dataPiece.autor}</h2>

        {windowSize.width <= 1024 && dataPiece?.images &&
          <img src={dataPiece.images[0]} alt={'Imagen pieza'} className={styles.image_mobile}/>  
        }

        <p className={styles.description}>{dataPiece.descripcion}</p>

        <ul className={styles.technical_sheet}>
          <li><span>Título</span> {dataPiece.titulo}</li>
          <li><span>Lote N°</span> {dataPiece.lote}</li>
          <li><span>Fecha de subasta</span> -</li>
          <li><span>Lugar</span> -</li>
          <li><span>Valor base</span> U$S {dataPiece.preciominimo}</li>
        </ul>

        <a className={styles.query_button} href="https://www.google.com" rel="noopener noreferrer" target="_blank">CONSULTAR POR WHATSAPP</a>

        {windowSize.width <= 1024 && dataPiece?.images &&
          dataPiece?.images.map((photo, i) => {   
            return(
              i !== 0 && <img src={photo} alt={'Imagen pieza'} key={i} className={styles.image_mobile}/>                                             
            );
          })
        }

      </div>

    </div>
  )
}