import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import "./OrganizationEvents.css";
import EditEvent from "./EditEvent";

const OrganizationEvents = () => {
  const { mongoUser, setMongoUser, user } = useContext(AuthContext);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [help, setHelp] = useState("");
  const [location, setLocation] = useState("");
  const [numVolunteers, setNumVolunteers] = useState(0);
  const [description, setDescription] = useState("");
  const [serverError, setServerError] = useState("");

  const handleAddEvent = () => {
    setIsAddingEvent(true);
  };

  const handleEditEvent = () => {
    setIsEditingEvent(true);
  };

  const saveEventChanges = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      const res = await api.post(
        `/ngo/:id/event`,
        {
          name: `${name}`,
          date: `${date}`,
          time: `${time}`,
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
          {mongoUser.organization.events && (
            <div>
              <p>name</p>
              <p>date</p>
              <p>time</p>
              <p>location</p>
              <p>description</p>
              <p>help</p>
              <p>Num volunteers</p>
            </div>
          )}
          {!mongoUser.organization.events ? (
            <button onClick={handleAddEvent} className="edit-btn">
              Add Event
            </button>
          ) : (
            <button onClick={handleEditEvent} className="edit-btn">
              Edit Event
            </button>
          )}
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
                type="text"
                className="event-date"
                value={date}
                placeholder="Date of event"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                className="event-time"
                value={time}
                placeholder="Event time"
                onChange={(e) => setTime(e.target.value)}
              />
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
              <button className="save-btn" onClick={saveEventChanges}>
                Save Event
              </button>
            </form>
          ) : null}

          {isEditingEvent && (
            <EditEvent
              {...{
                name,
                date,
                time,
                location,
                description,
                help,
                numVolunteers,
                setIsEditingEvent,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationEvents;
