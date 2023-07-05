import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NgosContext } from "../context/NgosContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import "./OrganizationEvents.css";
import EditEvent from "./EditEvent";

const OrganizationEvents = () => {
  const { mongoUser, setMongoUser, user } = useContext(AuthContext);
  const [event, setEvent] = useState({});
  const [isEditingEvent, setIsEditingEvent] = useState(false);
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

  const handleCreateEvent = () => {
    setIsAddingEvent(true);
  };

  const handleEditEvent = () => {
    setIsEditingEvent(true);
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      const res = await api.post(
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
      setEvent(res.data);
      console.log(res.data);
      console.log("event is", event);
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
          {event ? (
            <div>
              <p>Name: {event.name}</p>
              <p>Date: {event.date}</p>
              <p>
                Time: {event.startTime} - {event.endTime}
              </p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
              <p>Help needed: {event.help}</p>
              <p>Numbers needed: {event.numVolunteers} </p>
              <button onClick={handleEditEvent} className="edit-btn">
                Edit Event
              </button>
            </div>
          ) : (
            <>
              <p>Add an event to our database:</p>
              <button onClick={handleCreateEvent} className="edit-btn">
                Add Event
              </button>
            </>
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
              <button className="create-btn" onClick={createEvent}>
                Create Event
              </button>
            </form>
          ) : null}

          {isEditingEvent && (
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
