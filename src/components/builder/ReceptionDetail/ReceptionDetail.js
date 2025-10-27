'use client'
import { useState, useEffect } from 'react';
import styles from "./ReceptionDetail.module.scss"; 

export default function ImageWithText({ highlighted, text, cta_txt, cta_url, images }){
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const imagesLength =  images ? images.length : 0;

   useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImgIndex((prevIndex) => 
        prevIndex >= images?.length - 1 ? 0 : prevIndex + 1
      );
    }, imagesLength ? imagesLength * 200 : 3000 ); 
    return () => clearInterval(intervalId);
  }, [images?.length, imagesLength]);


  return (
    <div className={styles.wrapper}>      

      <div className={styles.col_left}>
        {highlighted && <h4 className={`${styles.highlighted} ${styles.show_in_mobile}`}>{highlighted}</h4>}
        <div className={styles.image_wrapper}>
          {images?.map((image, i)=> 
            image?.photo && <img src={image?.photo} key={i} className={i == currentImgIndex ? "": styles.hide} alt="Imagen" />
          )}           
        </div>
      </div>
 
      <div className={styles.col_right}>

        {highlighted && <h4 className={`${styles.highlighted} ${styles.show_in_desk}`}>{highlighted}</h4>}
        {text && <div className={styles.col_right} dangerouslySetInnerHTML={{__html: text }} />}
        {cta_txt && <a className={styles.query_button} href={cta_url} rel="noopener noreferrer" target="_blank">{cta_txt}</a>}

      </div>

    </div>
  )
}