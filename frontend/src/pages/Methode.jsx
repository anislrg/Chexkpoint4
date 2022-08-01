/* eslint-disable import/no-unresolved */
import ImageMethode from "@components/ImageMethode/ImageMethode";
import MenuBurger from "@components/MenuBurger";
import Footer from "@components/Footer";
import TextMethode from "@components/TextMethode/TextMethode";
import TextMethodeSecond from "@components/TextMethode/TextMethodeSecond";
import ImageMethodeSecond from "@components/ImageMethode/ImageMethodeSecond";
import ImageMethodeThird from "@components/ImageMethode/ImageMethodeThird";
import ImageMethodeFourth from "@components/ImageMethode/ImageMethodeFourth";
import TextMethodeThird from "@components/TextMethode/TextMethodeThird";
import TextMethodeFourth from "@components/TextMethode/TextMethodeFourth";
import Navbar from "@components/Navbar";

export default function Methode() {
  return (
    <>
      <Navbar />
      <MenuBurger />
      <ImageMethode />
      <TextMethode />
      <div className="methodeGrid">
        <div className="gridimg2">
          <ImageMethodeSecond />
        </div>
        <div className="gridtext2">
          <TextMethodeSecond />
        </div>
        <div className="gridimg3">
          <ImageMethodeThird />
        </div>
        <div className="gridtext3">
          <TextMethodeThird />
        </div>
        <div className="gridimg4">
          <ImageMethodeFourth />
        </div>
        <div className="gridtext4">
          <TextMethodeFourth />
        </div>
      </div>
      <Footer />
    </>
  );
}
