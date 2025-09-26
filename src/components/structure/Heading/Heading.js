import styles from "./Heading.module.scss"; 

export default function Heading({ data }){

  return (
    <h1 className={styles.heading}>{data.heading}</h1>  
  )
}