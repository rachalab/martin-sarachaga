'use client';
import { useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import styles from './ImageMagnifier.module.scss';

const ImageMagnifier = ({ photo }) => {    
    const imageContainerRef = useRef(null);
    const overlayRef = useRef(null);  
    const windowSize = useWindowSize();

    useEffect(() => {
        if (windowSize.width < 1025) return;
        const imageContainer = imageContainerRef.current;
        const overlay = overlayRef.current;

        if (!imageContainer || !overlay) return;

        const showOverlay = () => {
            overlay.style.display = 'block';
        };

        const hideOverlay = () => {
            overlay.style.display = 'none';
        };

        const handleMove = (e) => {
            const { pageX, pageY } = e;
            const { left, top, width, height } = imageContainer.getBoundingClientRect();

            const offsetX = pageX - left;
            const offsetY = pageY - top;

            const posX = `${((offsetX / width) * 100).toFixed(2)}%`;
            const posY = `${((offsetY / height) * 100).toFixed(2)}%`;

            overlay.style.backgroundPosition = `${posX} ${posY}`;
        };

        imageContainer.addEventListener('mouseenter', showOverlay);
        imageContainer.addEventListener('mouseleave', hideOverlay);
        imageContainer.addEventListener('mousemove', handleMove, { passive: true });

        return () => {
            imageContainer.removeEventListener('mouseenter', showOverlay);
            imageContainer.removeEventListener('mouseleave', hideOverlay);
            imageContainer.removeEventListener('mousemove', handleMove);
        };
    }, [windowSize.width]);


    return (
        <>
            {windowSize.width > 1024 && ReactDOM.createPortal(<div
                ref={overlayRef}
                className={`${styles.overlay} ${styles.overlay_width}`}
                style={{ backgroundImage: `url(${photo})` }}
            />,document.getElementById("modal-root"))}

            <div ref={imageContainerRef} className={styles.image_container}>
                <img
                    src={photo}
                    alt="Imagen"
                    className={styles.image}
                />      
            </div>
        </>
    );
};

export default ImageMagnifier;