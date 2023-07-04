import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import "./EditEvent.css";

const EditEvent = ({
  name,
  date,
  time,
  location,
  description,
  help,
  numVolunteers,
  setIsEditingEvent,
}) => {
  const { setMongoUser, user } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newHelp, setNewHelp] = useState("");
  const [newNumVolunteers, setNewNumVolunteers] = useState(0);
  const [newDescription, setNewDescription] = useState("");

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      const res = await api.post(
        `/ngo/:id/event`,
        {
          name: `${newName}`,
          date: `${newDate}`,
          time: `${newTime}`,
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
      const data = res.data;
      console.log("Data is:", data);
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
          type="text"
          className="event-date"
          value={newDate}
          placeholder={date ? date : "Date of event"}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="text"
          className="event-time"
          value={newTime}
          placeholder={time ? time : "Time of event"}
          onChange={(e) => setNewTime(e.target.value)}
        />
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
