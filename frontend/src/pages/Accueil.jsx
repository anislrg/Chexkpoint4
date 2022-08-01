/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-unresolved */
import TextAccueil from "@components/TextAccueil/TextAccueil";
import TextAccueilSecond from "@components/TextAccueil/TextAccueilSecond";
import Carousels from "@components/Carousels";
import MenuBurger from "@components/MenuBurger";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function Accueil() {
  return (
    <>
      <Navbar />
      <MenuBurger />
      <Carousels />
      <TextAccueil />
      <h2 className="panierTitle">
        UNE SÉANCE
        <span className="spanLine" />
      </h2>
      <TextAccueilSecond />
      <Footer />
    </>
  );
}
