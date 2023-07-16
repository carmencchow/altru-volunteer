import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Highlights = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Fetch most recently added events from server
  const fetchRecentEvents = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/event/recent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data.events);
      console.log("Results:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecentEvents();
  }, []);

  return (
    <div className="highlights">
      <div>
        🌎 Highlights
        <p className="subtext">View the most recently created Events ... </p>
        {events && events.length > 0 && (
          <div>
            {events.map((event, idx) => (
              <div
                key={idx}
                className="event-item"
                onClick={() => navigate(`/event/${event._id}`)}
              >
                <p>{event.name}</p>
                <p>{event.ngo.name}</p>
                <p className="date">
                  Added on: {String(event.dateAdded).slice(0, 10)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Highlights;
