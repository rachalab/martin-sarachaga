"use client";

import { useAppContext } from '../../../app/context/AppContext';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./AuctionFilterPanel.module.scss";

export default function AuctionFilterPanel({ data }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    currentAuctionNight,
    setCurrentAuctionNight,
    currentAuctionCategory,
    setCurrentAuctionCategory,
    currentAuctionAuthor,
    setCurrentAuctionAuthor,
    setAuctionFilterPanelStatus
  } = useAppContext();


  //Lista de Autores
  const [dataAuthor, setDataAuthor] = useState([...data?.autores]);

  useEffect(() => {
    if (!data?.lotes?.length) return;

    //Empezamos con todos los lotes
    let filteredLotes = [...data.lotes];

    //Filtrar por noche si corresponde
    if (currentAuctionNight !== "all") {
      filteredLotes = filteredLotes.filter(
        (lote) => String(lote.nronoche) === String(currentAuctionNight)
      );
    }

    //Filtrar por categoría si corresponde
    if (currentAuctionCategory !== "all") {
      filteredLotes = filteredLotes.filter(
        (lote) => String(lote.categoria) === String(currentAuctionCategory)
      );
    }
    
    //Obtener los IDs de autores que están presentes en los lotes filtrados
    const autoresIds = filteredLotes
      .map((lote) => lote.autor)
      .filter((id, index, self) => id && self.indexOf(id) === index);

    //Filtrar los objetos de data.autores cuyos 'original' estén en autoresIds
    const autoresFiltrados = data.autores.filter((autorObj) =>
      autoresIds.includes(autorObj.original)
    );

    //Actualizar el estado
    setDataAuthor(autoresFiltrados);

  }, [currentAuctionNight, currentAuctionCategory, data?.lotes]);


  useEffect(() => {
    setIsBrowser(true);
  }, []);

  function closeFilters() {
    setIsClosing(true);
    setTimeout(() => {
      setAuctionFilterPanelStatus(false);
    }, 800);
  }

  //Filtrado de piezas
  function resetFilters({ night, category, author }) {
    setCurrentAuctionNight(night);
    setCurrentAuctionCategory(category);
    setCurrentAuctionAuthor(author);
  }

  const panelContent = (
    <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
      <div className={styles.panel}>

        <div className={styles.header}>
          <h4>FILTROS</h4>
          <button onClick={closeFilters} className={styles.close_btn} />
        </div>

        {/* FILTRO: CATEGORÍAS */}
        {data?.categorias.length > 1 && (        
          <div className={styles.filter_group}>
            <h5 className={styles.title}>CATEGORÍA</h5>
            <button
              onClick={() => resetFilters({
                night: currentAuctionNight, 
                category: "all", 
                author: 'all'
              })}
              className={currentAuctionCategory === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
              >
              Todas
            </button>

            {data?.categorias?.map((dataCategoria, i) => {
              return (
                <button
                  onClick={() => resetFilters({
                    night: currentAuctionNight, 
                    category: dataCategoria.id, 
                    author: currentAuctionAuthor
                  })}                
                  key={i}
                  className={currentAuctionCategory === dataCategoria.id ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
                >
                  <span className={styles.text}>{dataCategoria.nombre}</span>
                  <span className={styles.bg} />
                </button>
              );
            })}
          </div>
        )}
        {/* FILTRO: NOCHES */}
        {/*data?.noches.length > 1 && (
          <div className={styles.filter_group}>
            <h5 className={styles.title}>Noche</h5>
            {<button
              onClick={() => resetFilters({
                night:'all', 
                category: currentAuctionCategory, 
                author: 'all'
              })}
              className={currentAuctionNight === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
            >
              Todas
            </button>}
            {data?.noches?.map((dataNoche, i) => {
              return (
                <button
                  onClick={() => resetFilters({
                    night: dataNoche.noche,
                    category: currentAuctionCategory, 
                    author: currentAuctionAuthor
                  })}
                  key={i}
                  className={currentAuctionNight === dataNoche.noche ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
                >
                  <span className={`${styles.text} ${styles.date}`}>{dataNoche.dia.short}</span>
                  <span className={styles.bg} />
                </button>
              );
            })}
          </div>
        )*/}        
        {/* FILTRO: AUTORES */}
        <div className={styles.filter_group}>
          <h5 className={styles.title}>AUTOR</h5>

            <button
              onClick={() => resetFilters({
                night: currentAuctionNight, 
                category: currentAuctionCategory,
                author: "all"
              })}
              className={currentAuctionAuthor === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
            >
              Todos
            </button>
          
          {dataAuthor?.map((dataAutor, i) => {
            return (
              <button
                onClick={() => resetFilters({
                  night: currentAuctionNight, 
                  category: currentAuctionCategory, 
                  author: dataAutor.original
                })}
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