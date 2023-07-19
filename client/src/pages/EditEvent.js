import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { EventsContext } from "../context/EventsContext";
import Navbar from "../components/Navbar";
import { api } from "../utils/axios";
import "./EditEvent.css";

const EditEvent = () => {
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

  const deleteEvent = async (e) => {
    e.preventDefault();
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
            <h4>⭐{event.name}</h4>
            <div className="event-details">
              <p>🗓️ {event.date}</p>
              <p>
                {" "}
                🕒
                {event.startTime}-{event.endTime}pm
              </p>
            </div>
            <p>{event.description}</p>
            <p>
              {event.num_volunteers} volunteers needed to help with the
              following:
            </p>
            <p>{event.duties}</p>
            <p>📍{event.location}</p>
            <p> Volunteers needed: {event.num_volunteers}</p>

            <h4 className="interested-volunteers">
              Interested Volunteers:{" "}
              {event.volunteers && event.volunteers.length}
            </h4>
            <p>
              {event.volunteers && (
                <div>
                  {event.volunteers.map((volunteer) => (
                    <div className="volunteer">
                      <p>
                        ✔️
                        {volunteer.firstname}
                        {volunteer.lastname}
                      </p>
                      <p>{volunteer.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </p>

            <button onClick={deleteEvent} className="delete-event">
              Delete Event
            </button>
          </div>
        )}

        {event && (
          <form className="event-form">
            <input
              type="text"
              className="name"
              value={newName}
              placeholder="Name of event"
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="date"
              className="event-date"
              min="2023-01-01"
              max="2024-12-31"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <div className="row">
              <input
                type="time"
                className="event-time"
                min="08:00"
                max="22:00"
                value={newStartTime}
                placeholder="Start time"
                onChange={(e) => setNewStartTime(e.target.value)}
              />
              <input
                type="time"
                className="event-time"
                min="08:00"
                max="22:00"
                value={newEndTime}
                placeholder="End time"
                onChange={(e) => setNewEndTime(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="event-location"
              value={newLocation}
              placeholder="Location of event"
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <input
              type="text"
              className="desc"
              value={newDescription}
              placeholder="Description of event"
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              type="text"
              className="duties"
              value={newDuties}
              placeholder="How can volunteers help?"
              onChange={(e) => setNewDuties(e.target.value)}
            />
            <p className="numVol">Number of volunteers:</p>
            <input
              type="number"
              className="numVolunteer"
              placeholder="number of volunteers"
              value={newNumVolunteers}
              onChange={(e) => setNewNumVolunteers(e.target.value)}
            />
            <div className="buttons">
              <button
                className="cancel-event"
                onClick={(e) => {
                  e.preventDefault();
                  setNewName("");
                  setNewDate("");
                  setNewStartTime("");
                  setNewEndTime("");
                  setNewLocation("");
                  setNewDescription("");
                  setNewDuties("");
                  setNewNumVolunteers("");
                }}
              >
                Clear Form
              </button>
              <button className="save-event" onClick={updateEvent}>
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditEvent;
