'use client'
import { useRef, useEffect, useState } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from "./Timeline.module.scss"; 
gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ subtitle, years }){
  const windowSize = useWindowSize();
  const container = useRef(null);
  const colRight = useRef(null);
  const [colRightHeight, setColRightHeight] = useState(0);
  const [currentYear, setCurrentYear] = useState(null);
  const [previousYear, setPreviousYear] = useState(null); 
  

  useEffect(() => {
    if (!colRight.current) return;
    const resizeObserver = new ResizeObserver(() => {
      colRight?.current?.offsetHeight && setColRightHeight(colRight.current.offsetHeight);
    });
    resizeObserver.observe(colRight.current);            
    return () => resizeObserver.disconnect();        
  }, []);  


  useEffect(() => {  
    let st = ScrollTrigger.create({
      trigger: colRight.current,
      start: "top top", 
      end: () => `+=${colRightHeight} 80%`,          
      pin: `.${styles.col_left} .${styles.image_wrapper}`,
      pinSpacing: false,
      scrub: true,                
    });    
    return () => st.revert();                
  }, [colRightHeight]);


  useEffect(() => {   
    setPreviousYear(null); 
  }, [windowSize]);

  
  useEffect(() => {
    if(windowSize.width >= 1025){
      let ctx = gsap.context(() => {
        years?.forEach((year) => {        
          if (year?.photo) {
            ScrollTrigger.create({
              trigger: `#date_${year.date}`,
              start: "top 80%",
              end: "top 80%",
              onEnter: () => {
                setPreviousYear(currentYear); 
                
                year?.date && setCurrentYear(year?.date);
              },
              onEnterBack: () => {
                setCurrentYear(previousYear); 
              },
            });
          }
        });
      }, container);
      return () => ctx.revert();
    }    
  }, [colRightHeight, currentYear]); 


  return (
    <div className={styles.wrapper} ref={container}>

      <div className={styles.col_left}>
        {subtitle && 
          <h3 className={styles.subtitle}>{subtitle}</h3> 
        }

        {years && 
          <div className={styles.image_wrapper}>
            {years?.map((year, i) => {    
              return (            
                year?.photo && <img src={year.photo} alt={year?.alt} key={i} className={currentYear === year?.date ? `${styles.image} ${styles.active}` : `${styles.image}`} />          
              );
            })}
          </div>
        }
      </div>

      {years &&
        <div className={styles.col_right} ref={colRight}>

          {years?.map((year, i) => {    
              return (            
                <div className={styles.year} key={i} id={`date_${year.date}`}>
                  {year?.date &&
                    <>
                      <div className={styles.date}>
                        <p>{year.date}</p>
                      </div> 
                    {year?.description && <p className={styles.description}>{year?.description}</p> }
                    {windowSize.width <= 1024 && year?.photo && i !== 0 && <div className={styles.image_wrapper}><img src={year.photo} alt={year?.alt} key={i} className={styles.image} /></div> }
                    </>
                  }
                </div>         
              );
          })}
        </div>
      }
      
    </div>
  )
}