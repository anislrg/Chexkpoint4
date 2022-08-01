import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

export default function TextProduits() {
  const [textProduit, setTextProduit] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}text?page=produit`)
        .then((response) => response.data);
      setTextProduit(data);
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
      {textProduit.map((text) => (
        <div key={text.id}>
          <h1 key="title1">{text.title}</h1>
          <p key="body1">{parse(text.body)}</p>
        </div>
      ))}
    </div>
  );
}
