import React, { createContext, useState, useContext } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "./AuthContext";

export const NgosContext = createContext();

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([]);
  const [ngo, setNgo] = useState({});
  const [ngoModal, setNgoModal] = useState({});
  const [ngoId, setNgoId] = useState("");
  const { user } = useContext(AuthContext);

  const fetchNgo = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngos/${ngo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNgo(res.data);
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
