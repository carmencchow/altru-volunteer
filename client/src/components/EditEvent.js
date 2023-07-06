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
  setIsEditing,
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
      await api.put(
        `/user/${user.uid}/event`,
        {
          name: `${newName}` || `${name}`,
          date: `${newDate}` || `${date}`,
          startTime: `${newStartTime}` || `${startTime}`,
          endTime: `${newEndTime}` || `${endTime}`,
          location: `${newLocation}` || `${location}`,
          description: `${newDescription}` || `${description}`,
          help: `${newHelp}` || `${help}`,
          numVolunteers: `${newNumVolunteers}` || `${numVolunteers}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserData(user.uid, setMongoUser, token);
      setIsEditing(false);
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
          value={newName ? newName : name}
          placeholder={name ? name : "Name of event"}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="date"
          className="event-date"
          min="2023-01-01"
          max="2024-12-31"
          value={newDate ? newDate : date}
          placeholder={date ? date : "Date of event"}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <div className="row">
          <input
            type="time"
            className="event-time"
            min="08:00"
            max="22:00"
            value={newStartTime ? newStartTime : startTime}
            placeholder={startTime ? startTime : "Start time"}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
          <input
            type="time"
            className="event-time"
            min="08:00"
            max="22:00"
            value={newEndTime ? newEndTime : endTime}
            placeholder={endTime ? endTime : "End time"}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="event-location"
          value={newLocation ? newLocation : location}
          placeholder={location ? location : "Location of event"}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <input
          type="text"
          className="desc"
          value={newDescription ? newDescription : description}
          placeholder={description ? description : "Description of event"}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="text"
          className="help"
          value={newHelp ? newHelp : help}
          placeholder={help ? help : "What kind of help do you need?"}
          onChange={(e) => setNewHelp(e.target.value)}
        />
        <p className="numVol">Number of volunteers:</p>
        <input
          type="number"
          className="numVolunteer"
          placeholder={numVolunteers ? numVolunteers : "0"}
          value={newNumVolunteers ? newNumVolunteers : numVolunteers}
          onChange={(e) => setNewNumVolunteers(e.target.value)}
        />
        <div className="buttons">
          <button className="save-event" onClick={updateEvent}>
            Save Changes
          </button>
          <button className="cancel-event" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditEvent;
