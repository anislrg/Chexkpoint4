import axios from "@services/axios";
import { useState } from "react";
import SuccesPreorder from "./SuccesPreorder";
// import WarningPreorder from "./WarningPreorder";

export default function ClientList() {
  const [clientList, setClientList] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dates, setDates] = useState("");

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
        <div>
          <p>Date :</p>
          <input
            type="date"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => postClient(clientList)}>
          Réserver
        </button>
      </form>
    </section>
  );
}
