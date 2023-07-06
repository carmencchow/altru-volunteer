import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { api } from "../utils/axios";
import "./OrganizationEvents.css";
import EditEvent from "./EditEvent";

const OrganizationEvents = () => {
  const { mongoUser, setMongoUser, user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [help, setHelp] = useState("");
  const [location, setLocation] = useState("");
  const [numVolunteers, setNumVolunteers] = useState(0);
  const [description, setDescription] = useState("");
  const [serverError, setServerError] = useState("");

  const handleAddEvent = () => {
    setIsAddingEvent(true);
  };

  const handleEditEvent = () => {
    setIsEditing(true);
  };

  const handleDeleteEvent = async () => {
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      await api.delete(`/user/${user.uid}/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServerError("");
      await fetchUserData(user.uid, setMongoUser, token);
      setIsAddingEvent(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      await api.post(
        `/user/${user.uid}/event`,
        {
          name: `${name}`,
          date: `${date}`,
          startTime: `${startTime}`,
          endTime: `${endTime}`,
          location: `${location}`,
          description: `${description}`,
          help: `${help}`,
          numVolunteers: `${numVolunteers}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServerError("");
      await fetchUserData(user.uid, setMongoUser, token);
      setIsAddingEvent(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="event-profile">
        <div className="left-side">
          {mongoUser.oneDayEvents && (
            <div>
              <h4>Scheduled events</h4>

              {mongoUser.oneDayEvents.map((event, idx) => (
                <div key={idx} className="event-card">
                  <p>{event.name}</p>
                  <p> {event.location} </p>
                  <p>{event.date} </p>
                  <p>
                    {event.startTime}-{event.endTime}
                  </p>

                  {/* Show volunteers */}
                  {mongoUser.oneDayEvents.volunteers && (
                    <div>
                      <h4>Volunteers attending</h4>
                      <p>
                        Volunteers needed: {mongoUser.oneDayEvent.numVolunteers}
                      </p>
                      {mongoUser.oneDayEvents.volunteers.map(
                        (volunteer, idx) => (
                          <div key={idx} className="volunteers">
                            {volunteer.name}
                            <p>{volunteer.email}</p>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div className="edit-row">
                    <button onClick={handleEditEvent} className="react-btn">
                      <FiEdit2 />
                    </button>
                    <button onClick={handleDeleteEvent} className="react-btn">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setIsAddingEvent(true)} className="create-btn">
            Create Event
          </button>
        </div>

        <div className="right-side">
          {isAddingEvent ? (
            <form className="event-form">
              <input
                type="text"
                className="name"
                value={name}
                placeholder="Name of event"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="date"
                className="event-date"
                min="2023-07-01"
                max="2024-12-31"
                value={date}
                placeholder="Date of event"
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="row">
                <input
                  type="time"
                  className="event-time"
                  value={startTime}
                  min="2023-07-01"
                  max="2024-12-31"
                  placeholder="Event time"
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                  type="time"
                  min="2023-07-01"
                  max="2024-12-31"
                  className="event-time"
                  value={endTime}
                  placeholder="Event time"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              <input
                type="text"
                className="event-location"
                value={location}
                placeholder="Event location"
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                className="desc"
                value={description}
                placeholder="Description of event"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="help"
                value={help}
                placeholder="What kind of help do you need?"
                onChange={(e) => setHelp(e.target.value)}
              />
              <p className="numVol">Number of volunteers:</p>
              <input
                type="number"
                className="numVolunteer"
                value={numVolunteers}
                onChange={(e) => setNumVolunteers(e.target.value)}
              />
              {serverError && <p className="server-error">{serverError}</p>}
              <div className="buttons">
                <button className="save-ngo" onClick={createEvent}>
                  Save Changes
                </button>
                <button
                  className="save-ngo"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}

          {isEditing && (
            <EditEvent
              {...{
                name,
                date,
                startTime,
                endTime,
                location,
                description,
                help,
                numVolunteers,
                setIsEditing,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationEvents;
