"use client";
import Link from 'next/link';
import styles from "./LinksList.module.scss"; 
import { Fragment } from 'react';

export default function LinksList({ title, links }){

  return (
      <section className={styles.wrapper}>
        {title && <h3 className={styles.heading}>{title}</h3>}
        
        {links?.map((data, i) => {               
          return (
            <Fragment key={i}>
              {data?.title && 
                <Link 
                  href={data?.destination ? data?.destination : "#" } 
                  className={styles.link} 
                  key={i}
                >
                  {data.title}
                </Link>
              }
            </Fragment>
          );
        })}
      </section>
  )
}