'use client'
import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import LinksList from '../components/builder/LinksList/LinksList';
import Footer from "../components/structure/Footer/Footer";
import styles from "./not-found.module.scss";

export default function Error() {

  const contentFooter = {
    address: 'Rodriguez Peña 1778 (1021) Buenos Aires, Argentina.',
    email: 'info@martinsarachaga.com',
    networks: [
      {
        socialnetwork: 'Instagram',
        urlnetwork: 'https://www.instagram.com/'
      },
      {
        socialnetwork: 'Facebook',
        urlnetwork: 'https://www.facebook.com/'
      },
      {
        socialnetwork: 'LinkedIn',
        urlnetwork: 'https://www.linkedin.com/'
      },
      {
        socialnetwork: 'Youtube',
        urlnetwork: 'https://www.youtube.com/'
      }
    ],
    phones: [
      { phone: '(+54) 11 4815-0742' },
      { phone: '(+54) 9 11 2478-7437' }
    ],
    waphone: 'https://web.whatsapp.com/'
  };

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
      <Footer content={contentFooter} />      
    </MainWrapper>
  );
}