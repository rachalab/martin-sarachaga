import styles from "./Footer.module.scss"; 
import Link from "next/link";

export default function Footer({content}){
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.col_left}>
          <p>©{new Date().getFullYear()}<br />MARTÍN<br />SARÁCHAGA<br />SUBASTAS</p>
        </div>
        <div className={styles.col_right}>
          <div className={styles.whatsapp}>
            { content?.waphone && 
              <Link 
                href={content?.waphone} 
                rel="noopener noreferrer" 
                target="_blank">WhatsApp
              </Link> 
            }

            { content?.phones && content?.phones.map((p, index) => (
              <a href={`tel://+${p?.phone.replace(/\D/g, "")}`} key={index}>{p?.phone}</a>
            ))}
          </div>
          <div className={styles.social_networks}>
            { content?.networks && content?.networks.map((network, index) => (
              <Link 
                key={index} 
                href={network?.urlnetwork} 
                rel="noopener noreferrer" 
                target="_blank">{network?.socialnetwork}
              </Link>
            ))}
          </div>
          <div className={styles.adress}>
            { content?.mail && 
              <Link 
                href={`mailto:${content?.mail}`} 
                rel="noopener noreferrer" 
                target="_blank">{content?.mail}
              </Link>
            }

            <a href="mailto:info@martinsarachaga.com" rel="noopener noreferrer" target="_blank">info@martinsarachaga.com</a>
            { content?.address && <p><a href={content?.adressmap} target="_blank">{content?.address}</a></p> }
          </div>
        </div>
      </div>
    </footer>
  )
}