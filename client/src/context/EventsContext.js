import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../utils/axios";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const { user, verifyUser } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  const fetchEvent = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvent(res.data);
      await verifyUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        event,
        setEvent,
        fetchEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
