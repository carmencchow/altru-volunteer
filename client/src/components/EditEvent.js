import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import "./EditEvent.css";

const EditEvent = ({
  name,
  date,
  startTime,
  endTime,
  location,
  description,
  help,
  numVolunteers,
  setIsEditingEvent,
}) => {
  const { setMongoUser, user } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newHelp, setNewHelp] = useState("");
  const [newNumVolunteers, setNewNumVolunteers] = useState(0);
  const [newDescription, setNewDescription] = useState("");

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      await api.put(
        `/user/${user.uid}/edit-event`,
        {
          name: `${newName}`,
          date: `${newDate}`,
          startTime: `${newStartTime}`,
          endTime: `${newEndTime}`,
          location: `${newLocation}`,
          description: `${newDescription}`,
          help: `${newHelp}`,
          numVolunteers: `${newNumVolunteers}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserData(user.uid, setMongoUser, token);
      setIsEditingEvent(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="event-form">
        <input
          type="text"
          className="name"
          value={newName}
          placeholder={name ? name : "Name of event"}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="date"
          className="event-date"
          min="2023-07-01"
          max="2024-12-31"
          value={newDate}
          placeholder={date ? date : "Date of event"}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <div className="row">
          <input
            type="time"
            className="event-time"
            min="08:00"
            max="22:00"
            value={newStartTime}
            placeholder={startTime ? startTime : "Start time"}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
          <input
            type="time"
            className="event-time"
            min="08:00"
            max="22:00"
            value={newEndTime}
            placeholder={endTime ? endTime : "End time"}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="event-location"
          value={newLocation}
          placeholder={location ? location : "Location of event"}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <input
          type="text"
          className="desc"
          value={newDescription}
          placeholder={description ? description : "Description of event"}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="text"
          className="help"
          value={newHelp}
          placeholder={help ? help : "What kind of help do you need?"}
          onChange={(e) => setNewHelp(e.target.value)}
        />
        <p className="numVol">Number of volunteers:</p>
        <input
          type="number"
          className="numVolunteer"
          placeholder={numVolunteers ? numVolunteers : "0"}
          value={newNumVolunteers}
          onChange={(e) => setNewNumVolunteers(e.target.value)}
        />
        <div className="buttons">
          <button className="save-event" onClick={updateEvent}>
            Save Changes
          </button>
          <button
            className="cancel-event"
            onClick={() => setIsEditingEvent(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditEvent;
