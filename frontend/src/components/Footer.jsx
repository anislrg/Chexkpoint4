export default function Footer() {
  return (
    <div className="footerGeneral">
      <div className="footerImg">
        {/* <a
          href="https://www.facebook.com/lemaraicheur"
          target="_blank"
          rel="noreferrer"
          className="footerLink"
        > */}
        <img
          className="socials"
          src="src/assets/pictures/social-network.png"
          alt="Facebook icon"
        />
        {/* </a> */}
        {/* <a
          href="https://www.instagram.com/lemaraicheur/"
          target="_blank"
          rel="noreferrer"
          className="footerLink"
        > */}
        <img
          className="socials"
          src="src/assets/pictures/instagram.png"
          alt="instagram icon"
        />
        {/* </a> */}
      </div>
      <h3 className="footerTitle">Marie-Laure Rousseau, Reflexologue</h3>

      <p className="footerAddress">Nogent-le-Rotrou, 28400</p>

      <span className="footerUnderline" />
      <p className="footerDroits"> © 2022, TOUTS DROITS RÉSERVÉS</p>
    </div>
  );
}
