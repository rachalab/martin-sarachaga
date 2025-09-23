'use client'
import { useState, useEffect } from 'react';
import styles from "./ImageWithText.module.scss"; 

export default function ImageWithText({ text, images }){
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
        <div className={styles.image_wrapper}>
          {images?.map((image, i)=> 
            image?.photo && <img src={image?.photo} key={i} className={i == currentImgIndex ? "": styles.hide} alt="Satsch Gallery" />
          )}           
        </div>
      </div>
 
      {text && <div className={styles.col_right} dangerouslySetInnerHTML={{__html: text }} /> }

    </div>
  )
}