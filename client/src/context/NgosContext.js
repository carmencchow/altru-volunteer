import React, { createContext, useState, useContext } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "./AuthContext";

export const NgosContext = createContext();

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([]);
  const [ngoModal, setNgoModal] = useState({});
  const [ngoId, setNgoId] = useState("");
  const { user } = useContext(AuthContext);

  const getNgo = async (ngo) => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngos/${ngo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update with newest copy of ngo
      const updatedNgo = res.data;
      const arrayCopy = [...ngos];
      const idx = arrayCopy.findIndex((ngo) => ngo._id === updatedNgo._id);
      arrayCopy[idx] = updatedNgo;
      setNgos(arrayCopy);
      } catch (e) {
      console.log(e);
    }
  };

  const fetchNgoModal = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngos/${ngoModal._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNgoModal(res.data);
      console.log("ngoModal results:", res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NgosContext.Provider
      value={{
        getNgo,
        fetchNgoModal,
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
