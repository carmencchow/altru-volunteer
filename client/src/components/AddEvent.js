import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import "./AddEvent.css";

const AddEvent = ({ openInput, closeInput }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [help, setHelp] = useState("");
  const [numVolunteers, setNumVolunteers] = useState(0);
  const [description, setDescription] = useState("");

  const { setMongoUser, user } = useContext(AuthContext);

  const saveEvent = async () => {
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      const res = await api.post(
        `/ngo/:id/event`,
        {
          name: `${name}`,
          date: `${date}`,
          time: `${time}`,
          description: `${description}`,
          help: `${help}`,
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
    } catch (err) {
      console.log(err);
    }
  };

  if (!openInput) return null;

  return (
    <div>
      <form className="event-form" onSubmit={saveEvent}>
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

        <button className="save-btn" onClick={saveEvent}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
