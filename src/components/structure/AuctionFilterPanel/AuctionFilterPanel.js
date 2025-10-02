"use client";
import { useAppContext } from '../../../app/context/AppContext';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./AuctionFilterPanel.module.scss";

export default function AuctionFilterPanel({ data }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    dataAuctionPieces,
    currentAuctionNight,
    setCurrentAuctionNight,
    currentAuctionCategory,
    setCurrentAuctionCategory,
    currentAuctionAuthor,
    setCurrentAuctionAuthor,
    setAuctionFilterPanelStatus
  } = useAppContext(); 

  useEffect(() => {
    setIsBrowser(true);  
  }, []);

  function closeFilters() {
    setIsClosing(true);
    setTimeout(() => {
      setAuctionFilterPanelStatus(false);
    }, 800);
  }  

  const panelContent = (
    <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
      <div className={styles.panel}>

        <div className={styles.header}>
          <h4>FILTROS</h4>
          <button onClick={() => closeFilters()} className={styles.close_btn}/>
        </div>

        <div className={styles.filter_group}>
          <h5 className={styles.title}>FECHA</h5>
          <button onClick={ () => setCurrentAuctionNight('all') } className={currentAuctionNight === 'all' ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}>Todas</button>
            {data?.noches?.map((dataNoche, i) => {  
              // Filtra temporalmente por la categoría que va a mostrar como opción de filtro                
              let obras = dataAuctionPieces.filter((piece) => piece.nronoche == dataNoche.noche); 
              return(
                // Imprime el botón, solo si hay obras filtradas por categoría o no hay filtradas por categoría pero hay obras que corresponden a esta categoría puntual          
                ((obras.length > 0 && currentAuctionNight === 'all') || currentAuctionNight !== 'all') && <button onClick={ () => setCurrentAuctionNight(dataNoche.noche) } key={i} className={currentAuctionNight === dataNoche.noche ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}><span className={styles.text}>Noche N°{dataNoche.noche}</span><span className={styles.bg}/></button>                   
              );
            })}
        </div>

        <div className={styles.filter_group}>
          <h5 className={styles.title}>CATEGORÍA</h5>
           <button onClick={ () => setCurrentAuctionCategory('all') } className={currentAuctionCategory === 'all' ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}>Todas</button>
            {data?.categorias?.map((dataCategoria, i) => {   
              // Filtra temporalmente por la categoría que va a mostrar como opción de filtro                
              let obras = dataAuctionPieces.filter((piece) => piece.categoria == dataCategoria.id); 
              return(
                // Imprime el botón, solo si hay obras filtradas por categoría o no hay filtradas por categoría pero hay obras que corresponden a esta categoría puntual          
                ((obras.length > 0 && currentAuctionCategory === 'all') || currentAuctionCategory !== 'all') &&                    
                <button onClick={ () => setCurrentAuctionCategory(dataCategoria.id) } key={i} className={currentAuctionCategory === dataCategoria.id ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}><span className={styles.text}>{dataCategoria.nombre}</span><span className={styles.bg}/></button>                                    
              );
            })}
        </div>

        <div className={styles.filter_group}>
          <h5 className={styles.title}>AUTOR</h5>
          <button onClick={ () => setCurrentAuctionAuthor('all') } className={currentAuctionAuthor === 'all' ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}>Todos</button>
            {data?.autores?.map((dataAutor, i) => {   
              let obras = dataAuctionPieces.filter((piece) => piece.autor == dataAutor.original); 
              return(
                ((obras.length > 0 && currentAuctionAuthor === 'all') || currentAuctionAuthor !== 'all') &&                    
                <button onClick={ () => setCurrentAuctionAuthor(dataAutor.original) } key={i} className={currentAuctionAuthor === dataAutor.original ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}><span className={styles.text}>{dataAutor.original}</span><span className={styles.bg}/></button>                                  
              );
            })}           
        </div>   

      </div>

      <button onClick={ () => closeFilters() } className={styles.overlay_close}/>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      panelContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}