import Link from 'next/link';
import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import HeaderNav from "../components/structure/HeaderNav/HeaderNav";
import Footer from "../components/structure/Footer/Footer";

export default function NotFound() {
  return (
    <MainWrapper>
      <HeaderNav />
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, no pudimos encontrar el recurso que estás buscando.</p>
      <Link href="/">Volver al inicio</Link>
      <Footer />      
    </MainWrapper>
  );
}