'use client'
import { useRef, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useAppContext } from '../../../app/context/AppContext';
import { useWindowSize } from "@uidotdev/usehooks";
import ItemPiece from '../ItemPiece/ItemPiece';
import PrivateSaleFilterPanel from '../PrivateSaleFilterPanel/PrivateSaleFilterPanel';
import { gsap, Circ } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import styles from "./PrivateSalePieces.module.scss"; 
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function PrivateSalePieces({ data }){
    const container = useRef(null);
    const [containerHeight, setContainertHeight] = useState(0);
    const [dataPrivateSalePieces, setDataPrivateSalePieces] = useState(data.categorias);
    const [currentPrivateSaleCategory, setCurrentPrivateSaleCategory] = useState('all');
    const [filterPanelStatus, setFilterPanelStatus] = useState(false);
    const [floatingFiltersBtn, setFloatingFiltersBtn] = useState(false);
    const [isBrowser, setIsBrowser] = useState(false);
    const windowSize = useWindowSize();
    const isFirstRender = useRef(true);
    const {scrollbar} = useAppContext(); 

    
    // Filtra la data por categoría
    useEffect(() => {
        let pieces = data.categorias;

        if (currentPrivateSaleCategory !== "all") {
            pieces = pieces.filter((piece) => piece.id === currentPrivateSaleCategory);              
        }

        setDataPrivateSalePieces(pieces);

    }, [currentPrivateSaleCategory, data]);


    // Calcula el alto del contenedor con las piezas
    useEffect(() => {
        if (!container.current) return;
        const resizeObserver = new ResizeObserver(() => {
        container?.current?.offsetHeight && setContainertHeight(container.current.offsetHeight);
        });
        resizeObserver.observe(container.current);            
        return () => resizeObserver.disconnect();        
    }, []); 


    // Cuando el usuario filtra contenido hace Scroll To hacia el inicio de la página
    useEffect(() => {
        if (!isBrowser) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const isDesktop = windowSize.width >= 1025;
        const targetSelector = isDesktop ? "#scroll-container" : "#main-container";
        const target = document.querySelector(targetSelector);

        if (!target) return;

        const scrollTarget = isDesktop ? scrollbar.current : window;

        if (isDesktop && !scrollbar.current) return;

        gsap.to(scrollTarget, {
            scrollTo: { y: target.offsetTop },
            duration: isDesktop ? 0.8 : 0.5,
            ease: Circ.easeOut,
        });
    }, [
    currentPrivateSaleCategory,
    isBrowser,
    windowSize.width,
    ]);


    //Muestra y oculta el botón de filtros flotante
    useEffect(() => {
        let ctx = gsap.context(() => {        
            ScrollTrigger.create({
                trigger: container.current,
                start: "top -10%",
                end: () => `+=${containerHeight} 80%`,
                onEnterBack: function() {
                    setFloatingFiltersBtn(true);
                },
                onEnter: function() {
                    setFloatingFiltersBtn(true);
                },
                onLeaveBack: function() {
                    setFloatingFiltersBtn(false);
                },
                onLeave: function() {
                    setFloatingFiltersBtn(false);
                }
            });    
        }, container);
        return () => ctx.revert();
    }, [containerHeight]); 


    useEffect(() => {
        setIsBrowser(true);  
    }, []);


    return (         
        <>     
            {filterPanelStatus &&
            <PrivateSaleFilterPanel
                data={data}
                setFilterPanelStatus={setFilterPanelStatus}   
                currentPrivateSaleCategory={currentPrivateSaleCategory}
                setCurrentPrivateSaleCategory={setCurrentPrivateSaleCategory}            
            />}

            {isBrowser && ReactDOM.createPortal(<div className={!floatingFiltersBtn ? `${styles.floating_filters}` : `${styles.floating_filters} ${styles.active}`}>
                <button onClick={ () =>setFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>
            </div>,document.getElementById("filters-btn-root"))}  

            <div ref={container}>         
                {dataPrivateSalePieces?.map((d, i) => {    
                    return (
                        <section key={i} className={styles.wrapper}>                                      
                            <div className={styles.divider}>
                                <div className={styles.info}>
                                    <p>{d.nombre}</p>                        
                                </div>    
                                {i === 0 && <button onClick={ () => setFilterPanelStatus(true) } className={styles.btn_filters}>FILTRAR</button>}                                   
                            </div>                                   
                            <div className={styles.itemsGrid}>
                                {d.lotes.map((lote, i) => {               
                                    return (
                                        <ItemPiece key={i} data={lote} />
                                    );
                                })}
                            </div>                                                       
                        </section>                  
                    );
                })}
            </div>
        </>
    )
}