/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import InformationLoginAlert from "@components/InformationLoginAlert";
import WarningAlert from "@components/WarningAlert";
import SuccesEmailAlert from "@components/SuccesEmailAlert";
import logo from "../assets/pictures/logo1.png";
import eyesHidden from "../assets/pictures/invisible.png";
import eyesUnhidden from "../assets/pictures/yeux.png";
// import "../styles/adminlogin.scss";
import axios from "../services/axios";

// eslint-disable-next-line react/prop-types
export default function AdminLogin({ setAdm }) {
  // const { dispatch } = userContext();
  const navigate = useNavigate();
  const [eyesVisible, setEyesVisible] = useState(eyesHidden);
  const [eyesStyle, setEyesStyle] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [succes, setSucces] = useState(false);

  const [admData, setAdmData] = useState({
    email: "",
    password: "",
  });
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setEyesStyle(!eyesStyle);

    if (eyesVisible === eyesHidden) {
      setEyesVisible(eyesUnhidden);
    } else if (eyesVisible === eyesUnhidden) {
      setEyesVisible(eyesHidden);
    }
  };
  const handleInputChange = (e) => {
    setAdmData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admData.email || !admData.password) {
      setInfo(true);
    }

    try {
      const { data } = await axios.post("adm/login", admData, {
        withCredentials: true,
      });
      // console.log(data);
      setAdmData({ email: "", password: "" });
      setAdm({ email: data.email });
      navigate("/admin/log");
      // dispatch({ type: "LOGIN", payload: data });
    } catch (err) {
      // eslint-disable-next-line
      return alert(err.message);
    }
  };

  const handlePasswordForgotten = async () => {
    if (admData.email) {
      try {
        const { data } = await axios.post(
          "adm/password-forgotten",
          {
            email: admData.email,
          },
          { withCredentials: true }
        );
        // eslint-disable-next-line
        setSucces(true);
        const timer = setTimeout(() => {
          return navigate("/reset");
        }, 9000);
      } catch (err) {
        // eslint-disable-next-line
        return alert(err.message);
      }
    }
    return setWarning(true);
  };

  return (
    <section className="background">
      {info ? <InformationLoginAlert /> : ""}
      {warning ? <WarningAlert /> : ""}
      {succes ? <SuccesEmailAlert /> : ""}
      <div className="container">
        <div className="logo-position">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo du Maraîcheur"
              className="logo-property"
            />
          </NavLink>
        </div>
        <div className="introduction">
          <h1>Reflexologie - Administration</h1>
          <p>
            Bienvenue, veuillez saisir votre email administrateur ainsi que
            votre mot de passe pour vous connecter au panneau d’administration.
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:{" "}
            <input
              id="email"
              placeholder="monemail@gmail.com"
              type="email"
              value={admData.email}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password">
            Mot de passe *{" "}
            <p className="lostpassword" onClick={handlePasswordForgotten}>
              Mot de passe oublié ?
            </p>
            <input
              id="password"
              placeholder="Tapez ici votre mot de passe"
              type={passwordShown ? "text" : "password"}
              value={admData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePassword}
              className={eyesStyle ? "eyes-btn" : "eyes-btn-red"}
            >
              <img
                src={eyesVisible}
                alt="Oeil pour voir le mot de passe"
                className="eyesforpassword"
              />
            </button>
          </label>
          <button className="login-btn" type="submit">
            SE CONNECTER
          </button>
        </form>
      </div>
    </section>
  );
}
