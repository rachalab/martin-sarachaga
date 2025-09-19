import Link from 'next/link';
import styles from "./ItemDetail.module.scss"; 

export default function ItemDetail({ dataPiece }){

  console.log(dataPiece)

  return (
    <div className={styles.wrapper}>

      <div className={styles.col_left}>
        <img src={dataPiece.image} alt={'Imagen pieza'} />
      </div>

      <div className={styles.col_right}>
        <div className={styles.header}>
          <Link href={`/subasta-presencial/${dataPiece.subasta}/obras`} className={styles.link_back}>VOLVER</Link> 
           <button className={styles.print_btn}>IMPRIMIR</button>
        </div>

        {/* <h2 className={styles.headline}>{dataPiece.titulo}</h2> */}
        <h2 className={styles.headline}>{dataPiece.autor}</h2>
        <p className={styles.description}>{dataPiece.descripcion}</p>

        <ul className={styles.technical_sheet}>
          <li><span>Título</span> {dataPiece.titulo}</li>
          {/* <li><span>Autor</span> {dataPiece.autor}</li> */}
          <li><span>Lote N°</span> {dataPiece.lote}</li>
          <li><span>Fecha de subasta</span> -</li>
          <li><span>Lugar</span> -</li>
          <li><span>Valor base</span> U$S {dataPiece.preciominimo}</li>
        </ul>

        <a className={styles.query_button} href="https://www.google.com" rel="noopener noreferrer" target="_blank">CONSULTAR POR WHATSAPP</a>

      </div>

    </div>
  )
}