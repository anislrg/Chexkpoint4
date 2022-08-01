import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import "../../styles/components/methode.scss";
import { Button } from "@mui/material";

export default function TextMethodeSecond() {
  const [textMethode, setTextMethode] = useState([]);
  const [showMore, setShowMore] = useState(false);
  // const mobile = window.screen.width <= 700;

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}text?page=methode&textSection=2`
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
    <section>
      {textMethode.map((text) => (
        <section key={text.id}>
          <div className="text-container">
            {showMore ? (
              <p className="bodySec">{parse(text.body)}</p>
            ) : (
              `${text.body.substring(0, 250)}...`
            )}
            <Button
              variant="outlined"
              id="buttondisabled"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Voir moins" : "Voir plus"}
            </Button>
          </div>
          <div className="text-container2">
            {showMore ? (
              <p className="bodySec">{parse(text.body)}</p>
            ) : (
              `${text.body.substring(0)}...`
            )}
            <Button
              variant="outlined"
              id="buttondisabled"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Voir moins" : "Voir plus"}
            </Button>
          </div>
        </section>
      ))}
    </section>
  );
}
