// Componente AuctionPiecesContainer optimizado con renderizado progresivo por IntersectionObserver

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
    const [containerHeight, setContainerHeight] = useState(0);
    const windowSize = useWindowSize();
    const [fadeAll, setFadeAll] = useState(false);

    const loadMoreRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(18);

    const {
        scrollbar,
        announcementStatus,
        currentAuctionNight,
        currentAuctionCategory,
        currentAuctionAuthor,
        auctionFilterPanelStatus,
        setAuctionFilterPanelStatus
    } = useAppContext(); 

    const [noches, setNoches] = useState([...data.noches]);
    const [dataAuction, setDataAuction] = useState([]);
    const [dataCountAuction, setDataCountAuction] = useState(false);

    useEffect(() => {
        if (!noches?.length || !data?.lotes?.length) {
            setDataAuction([]);
            return;
        }

        let filteredLotes = [...data.lotes];

        if (currentAuctionNight !== "all") {
            filteredLotes = filteredLotes.filter(
                (lote) => String(lote.nronoche) === String(currentAuctionNight)
            );
        }
        if (currentAuctionCategory !== "all") {
            filteredLotes = filteredLotes.filter(
                (lote) => String(lote.categoria) === String(currentAuctionCategory)
            );
        }
        if (currentAuctionAuthor !== "all") {
            filteredLotes = filteredLotes.filter(
                (lote) => String(lote.autor) === String(currentAuctionAuthor)
            );
        }

        const grouped = noches?.map((noche) => {
            const nocheNumero = noche.noche;
            const lotesDeNoche = filteredLotes.filter(lote => lote.nronoche === nocheNumero);
            return {
                nocheNumero,
                dataNoche: noche,
                lotes: lotesDeNoche
            };
        });

        setDataAuction(grouped);

        const hayLotes = grouped.some((noche) => noche.lotes.length > 0);
        setDataCountAuction(hayLotes);
        setVisibleCount(18);
    }, [data, currentAuctionNight, currentAuctionCategory, currentAuctionAuthor]);

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
    }, [dataAuction, isBrowser, windowSize.width]);

    
    useEffect(() => {
  if (!isBrowser || !dataAuction?.length) return;

  const hash = window.location.hash;
  if (!hash.startsWith("#id-")) return;

  const targetId = hash.replace("#id-", "");

  // activar fade (todo se pone con opacity 0)
  setFadeAll(true);

  // 1) recorrer para obtener índice global
  let globalIndex = 0;
  let foundIndex = null;
  for (const noche of dataAuction) {
    for (const lote of noche.lotes) {
      if (String(lote.id) === String(targetId)) {
        foundIndex = globalIndex;
        break;
      }
      globalIndex++;
    }
    if (foundIndex !== null) break;
  }

  if (foundIndex === null) return;

  // 2) asegurar que visibleCount cubra el ítem
  setVisibleCount((prev) => Math.max(prev, foundIndex + 10));

  // 3) esperar hasta que exista el elemento
  let cancelled = false;
  let start = performance.now();
  const maxWait = 2000;
  let rafId = 0;

  const check = () => {
    if (cancelled) return;
    const el = document.getElementById(`id-${targetId}`);
    if (el) {
      const isDesktop = windowSize.width >= 1025;
      const scrollTarget = isDesktop ? scrollbar?.current : window;

      const onScrollDone = () => {
        // fade-in cuando termina
        setFadeAll(false);
      };

      if (isDesktop && scrollbar?.current && typeof scrollbar.current.scrollTo === "function") {
        try {
          scrollbar.current.scrollTo(0, el.offsetTop, 600);
          setTimeout(onScrollDone, 650);
        } catch {
          gsap.to(scrollTarget, {
            scrollTo: { y: el.offsetTop },
            duration: isDesktop ? 0.8 : 0.5,
            ease: Circ.easeOut,
            onComplete: onScrollDone,
          });
        }
      } else {
        gsap.to(scrollTarget || window, {
          scrollTo: { y: el.offsetTop },
          duration: isDesktop ? 0.8 : 0.5,
          ease: Circ.easeOut,
          onComplete: onScrollDone,
        });
      }

      return;
    }

    if (performance.now() - start < maxWait) {
      rafId = requestAnimationFrame(check);
    }
  };

  rafId = requestAnimationFrame(check);

  return () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
  };
}, [isBrowser, dataAuction, windowSize.width, scrollbar]);





    useEffect(() => {
        if (!container.current) return;
        const resizeObserver = new ResizeObserver(() => {
            container?.current?.offsetHeight && setContainerHeight(container.current.offsetHeight);
        });
        resizeObserver.observe(container.current);            
        return () => resizeObserver.disconnect();        
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {        
            ScrollTrigger.create({
                trigger: container.current,
                start: "top -10%",
                end: () => `+=${containerHeight} 80%`,
                onEnterBack: () => setFloatingFiltersBtn(true),
                onEnter: () => setFloatingFiltersBtn(true),
                onLeaveBack: () => setFloatingFiltersBtn(false),
                onLeave: () => setFloatingFiltersBtn(false)
            });    
        }, container);
        return () => ctx.revert();
    }, [containerHeight]);

    useEffect(() => {
        setIsBrowser(true);  
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => prev + 12);
                }
            },
            { rootMargin: "600px" }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, []);

    const renderWithLimits = () => {
        let rendered = 0;

        return dataAuction.map((nocheItem, i, arr) => {
            const { dataNoche, lotes } = nocheItem;
            const firstIndex = arr.findIndex(item => item.lotes?.length > 0);

            const lotesToRender = lotes.slice(0, Math.max(0, visibleCount - rendered));
            rendered += lotes.length;

            return (
                <section key={i} className={styles.wrapper}>
                    {lotes.length > 0 && (
                        <>
                            <div className={styles.divider}>
                                <div className={styles.info}>
                                    <p className={styles.red}>Noche {dataNoche.noche}</p>
                                    <p className={styles.date_dsk}>{dataNoche.dia.format}</p>
                                    <p className={styles.date_mob}>{dataNoche.dia.short}</p>
                                    <p>{dataNoche.horario.format} H.</p>
                                </div>
                                {i === firstIndex && (
                                    <button onClick={() => setAuctionFilterPanelStatus(true)} className={styles.btn_filters}>FILTRAR</button>
                                )}
                            </div>

                            <div className={`${styles.itemsGrid} ${fadeAll ? "fade-all" : "fade-all-active"}`}>
                                {lotesToRender.map((dataPiece, i) => (
                                    <ItemPiece key={i} data={dataPiece} />
                                ))}
                            </div>
                        </>
                    )}
                </section>
            );
        });
    };

    return (
        <>
            {auctionFilterPanelStatus && <AuctionFilterPanel data={data} />}

            {isBrowser && ReactDOM.createPortal(
                <div className={`${!floatingFiltersBtn ? `${styles.floating_filters}` : `${styles.floating_filters} ${styles.active}`} ${announcementStatus ? styles.with_announcement : ""}`}>
                    <button onClick={() => setAuctionFilterPanelStatus(true)} className={styles.btn_filters}>FILTRAR</button>
                </div>,
                document.getElementById("filters-btn-root")
            )}

            <div ref={container}>
                {dataAuction?.length > 0 && !dataCountAuction && (
                    <section className={styles.wrapper}>
                        <div className={styles.divider}>
                            <div className={styles.info}>
                                <p className={styles.red}>Sin resultados</p>
                            </div>
                            <button onClick={() => setAuctionFilterPanelStatus(true)} className={styles.btn_filters}>FILTRAR</button>
                        </div>
                        <div className={styles.itemsGrid}>  
                            <p>No hay coincidencias.</p>
                        </div>                             
                    </section>
                )}

                {renderWithLimits()}

                <div ref={loadMoreRef} style={{ height: 1 }}></div>
            </div>
        </>
    );
}