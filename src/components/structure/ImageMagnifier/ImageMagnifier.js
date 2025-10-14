'use client';
import { useEffect, useState , useRef } from 'react';
import ReactDOM from "react-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import styles from './ImageMagnifier.module.scss';
import Image from 'next/image';

const ImageMagnifier = ({ photo }) => {    
    const imageContainerRef = useRef(null);
    const overlayRef = useRef(null);  
    const windowSize = useWindowSize();

    const [overlayClass, setOverlayClass] = useState(styles.overlay_width);

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

    // Ajustar clase del overlay según las proporciones de la imagen
    useEffect(() => {
        if (photo && photo.width && photo.height) {
            const proportions = photo.width / photo.height;
            // Si la imagen es más ancha que alta
            if (proportions > 1) {
                setOverlayClass(styles.overlay_height);
            // Si la imagen es más alta que ancha
            } else if (proportions < 1) {
                setOverlayClass(styles.overlay_width);
            // Si la imagen es cuadrada
            } else {
                setOverlayClass(styles.overlay_width);
            }
        }
    }, [photo]);

    return (
        <>
            {windowSize.width > 1024 && ReactDOM.createPortal(
                <div
                    ref={overlayRef}
                    className={`${styles.overlay} ${overlayClass}`}
                    style={{ backgroundImage: `url(${photo?.src})` }}
                />
            ,document.getElementById("modal-root"))}

            {photo?.src && 
                <div ref={imageContainerRef} className={styles.image_container}>
                    <Image 
                        src={photo?.src}
                        alt="Imagen"
                        width={photo?.width}
                        height={photo?.height}
                        className={styles.image}
                    />
                </div>
            }
        </>
    );
};

export default ImageMagnifier;