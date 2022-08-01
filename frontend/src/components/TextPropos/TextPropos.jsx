import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

export default function TextPropos() {
  const [textPropos, setTextPropos] = useState([]);
  // console.log(textPropos);

  const getText = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}pictures`)
        .then((response) => response.data);
      setTextPropos(data.filter((pic) => pic.categories === "propos"));
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
    <div className="team-main">
      <h2 className="teamtitle">Notre Equipe</h2>
      <span className="spanLine" />
      {textPropos.map((text) => (
        <div className="team-container" key={text.id}>
          <img
            className="team-image"
            src={`${import.meta.env.VITE_IMAGES_URL}${text.file}`}
            alt={text.alt}
          />
          <p className="team-body">{parse(text.text)}</p>
        </div>
      ))}
    </div>
  );
}
