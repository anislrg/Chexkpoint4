import axios from "@services/axios";
import React, { useEffect, useState } from "react";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import SuccesPreorder from "./SuccesPreorder";

export default function ClientList() {
  const [clientList, setClientList] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dates, setDates] = useState("");
  const [invalidDates, setInvalideDates] = useState([]);

  const [succes, setSucces] = useState(false);

  const postClient = async () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}preorder`, {
      lastname,
      firstname,
      email,
      dates,
    });
    setSucces(true);
  };
  const getDates = async () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}preorder/dates`)
      .then((res) => setInvalideDates(res.data));
  };

  useEffect(() => {
    getDates();
  }, []);
  const myLabels = React.useMemo(() => {
    return [
      {
        start: "2022-08-01",
        textColor: "#e1528f",
        title: "1 SPOTS",
      },
    ];
  }, []);
  return (
    <section className="container-preorder-form">
      {succes ? <SuccesPreorder /> : ""}
      <form className="mep" onSubmit={setClientList}>
        <label htmlFor="firstname">
          Prénom *
          <input
            type="text"
            placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          Nom *
          <input
            type="text"
            placeholder="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Numéro téléphone
          <input
            type="text"
            placeholder="00.00.00.00.00"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="dates">
          Selectioné une date
          <Datepicker
            controls={["calendar", "timegrid"]}
            min="2022-08-01T00:00"
            max="2029-02-01T00:00"
            minTime="08:00"
            maxTime="19:59"
            stepMinute={60}
            labels={myLabels}
            invalid={invalidDates}
            onChange={(e) => setDates(e.value)}
            value={dates}
            returnFormat="iso8601"
          />
        </label>
        <button type="button" onClick={() => postClient(clientList)}>
          Réserver
        </button>
      </form>
    </section>
  );
}
