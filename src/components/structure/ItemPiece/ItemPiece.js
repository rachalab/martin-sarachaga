import Image from 'next/image';
import Link from 'next/link';
import styles from "./ItemPiece.module.scss"; 

export default function ItemPiece({ data }){

  return (
    <Link href={data.url} className={styles.item}>      
      <div className={styles.image_wrapper}>
        {data.images ?
          <Image
            src={data.images[0]}
            alt={`Imagen lote N° ${data.lote}`}
            width={500}
            height={500}
            className={styles.img}
          />
          :
          <div className={styles.img_void}/>
        }               
      </div>     
      <p>Lote N° {data.lote}{data.autor && ` — ${data.autor}`}</p>
    </Link>
  )
}