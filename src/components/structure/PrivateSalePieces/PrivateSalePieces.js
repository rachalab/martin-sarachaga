import ItemPiece from '../ItemPiece/ItemPiece';
import styles from "./PrivateSalePieces.module.scss"; 

export default function PrivateSalePieces({ data }){

    return (         
        <>     
            {data?.categorias?.map((data, i) => {    
                return (
                    <section key={i} className={styles.wrapper}>                                      
                        <div className={styles.divider}>
                            <div className={styles.info}>
                                <p>{data.nombre}</p>                        
                            </div>                                       
                        </div>                                   
                        <div className={styles.itemsGrid}>
                            {data.lotes.map((lote, i) => {               
                                return (
                                    <ItemPiece key={i} data={lote} />
                                );
                            })}
                        </div>                                                       
                    </section>                  
                );
            })}
        </>
    )
}