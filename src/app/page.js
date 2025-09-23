import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import Hero from "../components/builder/Hero/Hero";
//import LinksList from "../components/builder/LinksList/LinksList";
import Footer from "../components/structure/Footer/Footer";

export default function Home() {

  const dataSubastasOnline = [{nombre: "Libros"},{nombre: "Pintura argentina"}];
  const dataVentaDirecta = [{nombre: "Cuadros"}];

  return (
    <MainWrapper>      
      <Hero />
      {
      //<LinksList title={{value : "SUBASTAS ONLINE"}} links={dataSubastasOnline}/>
      //<LinksList title={{value : "VENTA DIRECTA"}} links={dataVentaDirecta}/>
      }
      <Footer />
    </MainWrapper>      
  );
}
