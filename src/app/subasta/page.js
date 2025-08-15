'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import styles from './page.module.scss';

const subasta = () => {
  const circleRef = useRef(null);
  const [currentImage, setCurrentImage] = useState('');
  const [isMoving, setIsMoving] = useState(false);
  const [currentHoveredIndex, setCurrentHoveredIndex] = useState(-1);
  const [imageIndex, setImageIndex] = useState(0);
  
  // Referencias para el throttling del movimiento
  const movementTimeoutRef = useRef(null);
  const lastMoveTimeRef = useRef(0);

  const categories = [
    { 
      name: 'Arte oriental', 
      images: [
        'https://martinsarachaga.com/imagenes_lotes/143702_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143701_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/142051_1_grande.jpg'
      ]
    },
    { 
      name: 'Esculturas', 
      images: [
         'https://martinsarachaga.com/imagenes_lotes/143702_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143701_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/142051_1_grande.jpg'
      ]
    },
    { 
      name: 'Muebles', 
      images: [
        'https://martinsarachaga.com/imagenes_lotes/143472_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/144095_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143145_1_grande.jpg'
      ]
    },
    { 
      name: 'Objetos de diseño', 
      images: [
        'https://martinsarachaga.com/imagenes_lotes/143142_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143490_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143999_1_grande.jpg'
      ]
    },
    { 
      name: 'Platería', 
      images: [
        'https://martinsarachaga.com/imagenes_lotes/144102_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143190_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/141537_1_grande.jpg'
      ]
    },
    { 
      name: 'Pintura argentina', 
      images: [
        'https://martinsarachaga.com/imagenes_lotes/143208_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143209_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143210_1_grande.jpg'
      ]
    },
    { 
      name: 'Pintura europea', 
      images: [
        'https://martinsarachaga.com/imagenes_lotes/143211_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143212_1_grande.jpg',
        'https://martinsarachaga.com/imagenes_lotes/143213_1_grande.jpg'
      ]
    }
  ];

  useEffect(() => {
    const moveCircle = (e) => {
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          duration: 0.3,
          left: e.pageX - 130,
          top: e.pageY - 130,
          ease: "power2.out"
        });
      }

      // Detectar si el cursor se está moviendo
      const currentTime = Date.now();
      const timeDiff = currentTime - lastMoveTimeRef.current;
      
      if (timeDiff > 200) { // Throttle para evitar demasiados cambios
        setIsMoving(true);
        lastMoveTimeRef.current = currentTime;

        // Cambiar imagen solo si estamos sobre un enlace
        if (currentHoveredIndex >= 0) {
          const currentCategory = categories[currentHoveredIndex];
          if (currentCategory && currentCategory.images.length > 0) {
            setImageIndex(prevIndex => 
              (prevIndex + 1) % currentCategory.images.length
            );
            setCurrentImage(currentCategory.images[imageIndex]);
          }
        }

        // Limpiar timeout anterior
        if (movementTimeoutRef.current) {
          clearTimeout(movementTimeoutRef.current);
        }

        // Establecer que el cursor se detuvo después de 100ms sin movimiento
        movementTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 100);
      }
    };

    window.addEventListener('mousemove', moveCircle);

    return () => {
      window.removeEventListener('mousemove', moveCircle);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, [currentHoveredIndex, imageIndex]);

  const handleMouseEnter = (categoryIndex) => {
    setCurrentHoveredIndex(categoryIndex);
    setImageIndex(0); // Reiniciar al primer índice
    const category = categories[categoryIndex];
    if (category && category.images.length > 0) {
      setCurrentImage(category.images[0]);
    }
  };

  const handleMouseLeave = () => {
    setCurrentHoveredIndex(-1);
    setCurrentImage('');
    setImageIndex(0);
    setIsMoving(false);
  };

    const allImageUrls = categories.flatMap(category => category.images);
  return (
    <>
    <Head>
        {allImageUrls.map((imageUrl, index) => (
          <link
            key={index}
            rel="preload"
            as="image"
            href={imageUrl}
          />
        ))}
      </Head>
    <div className={styles.container}>
      {/* Círculo que sigue al cursor */}
      <div
        ref={circleRef}
        className={`${styles.cursorCircle} ${currentImage ? styles.hasImage : ''}`}
        style={{
          backgroundImage: currentImage ? `url(${currentImage})` : 'none',
          backgroundColor: currentImage ? 'transparent' : '#333333'
        }}
      />

      {/* Container para los enlaces */}
      <nav className={styles.navigationContainer}>
        {categories.map((item, index) => (
          <a
            key={index}
            href="#"
            className={styles.colorLink}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.preventDefault()}
          >
            <span className={styles.colorName}>{item.name}</span>
            
          </a>
        ))}
      </nav>

      {/* Instrucciones */}
      <div className={styles.instructions}>
        Mové el cursor sobre los enlaces - Las imágenes cambian mientras te movés
        {currentHoveredIndex >= 0 && (
          <div className={styles.currentInfo}>
            {categories[currentHoveredIndex].name} - Imagen {imageIndex + 1} de {categories[currentHoveredIndex].images.length}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default subasta;

