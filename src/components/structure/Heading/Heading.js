import styles from "./Heading.module.scss"; 

export default function Heading({ data }){

  return (
    <h2 className={styles.heading}>{data.heading}</h2>  
  )
}