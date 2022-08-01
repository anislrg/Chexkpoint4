import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import "../../styles/components/methode.scss";

export default function TextMethodeThird() {
  const [textMethode, setTextMethode] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}text?page=methode&textSection=3`
        )
        .then((response) => response.data);
      setTextMethode(data);
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
    <div>
      {textMethode.map((text) => (
        <div key={text.id}>
          <p className="bodyThird">{parse(text.body)}</p>
        </div>
      ))}
    </div>
  );
}
