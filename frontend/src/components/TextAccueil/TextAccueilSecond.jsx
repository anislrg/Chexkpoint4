import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import useModal from "@services/useModal";
import Modal from "@components/Modal";
import vegetables from "@assets/pictures/IMG_0349.png";

export default function TextAccueilSecond() {
  const [textHome, setTextHome] = useState([]);
  const { isShowing, toggle } = useModal();

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}text?page=home&textSection=2`)
        .then((response) => response.data);
      setTextHome(data);
      // console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("text doesn't exists");
      }
    }
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div className="textHome2">
      <img className="boxGlass" src={vegetables} alt="jardin" />
      {textHome.map((text) => (
        <div className="body2" key={text.id}>
          <p key={text.id}>{parse(text.body)}</p>
          <button type="button" className="buttonPanier" onClick={toggle}>
            <p>Plus de détails</p>
          </button>
          <div className="modal-container">
            <Modal
              isShowing={isShowing}
              hide={toggle}
              key={text.id}
              title={text.title}
              body={parse(text.body)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
