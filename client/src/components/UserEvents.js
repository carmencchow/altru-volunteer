import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./UserEvents.css";

const UserEvents = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="events-container">
      {/* <h2>Events</h2> */}
      <div className="events">
        {mongoUser.events &&
          mongoUser.events.map((event, idx) => (
            <div className="list" key={idx}>
              <div className="place">
                <p>Event: {event.name}</p>
                <p>NGO: {event.ngo.name}</p>
                <div className="date">
                  <p>
                    Location: <span>{event.location}</span>
                  </p>
                  <p>
                    Date: <span>{event.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserEvents;
