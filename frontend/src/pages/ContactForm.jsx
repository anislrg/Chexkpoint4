/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
import React from "react";
import "@components/ContactForm.css";
import MenuBurger from "@components/MenuBurger";
import Preorder from "@components/Preorder";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
// import logo3 from "@assets/pictures/logo3.png";

function Contact() {
  return (
    <div>
      <Navbar />
      <MenuBurger />
      <h1 className="titre-contact">Nous contacter</h1>
      <hr className="hr-contact"></hr>
      <div className="wrapper">
        <div className="form-contact">
          <form name="contact" method="post" className="contact_form">
            {/* <img
              className="logo-maraicheur"
              src="./src/assets/pictures/logo2.png"
            /> */}
            {/* <div className="logo-mobile">
              <img className="logo-maraicheur2" src={logo3} />
            </div> */}
            <h3 className="info-contact">Informations personnelles : </h3>
            <div className="name-contact">
              <label className="contact-label">
                Prénom*{" "}
                <input className="nom-prenom" type="text" name="prénom" />
              </label>

              <label className="contact-label">
                Nom* <input className="nom-prenom" type="text" name="nom" />
              </label>
            </div>
            <label className="email-label">
              Email* <input className="email" type="email" name="email" />
            </label>

            <label className="message-contact">
              Message* <textarea rows="10" cols="50"></textarea>
            </label>
            <div className="container-button-contact">
              <button className="button-contact" type="submit">
                Soumettre
              </button>
            </div>
          </form>
        </div>
        <div className="img-contact">
          {/* <img
            className="image-contact"
            src="./src/assets/pictures/Contact.jpeg"
            alt="image-antoine"
          ></img> */}
        </div>
      </div>
      <h1 className="titre-contact">Réserver un rendez-vous</h1>
      <hr className="hr-contact"></hr>
      <div className="container-preorder">
        <Preorder />
      </div>
      <div className="map-contact">
        {/* <iframe
          title="test"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10618.375323424!2d1.001514!3d48.29142945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e39707873d3e91%3A0xfdbfc22c3c91e249!2sLe%20Mara%C3%AEcheur!5e0!3m2!1sfr!2sfr!4v1657180505570!5m2!1sfr!2sfr"
          width="1000"
          height="650"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        /> */}
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
