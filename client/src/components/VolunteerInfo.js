import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./VolunteerInfo.css";

const VolunteerInfo = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="events-container">
      <h2>Events</h2>
      <div className="events">
        {mongoUser.attending &&
          mongoUser.attending.map((attend, idx) => (
            <div className="list" key={idx}>
              <div className="place">
                {attend.event_description} with {attend.name}
              </div>
              <div className="date">
                {attend.event_date} from {attend.event_time}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VolunteerInfo;
