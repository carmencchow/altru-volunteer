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
                {/* {event.parentNgo && <div>{event.parentNgo.name}</div>} */}

                {/* {event.parentNgo.name} */}
                <div className="date">
                  {event.location} {event.date}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserVolunteers;
