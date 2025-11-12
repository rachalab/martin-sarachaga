"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppContext } from '../../../app/context/AppContext';
import Link from 'next/link';
import styles from "./Announcement.module.scss";

export default function Announcement({content, model}) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    announcementStatus,
    setAnnouncementStatus,
  } = useAppContext(); 

  useEffect(() => {
    setIsBrowser(true);
    setTimeout(() => {    
      setAnnouncementStatus(true);  
    }, 1000);
  }, []);

  function closeAnnouncement() {
    setIsClosing(true);
    setTimeout(() => {    
      setAnnouncementStatus(false);  
    }, 200);
  }

  const announcementContent = (
    <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
      <button onClick={closeAnnouncement} className={styles.close_btn} />             
      { content?.info && <p>{content?.info} — </p> }
      {content?.link && content?.textlink && 
        <Link 
          onClick={closeAnnouncement}
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