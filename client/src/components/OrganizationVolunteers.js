import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./OrganizationVolunteers.css";
import AddEvent from "./AddEvent";

const OrganizationVolunteers = () => {
  const { mongoUser } = useContext(AuthContext);
  const [openInput, setOpenInput] = useState(false);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>

      {/* Display current events */}

      <div className="add-event">
        <AddEvent
          openInput={openInput}
          closeInput={() => {
            setOpenInput(false);
          }}
        />

        {!openInput ? (
          <div
            className="edit-amount"
            onClick={() => {
              setOpenInput(true);
            }}
          >
            <button className="edit">Add Event</button>
          </div>
        ) : (
          <div></div>
        )}

        <div className="events">
          <h2>Volunteers Attending</h2>
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
    </div>
  );
};

export default OrganizationVolunteers;
