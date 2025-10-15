'use client'

import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import LinksList from '../components/builder/LinksList/LinksList';
import Footer from "../components/structure/Footer/Footer";
import styles from "./not-found.module.scss";

export default function Error() {

  const dataLinks = [
    {destination: "/subasta-presencial", title: "Subasta presencial", type: "internal"},
    {destination: "/subastas-virtuales", title: "Subastas virtuales", type: "internal"},
    {destination: "/venta-privada", title: "Venta privada", type: "internal"},
    {destination: "/la-casa", title: "La casa", type: "internal"}
  ];

  return (
    <MainWrapper>
      <p className={styles.ops}>OOOPS</p>
      <p className={styles.message}>La página que buscas no está disponible.</p>
      <div className={styles.links_container}>
        <LinksList title="SEGUIR NAVEGANDO" links={dataLinks}/>
      </div>    
      <Footer />      
    </MainWrapper>
  );
}