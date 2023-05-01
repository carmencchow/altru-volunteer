import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./VolunteerInfo.css";

const VolunteerInfo = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="events-container">
      <h2>Events</h2>
      <div className="events">
        {user.attending.map((attend) => (
          <div className="list" key={attend._id}>
            <div className="place">
              {attend.event_description} at {attend.name}
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
