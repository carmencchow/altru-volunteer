import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventsContext } from "../context/EventsContext";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import Navbar from "../components/Navbar";
import "./Event.css";

const Event = () => {
  const { fetchEvent, event } = useContext(EventsContext);
  const { mongoUser, user } = useContext(AuthContext);
  const { id } = useParams();

  const registerEvent = async () => {
    try {
      const userId = mongoUser._id;
      const token = await user.getIdToken();
      const res = await api.put(
        `/event/${id}/register`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <div>
      <Navbar />
      {event && <h2>⭐ {event.name}</h2>}
      <div className="event-wrapper">
        {event && (
          <div className="display-card">
            <p className="event-ngo-name">{event.ngo.name}</p>
            <p>{event.description}</p>
            <p>Help needed: {event.duties}</p>
            <p>📍{event.location}</p>
            <p>
              {" "}
              🕒
              {event.startTime}-{event.endTime}pm
            </p>

            <div className="button-row">
              <button className="register" onClick={registerEvent}>
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
