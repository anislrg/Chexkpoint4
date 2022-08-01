import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "../../styles/components/methode.scss";

export default function TextMethode() {
  const [textMethode, setTextMethode] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}text?page=methode&textSection=1`
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
          <p className="bodyMain">{parse(text.body)}</p>
        </div>
      ))}
    </div>
  );
}
