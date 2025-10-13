import Image from 'next/image';
import Link from 'next/link';
import styles from "./ItemPiece.module.scss"; 

export default function ItemPiece({ data }){

  return (
    <Link href={data.url} className={styles.item}>      
      <div className={styles.image_wrapper}>
        {data?.images ?
          <Image
            src={data?.images[0]?.src}
            alt={`Imagen lote N° ${data.lote}`}
            width={data?.images[0]?.width}
            height={data?.images[0]?.height}
            className={styles.img}
            loading="lazy"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL="/assets/images/blur.jpg"
          />
          :
          <div className={styles.img_void}/>
        }               
      </div>     
      <p>Lote N° {data.lote}{data.autor && ` — ${data.autor}`}</p>
    </Link>
  )
}