/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

export default function Carousels() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplayspeed: 3500,
    adaptiveHeight: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplayspeed: 3500,
          adaptiveHeight: true,
          pauseOnHover: false,
        },
      },
    ],
  };

  const [imageCarousel, setImageCarousel] = useState([]);
  const getImage = async () => {
    try {
      const data = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}pictures?categories=carousel`)
        .then((response) => response.data);
      setImageCarousel(data);
      // console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("Can't fetch pictures");
      }
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="carouselDiv">
      <h2 className="carouseltitle">
        UN MOMENT DE DÉTENTE
        <span className="spanLine" />
      </h2>
      <Slider {...settings}>
        {imageCarousel.map((image) => (
          <div key={image.id} className="carousel">
            <div className="card">
              <img
                className="imgCarousel"
                src={`${import.meta.env.VITE_IMAGES_URL}${image.file}`}
                alt="a"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
