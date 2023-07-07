import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./UserVolunteers.css";

const UserVolunteers = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="events-container">
      <h2>Events</h2>
      <div className="events">
        {mongoUser.attending &&
          mongoUser.attending.map((event, idx) => (
            <div className="list" key={idx}>
              <div className="place">
                <p>{event.name}</p>
                <div className="date">
                  <p>
                    Location: <span>{event.location}</span>
                  </p>{" "}
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

export default UserVolunteers;
