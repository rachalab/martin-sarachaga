import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
import Divider from "../../components/structure/Divider/Divider";
import ItemsGrid from "../../components/structure/ItemsGrid/ItemsGrid";
import Footer from "../../components/structure/Footer/Footer";
import styles from "./page.module.scss"; 

export default function Home() {
  return (
    <MainWrapper>  
        <Heading data={{heading: 'SUBASTA PRESENCIAL'}} />
        <Divider />
        <ItemsGrid />
        <Divider />
        <ItemsGrid />
        <Footer />
    </MainWrapper>      
  );
}