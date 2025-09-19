import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import ImageWithText from "@/src/components/builder/ImageWithText/ImageWithText";
import LinksList from "@/src/components/builder/LinksList/LinksList";
import Heading from "../../components/structure/Heading/Heading";
import Footer from "../../components/structure/Footer/Footer";

export default function Page() {

  const dataSubastasOnline = [{nombre: "Libros"},{nombre: "Pintura argentina"}];

  const dataImageWithText = {
    paragraphs: "<p>Conocé nuestra exclusiva plataforma de subastas automáticas.</p><p>Periódicamente encontrarás una cuidada selección de arte, muebles, joyas y mucho más.</p><p>Ofertá por piezas únicas desde cualquier dispositivo, de forma simple y segura.</p>",
    images: [{url: 'assets/images/subastas_online_img_demo_1.jpg', alt: 'Descripción de la imagen'}, {url: 'assets/images/subastas_online_img_demo_2.jpg', alt: 'Descripción de la imagen'}, {url: 'assets/images/subastas_online_img_demo_3.jpg', alt: 'Descripción de la imagen'}, {url: 'assets/images/subastas_online_img_demo_4.jpg', alt: 'Descripción de la imagen'}]
  }

  return (
    <MainWrapper>  
        <Heading data={{heading: 'Subastas virtuales'}} />
        <ImageWithText data={dataImageWithText} />
        <LinksList links={dataSubastasOnline}/>
        <Footer />
    </MainWrapper>      
  );
}