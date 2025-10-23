"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./PrivateSaleFilterPanel.module.scss";

export default function PrivateSaleFilterPanel({
    data,
    setFilterPanelStatus,
    currentPrivateSaleCategory,
    setCurrentPrivateSaleCategory
}){

    const [isBrowser, setIsBrowser] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    function closeFilters() {
        setIsClosing(true);
        setTimeout(() => {
        setFilterPanelStatus(false);
        }, 800);
    }

    const panelContent = (
        <div className={!isClosing ? `${styles.wrapper}` : `${styles.wrapper} ${styles.closing}`}>
        <div className={styles.panel}>

            <div className={styles.header}>
                <h4>FILTROS</h4>
                <button onClick={closeFilters} className={styles.close_btn} />
            </div>
    
            <div className={styles.filter_group}>
                <h5 className={styles.title}>CATEGORÍA</h5>
            
                <button
                onClick={() => setCurrentPrivateSaleCategory('all')}
                className={currentPrivateSaleCategory === 'all' ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}>
                    <span className={styles.text}>Todas</span>
                    <span className={styles.bg} />
                </button>        

                {data?.categorias?.map((dataCategoria, i) => {      
                    return (
                        <button
                            onClick={() => setCurrentPrivateSaleCategory(dataCategoria.id)}
                            key={i}
                            className={currentPrivateSaleCategory === dataCategoria.id ? `${styles.btn_filter} ${styles.active}` : styles.btn_filter}
                        >
                            <span className={styles.text}>{dataCategoria.nombre}</span>
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