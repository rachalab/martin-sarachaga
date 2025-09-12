import Link from 'next/link';
import styles from "./LinksList.module.scss"; 

export default function LinksList(){

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.heading}>subastas online</h3>
      <Link href="/" className={styles.link}>Arte oriental</Link>
      <Link href="/" className={styles.link}>Esculturas</Link>
      <Link href="/" className={styles.link}>Muebles</Link>
      <Link href="/" className={styles.link}>Objetos de diseño</Link>
      <Link href="/" className={styles.link}>Platería</Link>
      <Link href="/" className={styles.link}>Pintura argentina</Link>
      <Link href="/" className={styles.link}>Pintura europea</Link>
      <Link href="/" className={styles.link}>Ver todo ➔</Link>
    </section>
  )
}