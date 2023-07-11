import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { api } from "../utils/axios";
import "./NgoEvents.css";
import EditEvent from "./EditEvent";

const NgoEvents = ({ ngoId }) => {
  const { verifyUser, user } = useContext(AuthContext);
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
  const [allEvents, setAllEvents] = useState(null);

  const handleEditEvent = () => {
    setIsEditing(true);
  };

  const handleDeleteEvent = async () => {
    // try {
    //   const token = await user.getIdToken();
    //   console.log("getting token");
    //   await api.delete(`/ngo/${ngoId}/event/${event._id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   setServerError("");
    //   await verifyUser(user);
    //   setIsAddingEvent(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const fetchNgoEvents = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngo/${ngoId}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServerError("");
      console.log("Events Res", ngoId, res);
      setEvents(res.data);
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
      const res = await api.post(
        `/ngo/${ngoId}/event`,
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
      console.log("Results", res.data);
      await verifyUser(user);
      setIsAddingEvent(false);
      // await fetchAllNgoEvents(ngoId, token);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  // // Fetch NGO events
  // useEffect(() => {
  //   if (user) {
  //     fetchAllNgoEvents();
  //   }
  // }, []);

  return (
    <div>
      <div className="event-profile">
        <div className="side">
          <h2>📅 Scheduled Events</h2>
          <h4>Registered Volunteers</h4>

          <button onClick={() => setIsAddingEvent(true)} className="create-btn">
            Create an event
          </button>
        </div>

        <div className="left-side">
          <button onClick={fetchNgoEvents} className="fetch-btn">
            NGO events
          </button>

          {/* <div>
            {events && (
              <div>
                {events?.map((event, idx) => (
                  <div key={idx} className="event-card">
                    <p className="event-name">{event.name}</p>
                    <p className="event-location"> {event.location} </p>
                    <p className="event-desc">{event.description}</p>
                    <p>
                      Date: <span>{event.date} </span>
                    </p>
                    <p>
                      Time:
                      <span>
                        {event.startTime}-{event.endTime}
                      </span>
                    </p>
                    <p className="event-desc">
                      People:<span>{event.num_volunteers}</span>volunteers
                      needed
                    </p>

                    <h4>Registered Volunteers</h4>

                    {events && (
                      <div>
                        <h4>Volunteers attending</h4>
                        {events.volunteers.map((volunteer, idx) => (
                          <div key={idx} className="volunteers">
                            <p>Name: {volunteer.firstname}</p>
                            <p>{volunteer.lastname}</p>
                            <p>Email: {volunteer.email}</p>
                          </div>
                        ))}
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
          </div> */}

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
                  className="help"
                  value={duties}
                  placeholder="What kind of volunteer help do you need on the day of your event?"
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
    </div>
  );
};

export default NgoEvents;
