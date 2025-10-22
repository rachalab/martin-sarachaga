'use client'
import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // 👈 importamos
import { useWindowSize } from "@uidotdev/usehooks";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import ImageMagnifier from '../ImageMagnifier/ImageMagnifier';
import styles from "./ItemDetail.module.scss"; 
gsap.registerPlugin(ScrollTrigger);

export default function ItemDetail({ dataPiece, address, dataNoche = false }){
  const windowSize = useWindowSize();
  const container = useRef(null);
  const colLeft = useRef(null);
  const [colLeftHeight, setColLeftHeight] = useState(0);

  const pathname = usePathname(); 
  const segments = pathname.split('/').filter(Boolean);
  segments.pop();

  //Link de volver atrás
  const backLink = '/' + segments.join('/');

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
          
          {dataPiece?.images?.map((photo, i) => {   
            return(
              <div key={i} className={styles.img_wrapper}>
                <ImageMagnifier photo={photo} priority={i === 0} /> 
              </div>                                           
            );
          })} 
        </div>
      }      

      <div className={styles.col_right}>

        <div className={styles.header}>
          <Link href={backLink} className={styles.link_back}>VOLVER</Link> 
           <button onClick={ () => window.print() } className={styles.print_btn}>IMPRIMIR</button>
        </div>
        <h1 className={styles.headline}>{dataPiece.autor}</h1>

        {windowSize.width <= 1024 && dataPiece?.images &&
           <Image 
            src={dataPiece?.images[0]?.src} 
            width={dataPiece?.images[0]?.width} 
            height={dataPiece?.images[0]?.height}  
            alt={'Imagen pieza'} 
            className={styles.image_mobile}
          />  
        }

        <p className={styles.description}>{dataPiece.descripcion}</p>

        <ul className={styles.technical_sheet}>
          <li><span>Título</span> {dataPiece.titulo}</li>
          <li><span>Lote N°</span> {dataPiece.lote}</li>
          {dataPiece?.subasta && 
            <li><span>Fecha de subasta</span> {dataNoche?.dia?.format ?? '-' }</li>
          }
          {address && <li><span>Lugar</span> {address}</li>}
          {dataPiece.preciominimo && <li><span>Valor base</span> {dataPiece.moneda === 'd' ? 'U$S' : '$'} {dataPiece.preciominimo}</li>}
          {dataPiece.preciofijo && <li><span>Precio de venta</span> {dataPiece.moneda === 'd' ? 'U$S' : '$'} {dataPiece.preciofijo}</li>}
        </ul>

        <a className={styles.query_button} href="https://api.whatsapp.com/send?phone=5491124787437&text=Hola" rel="noopener noreferrer" target="_blank">CONSULTAR POR WHATSAPP</a>

        {windowSize.width <= 1024 && dataPiece?.images &&
          dataPiece?.images.map((photo, i) => {   
            return(
              i !== 0 && 
                <Image 
                  src={photo?.src} 
                  width={photo?.width} 
                  height={photo?.height} 
                  alt={'Imagen pieza'} 
                  key={i} 
                  className={styles.image_mobile}
                />             
            );
          })
        }

      </div>

    </div>
  )
}