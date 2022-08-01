import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/methode.scss";

export default function ImageMethodeThird() {
  const [imageMethode, setImageMethode] = useState([]);

  const getImage = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }pictures?categories=methode&picSection=3`
        )
        .then((response) => response.data);
      setImageMethode(data);
      // console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("Picture doesn't exists");
      }
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div>
      {imageMethode.map((image) => (
        <div key={image.id}>
          <img
            className="imageMethodeThird"
            src={`${import.meta.env.VITE_IMAGES_URL}${image.file}`}
            alt={image.alt}
          />
        </div>
      ))}
    </div>
  );
}
