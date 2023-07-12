import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { EventsContext } from "../context/EventsContext";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from "../components/Navbar";

import { api } from "../utils/axios";
import "./EditEvent.css";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = ({
  name,
  date,
  startTime,
  endTime,
  location,
  description,
  duties,
  numVolunteers,
}) => {
  const { user, verifyUser } = useContext(AuthContext);
  const { fetchEvent, event, setEvent } = useContext(EventsContext);
  const [isEditing, setIsEditing] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDuties, setNewDuties] = useState("");
  const [newNumVolunteers, setNewNumVolunteers] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api.put(
        `/event/${id}`,
        {
          // name: `${newName}` || `${name}`,
          // date: `${newDate}` || `${date}`,
          // startTime: `${newStartTime}` || `${startTime}`,
          // endTime: `${newEndTime}` || `${endTime}`,
          // location: `${newLocation}` || `${location}`,
          // description: `${newDescription}` || `${description}`,
          // duties: `${newDuties}` || `${duties}`,
          // numVolunteers: `${newNumVolunteers}` || `${numVolunteers}`,
          name: newName,
          date: newDate,
          startTime: newStartTime,
          endTime: newEndTime,
          location: newLocation,
          description: newDescription,
          duties: newDuties,
          numVolunteers: newNumVolunteers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await verifyUser(user);
      setIsEditing(false);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.delete(`/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvent(res.data);
      await verifyUser(user);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <>
      <Navbar />
      <div className="event-wrapper">
        {event && (
          <div className="display-card">
            <h4>{event.name}</h4>
            <p>{event.description}</p>
            <p>{event.duties}</p>
            <p>📍{event.location}</p>
            <p>
              {" "}
              🕒
              {event.startTime}-{event.endTime}pm
            </p>
            <p>{event.num_Volunteers}</p>

            <h4>Registered Volunteers</h4>
            <p>
              {event.volunteers && (
                <div>
                  {event.volunteers.map((volunteer) => (
                    <div className="volunteer">
                      Name:
                      {volunteer.firstname}
                      {volunteer.lastname}
                      <p>{volunteer.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </p>

            <button onClick={deleteEvent} className="delete-btn">
              Delete Event
              <AiOutlineDelete />
            </button>
          </div>
        )}

        {event && (
          <form className="event-form">
            <input
              type="text"
              className="name"
              value={newName ? newName : event.name}
              placeholder="Name of event"
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="date"
              className="event-date"
              min="2023-01-01"
              max="2024-12-31"
              value={name}
              // value={newDate ? newDate : event.date}
              // placeholder={event.date ? event.date : "Date of event"}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <div className="row">
              <input
                type="time"
                className="event-time"
                min="08:00"
                max="22:00"
                value={newStartTime ? newStartTime : event.startTime}
                placeholder={event.startTime ? event.startTime : "Start time"}
                onChange={(e) => setNewStartTime(e.target.value)}
              />
              <input
                type="time"
                className="event-time"
                min="08:00"
                max="22:00"
                value={newEndTime ? newEndTime : event.endTime}
                placeholder={event.endTime ? event.endTime : "End time"}
                onChange={(e) => setNewEndTime(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="event-location"
              value={newLocation ? newLocation : event.location}
              placeholder={
                event.location ? event.location : "Location of event"
              }
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <input
              type="text"
              className="desc"
              value={newDescription ? newDescription : event.description}
              placeholder={
                event.description ? event.description : "Description of event"
              }
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              type="text"
              className="duties"
              value={newDuties ? newDuties : event.duties}
              placeholder={
                event.duties ? event.duties : "How can volunteers help?"
              }
              onChange={(e) => setNewDuties(e.target.value)}
            />
            <p className="numVol">Number of volunteers:</p>
            <input
              type="number"
              className="numVolunteer"
              placeholder={event.numVolunteers ? event.numVolunteers : "0"}
              value={newNumVolunteers ? newNumVolunteers : event.numVolunteers}
              onChange={(e) => setNewNumVolunteers(e.target.value)}
            />
            <div className="buttons">
              <button className="save-event" onClick={updateEvent}>
                Save Changes
              </button>
              <button
                className="cancel-event"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditEvent;
