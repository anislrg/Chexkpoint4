import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminHome from "@pages/AdminHome";
import AdminLogin from "@pages/AdminLogin";
import Accueil from "@pages/Accueil";
import Contact from "@pages/ContactForm";
import Methode from "@pages/Methode";
import "./App.css";

function App() {
  const [adm, setAdm] = useState({ email: "", id: null });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Accueil />} />
        <Route path="/methode" element={<Methode />} />
        <Route path="/contact" element={<Contact />} />
        <Route exact path="/admin" element={<AdminLogin setAdm={setAdm} />} />
        {adm.email && <Route path="/admin/log" element={<AdminHome />} />}
      </Routes>
    </div>
  );
}

export default App;
