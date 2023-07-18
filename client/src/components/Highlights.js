import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { api } from "../utils/axios";

const Highlights = ({ setIsShowing }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

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
        <span className="hide-btn">
          <AiOutlineCloseCircle onClick={() => setIsShowing(false)} />
        </span>
        <p className="highlights-heading">🌎 Highlights</p>

        <p className="subtext">View our recently added events ... </p>
        {events && events.length > 0 && (
          <div>
            {events.map((event, idx) => (
              <div
                key={idx}
                className="event-item"
                onClick={() => navigate(`/event/${event._id}`)}
              >
                <p className="event-name">{event.name}</p>
                <p className="event-ngo">{event.ngo.name}</p>
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
