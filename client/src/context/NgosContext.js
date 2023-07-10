import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../utils/axios";
import { AuthContext } from "./AuthContext";

export const NgosContext = createContext();

export const NgosProvider = ({ children }) => {
  const [ngo, setNgo] = useState(null); // newly created Ngo
  const [ngos, setNgos] = useState([]);
  const [ngoModal, setNgoModal] = useState({});
  const [ngoId, setNgoId] = useState("");
  const { user } = useContext(AuthContext);

  // // Fetch an Ngo
  // const getUsersNgo = async (req, res) => {
  //   try {
  //     const token = await user.getIdToken();
  //     const res = await api.get(`/ngo/${ngo._id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setNgo(res.data);
  //     console.log("data", res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getNgo = async (ngo) => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngo/${ngo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the ngo in the `ngos` array:
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
      const res = await api.get(`/ngo/${ngoModal._id}`, {
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

  useEffect(() => {
    if (user === null) {
      setNgos([]);
    }
  }, [user]);

  return (
    <NgosContext.Provider
      value={{
        getNgo,
        fetchNgoModal,
        ngo,
        setNgo,
        ngos,
        setNgos,
        // getUsersNgo
        ngoId,
        setNgoId,
      }}
    >
      {children}
    </NgosContext.Provider>
  );
};
