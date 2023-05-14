import React, { createContext, useState } from "react";
import axios from "axios";

export const NgosContext = createContext();

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([]);
  const [ngo, setNgo] = useState({});
  const [ngoModal, setNgoModal] = useState({});
  const [ngoId, setNgoId] = useState("");

  const fetchNgo = async () => {
    try {
      const res = await axios.get(
        `https://altru-volunteer-be.onrender.com/api/ngos/${ngo._id}`
      );
      setNgo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNgoModal = async () => {
    try {
      const res = await axios.get(
        `https://altru-volunteer-be.onrender.com/api/ngos/${ngoModal._id}`
      );
      setNgoModal(res.data);
      console.log("ngoModal results:", res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NgosContext.Provider
      value={{
        fetchNgo,
        fetchNgoModal,
        ngo,
        setNgo,
        ngos,
        setNgos,
        ngoId,
        setNgoId,
      }}
    >
      {children}
    </NgosContext.Provider>
  );
};
