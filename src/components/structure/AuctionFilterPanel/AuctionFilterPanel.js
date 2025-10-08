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

  function resetFilters(value) {
    setCurrentAuctionNight(value);
    setCurrentAuctionCategory('all');
    setCurrentAuctionAuthor('all');
  }

  // 🔍 Función para filtrar piezas según filtros activos
  function getFilteredPieces(noche, categoria, autor) {
    return data?.lotes?.filter((piece) => {
      const matchNoche = noche === 'all' || piece.nronoche == noche;
      const matchCategoria = categoria === 'all' || piece.categoria == categoria;
      const matchAutor = autor === 'all' || piece.autor == autor;
      return matchNoche && matchCategoria && matchAutor;
    });
  }

  // Filtra las categorías que tienen obras
  const categoriasConObras = data?.categorias?.filter(cat => {
    const obras = getFilteredPieces(currentAuctionNight, cat.id, currentAuctionAuthor);
    return obras.length > 0;
  }) || [];

  // Si solo hay una categoría con obras, asegúrate de activarla automáticamente
  useEffect(() => {
    if (categoriasConObras.length === 1) {
      setCurrentAuctionCategory(categoriasConObras[0].id);
    }
  }, [categoriasConObras]);

  // Filtra los autores que tienen obras
  const autoresConObras = data?.autores?.filter(autor => {
    const obras = getFilteredPieces(currentAuctionNight, currentAuctionCategory, autor.original);
    return obras.length > 0;
  }) || [];

  // Si solo hay un autor con obras, activarlo automáticamente
  useEffect(() => {
    if (autoresConObras.length === 1) {
      setCurrentAuctionAuthor(autoresConObras[0].original);
    }
  }, [autoresConObras]);


  const panelContent = (
    <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
      <div className={styles.panel}>

        <div className={styles.header}>
          <h4>FILTROS</h4>
          <button onClick={closeFilters} className={styles.close_btn} />
        </div>

        {/* FILTRO: NOCHES */}
        {/* <div className={styles.filter_group}>
          <h5 className={styles.title}>Noche</h5>
           <button
            onClick={() => resetFilters('all') }
            className={currentAuctionNight === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
          >
            Todas
          </button>
          {data?.noches?.map((dataNoche, i) => {
            //const obras = getFilteredPieces(dataNoche.noche, currentAuctionCategory, currentAuctionAuthor);
            //if (obras.length === 0) return null;

            return (
              <button
                onClick={() => resetFilters(dataNoche.noche)}
                key={i}
                className={currentAuctionNight === dataNoche.noche ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
              >
                <span className={`${styles.text} ${styles.date}`}>{dataNoche.dia.short}</span>
                <span className={styles.bg} />
              </button>
            );
          })}
        </div> */}

        {/* FILTRO: CATEGORÍAS */}
        <div className={styles.filter_group}>
          <h5 className={styles.title}>CATEGORÍA</h5>
           
            <button
              onClick={() => setCurrentAuctionCategory('all')}
              className={currentAuctionCategory === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
            >
              Todas
            </button>
         

          {data?.categorias?.map((dataCategoria, i) => {
            //const obras = getFilteredPieces(currentAuctionNight, dataCategoria.id, currentAuctionAuthor);
            //if (obras.length === 0) return null;

            return (
              <button
                onClick={() => setCurrentAuctionCategory(dataCategoria.id)}
                key={i}
                className={currentAuctionCategory === dataCategoria.id ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
              >
                <span className={styles.text}>{dataCategoria.nombre}</span>
                <span className={styles.bg} />
              </button>
            );
          })}
        </div>

        {/* FILTRO: AUTORES */}
        <div className={styles.filter_group}>
          <h5 className={styles.title}>AUTOR</h5>
          {autoresConObras.length > 1 && (
            <button
              onClick={() => setCurrentAuctionAuthor('all')}
              className={currentAuctionAuthor === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
            >
              Todos
            </button>
          )}
          {data?.autores?.map((dataAutor, i) => {
            const obras = getFilteredPieces(currentAuctionNight, currentAuctionCategory, dataAutor.original);
            if (obras.length === 0) return null;

            return (
              <button
                onClick={() => setCurrentAuctionAuthor(dataAutor.original)}
                key={i}
                className={currentAuctionAuthor === dataAutor.original ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
              >
                <span className={styles.text}>{dataAutor.original}</span>
                <span className={styles.bg} />
              </button>
            );
          })}
        </div>

      </div>

      <button onClick={closeFilters} className={styles.overlay_close} />
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(panelContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
}

/* "use client";
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

  function resetFilters() {
    setCurrentAuctionNight('all');
    setCurrentAuctionCategory('all');
    setCurrentAuctionAuthor('all');
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
          <button onClick={ () =>resetFilters() } className={currentAuctionNight === 'all' ? `${styles.btn_filter} ${styles.active}` : `${styles.btn_filter}`}>Todas</button>
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
} */