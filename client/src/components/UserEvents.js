import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./UserEvents.css";

const UserEvents = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="events-container">
      {/* <h2>Events</h2> */}
      <div className="events">
        {mongoUser.attending &&
          mongoUser.attending.map((event, idx) => (
            <div className="list" key={idx}>
              <div className="place">
                <p>Event: {event.oneDayEvents.name}</p>
                <div className="date">
                  <p>
                    Location: <span>{event.oneDayEvents.location}</span>
                  </p>
                  <p>
                    Date: <span>{event.oneDayEvents.date}</span>
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
