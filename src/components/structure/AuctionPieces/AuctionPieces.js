'use client'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useAppContext } from '../../../app/context/AppContext';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ItemPiece from '../ItemPiece/ItemPiece';
import AuctionFilterPanel from '../AuctionFilterPanel/AuctionFilterPanel';
import styles from "./AuctionPieces.module.scss"; 
gsap.registerPlugin(ScrollTrigger);

export default function AuctionPiecesContainer({ data }){
    const container = useRef(null);
    const [isBrowser, setIsBrowser] = useState(false);
    const [floatingFiltersBtn, setFloatingFiltersBtn] = useState(false);

    //Traemos lo que necesitamos de AppContext        
    const {
        dataAuctionPieces,
        setDataAuctionPieces,
        currentAuctionNight,
        currentAuctionCategory,
        currentAuctionAuthor,
        auctionFilterPanelStatus,
        setAuctionFilterPanelStatus
    } = useAppContext(); 


    //Filtramos la data
    useEffect(() => {
        let pieces = data.lotes;
        if (currentAuctionCategory !== "all") {
            pieces = pieces.filter((piece) => piece.categoria === currentAuctionCategory);
        } 
        if (currentAuctionAuthor !== "all") {
            pieces = pieces.filter((piece) => piece.autor === currentAuctionAuthor);
        }
        if (currentAuctionNight !== "all") {
            pieces = pieces.filter((piece) => piece.nronoche === currentAuctionNight);
        }
        setDataAuctionPieces(pieces);       
    }, [currentAuctionNight, currentAuctionCategory, currentAuctionAuthor, data]);   
    

    useEffect(() => {
        setIsBrowser(true);  
    }, []);

    //Muestra y oculta el botón de filtros flotante
    useEffect(() => {
        let ctx = gsap.context(() => {        
            ScrollTrigger.create({
                trigger: container.current,
                start: "top -10%",
                end: "top bottom",
                onEnter: () => {
                setFloatingFiltersBtn(true);
                },
                onEnterBack: () => {
                setFloatingFiltersBtn(false);
                },
            });    
        }, container);
        return () => ctx.revert();
    }, []); 


    return (
        <>           
            {auctionFilterPanelStatus && <AuctionFilterPanel data={data} />}  

            {isBrowser && ReactDOM.createPortal(<div className={!floatingFiltersBtn ? `${styles.floating_filters}` : `${styles.floating_filters} ${styles.active}`}>
                <button onClick={ () => setAuctionFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>
            </div>,document.getElementById("filters-btn-root"))}    
            
            <div ref={container}>     
                {data?.noches.map((dataNoche, i) => {     
                    let obras = dataAuctionPieces.filter(item => item.nronoche === dataNoche.noche);
                    return (
                        <section key={i} className={styles.wrapper}>                                 
                            {obras.length > 0 && 
                                <>  
                                    <div className={styles.divider}>
                                        <div className={styles.info}>
                                            <p className={styles.red}>Noche {dataNoche.noche}</p>
                                            <p>{dataNoche.dia.format.substring(dataNoche.dia.format.indexOf(',') + 1)}</p>
                                            <p>{dataNoche.horario.format} H.</p>
                                        </div> 
                                        {/* <button onClick={ () => setAuctionFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button> */}
                                    </div>                                     

                                    <div className={styles.itemsGrid}>
                                        {obras.map((dataPiece, i) => {               
                                            return (
                                                <ItemPiece key={i} data={dataPiece} />
                                            );
                                        })}
                                    </div>
                                </>
                            }                                                          
                        </section>                  
                    );
                })}  
            </div>
        </>
    )
}