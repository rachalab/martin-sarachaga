"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from 'next/link';
import styles from "./Announcement.module.scss";

export default function Announcement({content, model}) {
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
      { content?.info && <p>{content?.info} — </p> }
      {content?.link && content?.textlink && 
        <Link 
          onClick={closeFilters}
          href={content?.link} 
          className={styles.link}>
            {content?.textlink}
        </Link>
      }   
    </div>
  );

  if (isBrowser && announcementStatus) {
    return ReactDOM.createPortal(announcementContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
}