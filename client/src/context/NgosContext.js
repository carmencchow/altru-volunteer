import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "./AuthContext";

export const NgosContext = createContext();

export const NgosProvider = ({ children }) => {
  const [ngo, setNgo] = useState(null);
  const [ngos, setNgos] = useState([]);
  const [ngoId, setNgoId] = useState("");
  const { user } = useContext(AuthContext);

  // Fetch an Ngo
  const getNgo = async (req, res) => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngo/${ngo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNgo(res.data);
      console.log("data", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user === null) {
      setNgos([]);
    }
  }, [user]);

  return (
    <NgosContext.Provider
      value={{
        getNgo,
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
