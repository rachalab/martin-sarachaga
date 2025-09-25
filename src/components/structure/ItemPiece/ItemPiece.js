import Link from 'next/link';
import styles from "./ItemPiece.module.scss"; 

export default function ItemPiece({ data }){

  return (
    <Link href={data.url} className={styles.item}>      
      <div className={styles.image_wrapper}>
        {data.images ?
          <img src={data.images[0]} alt={`Imagen lote N° ${data.lote}`} /> 
          :
          <div className={styles.img_void}/>
        }               
      </div>     
      <p>Lote N° {data.lote}{data.autor && ` — ${data.autor}`}</p>
    </Link>
  )
}