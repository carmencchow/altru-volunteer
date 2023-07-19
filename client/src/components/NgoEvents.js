import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { api } from "../utils/axios";
import EditEvent from "../pages/EditEvent";
import "./NgoEvents.css";

const NgoEvents = () => {
  const { verifyUser, user, mongoUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [numVolunteers, setNumVolunteers] = useState(0);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duties, setDuties] = useState("");
  const [description, setDescription] = useState("");
  const [serverError, setServerError] = useState("");
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();

  const fetchNgoEvents = async (ngoId) => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngo/${ngoId}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServerError("");
      setEvents(res.data);
      console.log("Events:", res.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api.post(
        `/ngo/${mongoUser.organization._id}/event`,
        {
          name: `${name}`,
          date: `${date}`,
          startTime: `${startTime}`,
          endTime: `${endTime}`,
          location: `${location}`,
          description: `${description}`,
          duties: `${duties}`,
          numVolunteers: `${numVolunteers}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServerError("");
      await verifyUser(user);
      setIsAddingEvent(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (mongoUser.organization) {
      fetchNgoEvents(mongoUser.organization._id);
    }
  }, [mongoUser.organization]);

  return (
    <div>
      <h2 className="tab-heading">📅 Scheduled Events</h2>
      <div className="event-profile">
        <div className="side">
          {events && (
            <div>
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="event-card"
                  onClick={() => {
                    navigate(`/edit/${event._id}`);
                  }}
                >
                  <p className="event-name">⭐ {event.name}</p>
                  <p className="event-name">📅 {event.date}</p>
                  <p className="event-location">📍 {event.location} </p>
                  <div className="icon-row">
                    <p className="view">
                      <AiOutlineEye size={26} />
                    </p>
                    <p className="edit">
                      <AiOutlineEdit size={26} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setIsAddingEvent(true)} className="create-btn">
            Create an event
          </button>
        </div>

        <div className="right-side">
          {isAddingEvent ? (
            <form className="event-form">
              <input
                type="text"
                className="name"
                value={name}
                placeholder="Event name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="date"
                className="event-date"
                min="2023-07-01"
                max="2024-12-31"
                value={date}
                placeholder="Event date"
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="row">
                <input
                  type="time"
                  className="event-time"
                  value={startTime}
                  min="2023-01-01"
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
                placeholder="Event description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="duties"
                value={duties}
                placeholder="What kind of volunteer duties do you need on the day of your event?"
                onChange={(e) => setDuties(e.target.value)}
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
                duties,
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

export default NgoEvents;
