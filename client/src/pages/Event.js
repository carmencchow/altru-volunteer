import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { EventsContext } from "../context/EventsContext";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import Navbar from "../components/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Event.css";

const Event = () => {
  const { fetchEvent, event } = useContext(EventsContext);
  const { mongoUser, user, verifyUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const registerEvent = async () => {
    try {
      const userId = mongoUser._id;
      const token = await user.getIdToken();
      const res = await api.put(
        `/event/${id}/register`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast("Event added");
      await verifyUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  // Remove event
  const removeEvent = async () => {
    try {
      const userId = mongoUser._id;
      const token = await user.getIdToken();
      const res = await api.put(
        `/event/${id}/remove`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast("The event has been removed");
      await verifyUser(user);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <div>
      <Navbar />
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack />
      </span>

      <Toaster
        toastOptions={{
          style: { backgroundColor: "#b8e981", color: "white" },
        }}
      />

      {event && (
        <h2
          className="event-ngo-name"
          onClick={() => {
            navigate(`/ngo/${event.ngo._id}`);
            console.log(`navigate to ${event.ngo.name}`);
          }}
        >
          ⭐ {event.ngo.name}
        </h2>
      )}
      <div className="event-wrapper">
        {event && (
          <div className="display-card">
            <p className="event-name">{event.name}</p>
            <p>{event.description}</p>
            <p>Help needed: {event.duties}</p>
            <p>📍 {event.location}</p>
            <p>
              {" "}
              🕒
              {event.startTime}-{event.endTime}pm
            </p>
            <div className="button-row">
              {mongoUser &&
              mongoUser.events.some((event) => event.id === event._id) ? (
                <button className="remove" onClick={removeEvent}>
                  Remove
                </button>
              ) : (
                <button className="register" onClick={registerEvent}>
                  Express Interest
                </button>
              )}
            </div>

            {/* {mongoUser &&
              mongoUser.events.some((eventId) => {
                console.log("event._id", event._id);
                console.log("mongoUser.events:", mongoUser.events);
                return eventId.toString() === event._id.toString();
              }) ? (
                <button className="remove" onClick={removeEvent}>
                  Remove
                </button>
              ) : (
                <button className="register" onClick={registerEvent}>
                  Express Interest
                </button>
              )} */}
          </div>
          //{" "}
        )}
      </div>
    </div>
  );
};

export default Event;
