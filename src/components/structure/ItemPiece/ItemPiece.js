'use client'
import Image from 'next/image';
import Link from 'next/link';
import styles from "./ItemPiece.module.scss"; 

export default function ItemPiece({ data }){

  return (
    <Link href={data.url} id={`id-${data?.id}`} className={styles.item}>
      <div className={styles.image_wrapper}>
        {data?.images ?
          <Image
            src={data?.images?.src}
            alt={`Imagen lote N° ${data.lote}`}
            width={data?.images?.width}
            height={data?.images?.height}
            className={styles.img}
            loading="lazy"
          />
          :
          <div className={styles.img_void}/>
        }               
      </div>     
      <p>Lote N° {data.lote}{data.autor && ` — ${data.categoria ==1 ||  data.categoria == 22 ?  data.autor : data.titulo}`}</p>
    </Link>

  )
}