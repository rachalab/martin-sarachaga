'use client'
import { useState, useEffect } from 'react';
import styles from "./ImageWithText.module.scss"; 

export default function ImageWithText({ data }){
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const imagesLength = typeof data.images !== 'undefined' ? data.images.length : 0;

   useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImgIndex((prevIndex) => 
        prevIndex >= data.images.length - 1 ? 0 : prevIndex + 1
      );
    }, imagesLength ? imagesLength * 200 : 3000 ); 
    return () => clearInterval(intervalId);
  }, [data.images.length, imagesLength]); 


  return (
    <div className={styles.wrapper}>

      <div className={styles.col_left}>
        <div className={styles.image_wrapper}>
          {data.images.map((image, i)=> <img src={image.url} key={i} className={i == currentImgIndex ? "": styles.hide} alt="Satsch Gallery" />)}           
        </div>
      </div>
 
      <div className={styles.col_right} dangerouslySetInnerHTML={{__html: data?.paragraphs}} />       

    </div>
  )
}