import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EventsContext } from "../context/EventsContext";
import Navbar from "../components/Navbar";

const Event = () => {
  const { fetchEvent } = useContext(EventsContext);
  const { id } = useParams();
  const [event] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <div>
      <Navbar />
      <span className="back" onClick={() => navigate(-1)}>
        Back
      </span>

      <h1>Event</h1>

      <div className="event-wrapper">
        {event && (
          <div className="display-card">
            <h4>Name:{event.name}</h4>
            <h4>Id:{event._id}</h4>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.duties}</p>
            <p>
              {event.startTime}-{event.endTime}pm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
