'use client';

import Link from 'next/link';
import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import HeaderNav from "../components/structure/HeaderNav/HeaderNav";
import Footer from "../components/structure/Footer/Footer";

export default function Error() {
  return (
    <MainWrapper>
      <HeaderNav />
      <p>Lo sentimos, ocurrió un error.</p>
      <Link href="/">Volver a la página de inicio</Link>
      <Footer />
    </MainWrapper>
  );
}