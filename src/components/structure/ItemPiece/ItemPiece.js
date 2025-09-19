import Link from 'next/link';
import styles from "./ItemPiece.module.scss"; 

export default function ItemPiece({ data }){

  return (
    <Link href={data.url} className={styles.item}>
      <div className={styles.image_wrapper}>
        <img src={data.image} alt={'Imagen pieza'} />        
      </div>      
      <p>Lote N° {data.lote}{data.autor && ` — ${data.autor}`}</p>
    </Link>
  )
}