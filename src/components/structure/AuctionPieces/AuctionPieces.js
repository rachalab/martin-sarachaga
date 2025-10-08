'use client'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useAppContext } from '../../../app/context/AppContext';
import { useWindowSize } from "@uidotdev/usehooks";
import { gsap, Circ } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ItemPiece from '../ItemPiece/ItemPiece';
import AuctionFilterPanel from '../AuctionFilterPanel/AuctionFilterPanel';
import styles from "./AuctionPieces.module.scss"; 
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function AuctionPiecesContainer({ data }){
    const container = useRef(null);
    const isFirstRender = useRef(true);
    const [isBrowser, setIsBrowser] = useState(false);
    const [floatingFiltersBtn, setFloatingFiltersBtn] = useState(false);
    const windowSize = useWindowSize();

    //Traemos lo que necesitamos de AppContext        
    const {
        scrollbar,
        currentAuctionNight,
        currentAuctionCategory,
        currentAuctionAuthor,
        auctionFilterPanelStatus,
        setAuctionFilterPanelStatus
    } = useAppContext(); 

    //Informacion de noches
    const [noches , setNoches] = useState([...data.noches]);
    
    //Mapeo de lotes de subasta
    const [dataAuction, setDataAuction] = useState([]);
    const [dataCountAuction, setDataCountAuction] = useState(false);

    useEffect(() => {
        //Si hay noche o lotes
        if (!noches?.length || !data?.lotes?.length) {
            setDataAuction([]); return;
        }

        //Array para filtrar
        let filteredLotes = [...data.lotes];

        //Filtro por noche
        if (currentAuctionNight !== "all") {
            filteredLotes = filteredLotes.filter(
                (lote) => String(lote.nronoche) === String(currentAuctionNight)
            );
        }

        //Filtro por categoria
        if (currentAuctionCategory !== "all") {
            filteredLotes = filteredLotes.filter(
                (lote) => String(lote.categoria) === String(currentAuctionCategory)
            );
        }

        //Filtro por Autor
        if (currentAuctionAuthor !== "all") {
            filteredLotes = filteredLotes.filter(
                (lote) => String(lote.autor) === String(currentAuctionAuthor)
            );
        }

        // Agrupar lotes por número de noche
        const grouped = noches?.map((noche) => {
            const nocheNumero = noche.noche;
            const lotesDeNoche = filteredLotes.filter(lote => lote.nronoche === nocheNumero);

            return {
                nocheNumero,
                dataNoche: noche,
                lotes: lotesDeNoche
            };

        });

        //Salida final para mapear
        setDataAuction(grouped);

        //Verificar si al menos una noche tiene lotes
        const hayLotes = grouped.some((noche) => noche.lotes.length > 0);

        //Setea si hay o no coincidencia de filtros
        setDataCountAuction(hayLotes);
     
    }, [data, currentAuctionNight, currentAuctionCategory, currentAuctionAuthor]);


    //Si cambia alguna categoría, autor o noche, hace un scroll hasta el inicio de la página 
    useEffect(() => {
        if (!isBrowser) return;

        // Evitar ejecución en el primer render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const isDesktop = windowSize.width >= 1025;
        const targetSelector = isDesktop ? "#scroll-container" : "#main-container";
        const target = document.querySelector(targetSelector);

        if (!target) return;

        const scrollTarget = isDesktop ? scrollbar.current : window;

        // Verificar scrollbar solo si es desktop
        if (isDesktop && !scrollbar.current) return;

        gsap.to(scrollTarget, {
            scrollTo: { y: target.offsetTop },
            duration: isDesktop ? 0.8 : 0.5,
            ease: Circ.easeOut,
        });
    }, [
    dataAuction,
    isBrowser,
    windowSize.width,
    ]);
    
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


    useEffect(() => {
        setIsBrowser(true);  
    }, []);


    return (
        <>
            {auctionFilterPanelStatus && <AuctionFilterPanel data={data} />}

            {isBrowser && ReactDOM.createPortal(<div className={!floatingFiltersBtn ? `${styles.floating_filters}` : `${styles.floating_filters} ${styles.active}`}>
                <button onClick={ () => setAuctionFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>
            </div>,document.getElementById("filters-btn-root"))}

            <div ref={container}>
                {dataAuction?.length > 0 && !dataCountAuction &&
                    <section className={styles.wrapper}>
                        <div className={styles.divider}>
                            <div className={styles.info}>
                                <p className={styles.red}>Si resultados</p> 
                            </div>
                            <button onClick={ () => setAuctionFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>                            
                        </div>
                        <div className={styles.itemsGrid}>  
                            <p>No hay coincidencias en la categoria {data?.categorias?.find((c) => c.id === currentAuctionCategory)?.nombre} {currentAuctionAuthor != "all" && `con el autor ${currentAuctionAuthor}`}.</p>
                        </div>                             
                    </section>
                }

                {dataAuction.map((nocheItem, i, arr) =>{
                    //Datos
                    const { dataNoche, lotes } = nocheItem;

                    // Encontrar índice del primer bloque que tiene lotes
                    const firstIndex = arr.findIndex(item => item.lotes?.length > 0);

                    return (
                        <section key={i} className={styles.wrapper}>
                            {lotes?.length > 0 &&
                                <>
                                    <div className={styles.divider}>
                                        <div className={styles.info}>
                                            <p className={styles.red}>Noche {dataNoche.noche}</p>
                                            <p className={styles.date_dsk}>{dataNoche.dia.format}</p>
                                            <p className={styles.date_mob}>{dataNoche.dia.short}</p>
                                                
                                            <p>{dataNoche.horario.format} H.</p>
                                        </div> 
                                        {i === firstIndex && <button onClick={ () => setAuctionFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>}
                                    </div>
                                    <div className={styles.itemsGrid}>
                                        {lotes.map((dataPiece, i) => {               
                                            return (
                                                <ItemPiece key={i} data={dataPiece} />
                                            );
                                        })}
                                    </div>
                                </>                    
                            }
                        </section>
                    )
                })}
            </div>
        </> 
    )
}