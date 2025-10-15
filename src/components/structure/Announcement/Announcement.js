"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from 'next/link';
import styles from "./Announcement.module.scss";

export default function Announcement() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [announcementStatus, setAnnouncementStatus] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    setTimeout(() => {    
      setAnnouncementStatus(true);  
    }, 1000);
  }, []);

  function closeFilters() {
    setIsClosing(true);
    setTimeout(() => {    
      setAnnouncementStatus(false);  
    }, 800);
  }

  const announcementContent = (
    <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
      <button onClick={closeFilters} className={styles.close_btn} />             
      <p>Abierta la recepción próxima subasta agosto — </p>
      <Link href='/' className={styles.link}>Más información</Link>   
    </div>
  );

  if (isBrowser && announcementStatus) {
    return ReactDOM.createPortal(announcementContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
}