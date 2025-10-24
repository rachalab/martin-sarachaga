"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Newsletter.module.scss";

export default function Newsletter() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(false);

  const [validate, setValidate] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  useEffect(() => {
    const subscribed = localStorage.getItem("newsletterSubscribed");

    setIsBrowser(true);

    if (!subscribed) {
      setTimeout(() => {    
        setNewsletterStatus(true);  
      }, 2000);
    }
  }, []);

  function closeFilters() {
    setIsClosing(true);
    setTimeout(() => {    
      setNewsletterStatus(false);  
    }, 800);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.user_name.value.trim();
    const email = e.target.user_mail.value.trim();

    if (!name || !emailRegex.test(email)) {
      setValidate(true);
      return;
    }

    //Fetch API

    // Guardar en localStorage que ya se suscribió
    localStorage.setItem("newsletterSubscribed", "true");

    // Cerrar el modal con animación
    closeFilters();
  }




  const newletterContent = (
    <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
      <div className={styles.container}>

        <button onClick={closeFilters} className={styles.close_btn} />        
        <h4 className={styles.title}>Enterate primero</h4>
        <p>No te pierdas las próximas grandes subastas y las pequeñas subastas online.</p>

        { validate && <p className={styles.validate_msg}>Uno o más campos son incorrectos.</p> }

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Nombre Apellido</label>
          <input type="text" id="name" name="user_name" className={styles.input}/>         
          <label className={styles.label}>E-mail</label>
          <input type="email" id="mail" name="user_mail" className={styles.input}/>
          <button type="submit" className={styles.submit_btn}>Registrarme</button>
        </form>
 
      </div>
      <div className={styles.overlay_close} />
    </div>
  );

  if (isBrowser && newsletterStatus) {
    return ReactDOM.createPortal(newletterContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
}