import { builder } from "@builder.io/sdk";
import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import LinksList from '../components/builder/LinksList/LinksList';
import Footer from "../components/structure/Footer/Footer";
import styles from "./not-found.module.scss";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function NotFound() {

  const contentFooter = await builder.get("footer").toPromise();

  const dataLinks = [
    {destination: "/subasta-presencial", title: "Subasta presencial", type: "internal"},
    {destination: "/subastas-virtuales", title: "Subastas virtuales", type: "internal"},
    {destination: "/venta-privada", title: "Venta privada", type: "internal"},
    {destination: "/la-casa", title: "La casa", type: "internal"}
  ];

  return (
    <MainWrapper>
      <p className={styles.ops}>OUCH!</p>
      <p className={styles.message}>La página que buscas no está disponible.</p>
      <div className={styles.links_container}>
        <LinksList title="SEGUIR NAVEGANDO" links={dataLinks}/>
      </div>    
      {contentFooter?.data && <Footer content={contentFooter?.data} model={"footer"} /> }   
    </MainWrapper>
  );
}