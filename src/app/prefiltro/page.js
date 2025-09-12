import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
import LinksList from "../../components/builder/LinksList/LinksList";
import Footer from "../../components/structure/Footer/Footer";
import styles from "./Prefiltro.module.scss"; 

export default function Home() {
  return (
    <MainWrapper>  
        <Heading data={{heading: 'SUBASTA PRESENCIAL'}} />
        <div className={styles.nights}>
            <div className={styles.night}>
                <p className={styles.red}>Noche 1</p>
                <p>12 de abril de 2026</p>
                <p>19.00 hs</p>
            </div>
            <div className={styles.night}>
                <p className={styles.red}>Noche 2</p>
                <p>13 de abril de 2026</p>
                <p>18.00 hs</p>
            </div>
        </div>
        <LinksList />
        <Footer />
    </MainWrapper>      
  );
}