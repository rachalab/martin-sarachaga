'use client'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useAppContext } from '../../../app/context/AppContext';
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
    

    //Traemos lo que necesitamos de AppContext        
    const {
        scrollbar,
        dataAuctionPieces,
        setDataAuctionPieces,
        dataAuctionNighs,
        setDataAuctionNighs,
        currentAuctionNight,
        setCurrentAuctionNight,
        currentAuctionCategory,
        currentAuctionAuthor,
        auctionFilterPanelStatus,
        setAuctionFilterPanelStatus
    } = useAppContext(); 


    //Filtramos la data
    useEffect(() => {
        // Se parte de la lista completa de lotes (obras) y de todas las noches disponibles
        let pieces = data.lotes;
        let noches = data.noches;

        // Se crea un Set para almacenar las noches únicas resultantes después de aplicar filtros
        const nightsSet = new Set();

        // 🔍 Función que aplica un filtro (por categoría o autor)
        const applyFilter = (filterValue, key) => {
            // Solo filtra si no está seleccionado "all"
            if (filterValue !== "all") {
                // Filtra las piezas según el valor del filtro (ej: categoría o autor)
                pieces = pieces.filter((piece) => piece[key] === filterValue);

                // Guarda en el set las noches de las piezas filtradas
                pieces.forEach((piece) => nightsSet.add(piece.nronoche));

                // Si hay más de una noche en el resultado
                if (nightsSet.size > 1) {
                    // Se muestran todas las noches disponibles
                    setDataAuctionNighs(noches);
                    // Se reinicia la selección de noche en "all"
                    setCurrentAuctionNight("all");
                } else {
                    // Si solo quedó una noche disponible, se fuerza esa selección
                    const onlyNight = [...nightsSet][0];
                    // Se limita el estado de noches únicamente a esa noche
                    setDataAuctionNighs(noches.filter((n) => n.noche === onlyNight));
                    // Se actualiza la noche seleccionada a esa noche única
                    setCurrentAuctionNight(onlyNight);
                }
            }
        };

        // 👉 Aplica filtros de categoría y autor (en ese orden)
        applyFilter(currentAuctionCategory, "categoria");
        applyFilter(currentAuctionAuthor, "autor");

        // 👉 Si el usuario eligió una noche específica
        if (currentAuctionNight !== "all") {
            // Filtra las piezas solo por esa noche
            pieces = pieces.filter((piece) => piece.nronoche === currentAuctionNight);
            // Filtra también el array de noches para dejar solo la seleccionada
            noches = noches.filter((n) => n.noche === currentAuctionNight);
        }

        // ✅ Actualiza los estados finales con los resultados filtrados
        setDataAuctionPieces(pieces); // piezas filtradas
        setDataAuctionNighs(noches);  // noches filtradas o todas

    // 🔄 Se ejecuta cada vez que cambia alguno de los filtros o los datos originales
    }, [currentAuctionNight, currentAuctionCategory, currentAuctionAuthor, data]);


    
   /*  useEffect(() => {
        let pieces = data.lotes;
        let noches = data.noches;
        let nightsObject = { nronoche: [] };

        if (currentAuctionCategory !== "all") {
            pieces = pieces.filter((piece) => piece.categoria === currentAuctionCategory);

            pieces.forEach((piece) => {
                if (!nightsObject.nronoche.includes(piece.nronoche)) {
                    nightsObject.nronoche.push(piece.nronoche);
                }
            });     
              
            if(nightsObject.nronoche.length > 1){
                setDataAuctionNighs(noches);
                setCurrentAuctionNight('all');
            } else{                
                setDataAuctionNighs(noches.filter((n) => n.noche === nightsObject.nronoche[0]));
                setCurrentAuctionNight(nightsObject.nronoche[0]);
            }
        } 

        if (currentAuctionAuthor !== "all") {
            pieces = pieces.filter((piece) => piece.autor === currentAuctionAuthor); 
            
            pieces.forEach((piece) => {
                if (!nightsObject.nronoche.includes(piece.nronoche)) {
                    nightsObject.nronoche.push(piece.nronoche);
                }
            });     
              
            if(nightsObject.nronoche.length > 1){
                setDataAuctionNighs(noches);
                setCurrentAuctionNight('all');
            } else{                
                setDataAuctionNighs(noches.filter((n) => n.noche === nightsObject.nronoche[0]));
                setCurrentAuctionNight(nightsObject.nronoche[0]);
            }
        }

        if (currentAuctionNight !== "all") {
            pieces = pieces.filter((piece) => piece.nronoche === currentAuctionNight);
            noches = noches.filter((n) => n.noche === currentAuctionNight);
        }
        
        setDataAuctionPieces(pieces);     
        setDataAuctionNighs(noches);  
           
    }, [currentAuctionNight, currentAuctionCategory, currentAuctionAuthor, data]);   */

    
    
    //Si cambia alguna categoría, autor o noche, hace un scroll hasta el inicio de la página 
    useEffect(() => {
        if (!isBrowser || !scrollbar.current) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const target = document.querySelector("#scroll-container");
        if (!target) return;

        gsap.to(scrollbar.current, {
            scrollTo: { y: target.offsetTop },
            duration: 0.8,
            ease: Circ.easeOut,
        });

    }, [currentAuctionNight, currentAuctionCategory, currentAuctionAuthor, isBrowser]);  
    

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
                {dataAuctionNighs?.map((dataNoche, i) => {     
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
                                        {i === 0 && <button onClick={ () => setAuctionFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>}
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