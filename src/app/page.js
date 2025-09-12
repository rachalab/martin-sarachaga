import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import Hero from "../components/builder/Hero/Hero";
import LinksList from "../components/builder/LinksList/LinksList";
import Footer from "../components/structure/Footer/Footer";

export default function Home() {
  return (
    <MainWrapper>      
      <Hero />
      <LinksList />
      <Footer />
    </MainWrapper>      
  );
}
