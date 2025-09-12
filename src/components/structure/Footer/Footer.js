import styles from "./Footer.module.scss"; 

export default function Footer(){

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.col_left}>
          <p>©{new Date().getFullYear()}<br />MARTÍN<br />SARÁCHAGA<br />SUBASTAS</p>
        </div>
        <div className={styles.col_right}>
          <div className={styles.whatsapp}>
            <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">WhatsApp</a>
            <p>(+54) 11 4815-0742</p>
            <p>(+54) 9 11 2478-7437</p>
          </div>
          <div className={styles.social_networks}>
            <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">Instagram</a>
            <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">Facebook</a>
            <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">LinkedIn</a>
            <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">YouTube</a>
          </div>
          <div className={styles.adress}>
            <a href="mailto:info@martinsarachaga.com" rel="noopener noreferrer" target="_blank">info@martinsarachaga.com</a>
            <p>Rodriguez Peña 1778 (1021) Buenos Aires, Argentina.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}