'use client';
import { useState, useEffect } from 'react';
//import Image from 'next/image';
import styles from "./PrefilterImagesChange.module.scss";

export default function PrefilterImagesChange({ images = [] }) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentImgIndex((prevIndex) =>
                prevIndex >= images.length - 1 ? 0 : prevIndex + 1
            );
        }, 500);

        return () => clearInterval(intervalId);
    }, [images]);

    return (
        <>
            {images.map((image, i) => (             
                <img
                key={i}
                src={image}
                alt={`Imagen ${i + 1}`}
                width={500}
                height={300}
                className={`${styles.img} ${i !== currentImgIndex ? styles.hide : ''}`}
                />
            ))}
        </>
    );
}