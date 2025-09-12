import styles from "./Divider.module.scss"; 

export default function Divider(){

  return (
    <div className={styles.wrapper}>
      <p className={styles.red}>Noche 1</p>
      <p>12 de abril de 2026</p>
      <p>19.00 hs</p>
    </div>
  )
}