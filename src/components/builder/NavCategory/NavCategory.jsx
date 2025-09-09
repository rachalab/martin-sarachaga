"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { gsap } from "gsap";
import styles from "./NavCategory.module.scss";

const NavCategory = ({ categories = [] }) => {
  const circleRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("");
  const [isMoving, setIsMoving] = useState(false);
  const [currentHoveredIndex, setCurrentHoveredIndex] = useState(-1);
  const [imageIndex, setImageIndex] = useState(0);

  const movementTimeoutRef = useRef(null);
  const lastMoveTimeRef = useRef(0);

  useEffect(() => {
    const moveCircle = (e) => {
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          duration: 0.3,
          left: e.pageX - 130,
          top: e.pageY - 130,
          ease: "power2.out",
        });
      }

      const currentTime = Date.now();
      const timeDiff = currentTime - lastMoveTimeRef.current;

      if (timeDiff > 200) {
        setIsMoving(true);
        lastMoveTimeRef.current = currentTime;

        console.log("categories:", categories);

        if (currentHoveredIndex >= 0) {
          const currentCategory = categories[currentHoveredIndex];
          if (currentCategory && currentCategory.images?.length > 0) {
            setImageIndex(
              (prevIndex) => (prevIndex + 1) % currentCategory.images.length
            );
            setCurrentImage(currentCategory.images[imageIndex].url);
          }
        }

        if (movementTimeoutRef.current) {
          clearTimeout(movementTimeoutRef.current);
        }

        movementTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 100);
      }
    };

    window.addEventListener("mousemove", moveCircle);


    console.log("categories: ", categories);

    return () => {
      window.removeEventListener("mousemove", moveCircle);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, [currentHoveredIndex, imageIndex, categories]);

  const handleMouseEnter = (categoryIndex) => {
    setCurrentHoveredIndex(categoryIndex);
    setImageIndex(0);
    const category = categories[categoryIndex];
    if (category && category.images?.length > 0) {
      setCurrentImage(category.images[0]);
    }
  };

  const handleMouseLeave = () => {
    setCurrentHoveredIndex(-1);
    setCurrentImage("");
    setImageIndex(0);
    setIsMoving(false);
  };

  const allImageUrls = categories.flatMap((category) => category.images || []);

  return (
    <>
      <Head>
        {allImageUrls.map((imageUrl, index) => (
          <link key={index} rel="preload" as="image" href={imageUrl} />
        ))}
      </Head>

      <div className={styles.container}>
        <div
          ref={circleRef}
          className={`${styles.cursorCircle} ${
            currentImage ? styles.hasImage : ""
          }`}
          style={{
            backgroundImage: currentImage ? `url(${currentImage})` : "none",
            backgroundColor: currentImage ? "transparent" : "#333333",
          }}
        />

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

        <div className={styles.instructions}>
          Mové el cursor sobre los enlaces - Las imágenes cambian mientras te
          movés
          {currentHoveredIndex >= 0 && (
            <div className={styles.currentInfo}>
              {categories[currentHoveredIndex].name} - Imagen {imageIndex + 1}{" "}
              de {categories[currentHoveredIndex].images.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavCategory;