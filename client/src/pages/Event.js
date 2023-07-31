import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { EventsContext } from "../context/EventsContext";
import { BsArrowLeftSquare } from "react-icons/bs";
import Navbar from "../components/Navbar";
import InterestedBtn from "../components/InterestedBtn";
import "./Event.css";

const Event = () => {
  const { fetchEvent, event } = useContext(EventsContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <div>
       <a href="#event-btn" className="skip-link">Skip to Event</a>
      <Navbar />
      <span className="back" onClick={() => navigate(-1)}>
        <BsArrowLeftSquare />
      </span>

      <Toaster
        toastOptions={{
          style: { backgroundColor: "#b8e981", color: "white" },
        }}
      />
      <div className="heading-wrapper">
        {event && (
          <h2
            className="event-ngo-name"
            onClick={() => {
              navigate(`/ngo/${event.ngo._id}`);
              console.log(`navigate to ${event.ngo.name}`);
            }}
          >
            {" "}
            <span className="org">Organization:</span>⭐
            {event.ngo && event.ngo.name}
          </h2>
        )}
      </div>
      <div className="event-wrapper">
        {event && (
          <div className="display-card">
            <p className="event-name">Event: {event.name}</p>
            <p>{event.description}</p>
            <p>Help needed: {event.duties}</p>
            <p>📍 {event.location}</p>
            <p>
              {" "}
              🕒
              {event.startTime}-{event.endTime}pm
            </p>

            <InterestedBtn id="event-btn" event={event} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
