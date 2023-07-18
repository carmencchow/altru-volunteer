import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { EventsContext } from "../context/EventsContext";
import { AuthContext } from "../context/AuthContext";
import { BsArrowLeftSquare } from "react-icons/bs";
import { api } from "../utils/axios";
import Navbar from "../components/Navbar";
import InterestedBtn from "../components/InterestedBtn";
import "./Event.css";

const Event = () => {
  const { fetchEvent, event } = useContext(EventsContext);
  const { mongoUser, user, verifyUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // const registerEvent = async () => {
  //   try {
  //     const userId = mongoUser._id;
  //     const token = await user.getIdToken();
  //     const res = await api.put(
  //       `/event/${id}/register`,
  //       {
  //         userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     toast("Event added");
  //     await verifyUser(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // Remove event
  // const removeEvent = async () => {
  //   try {
  //     const userId = mongoUser._id;
  //     const token = await user.getIdToken();
  //     const res = await api.put(
  //       `/event/${id}/remove`,
  //       {
  //         userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     toast("The event has been removed");
  //     await verifyUser(user);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    fetchEvent(id);
  }, []);

  return (
    <div>
      <Navbar />
      <span className="back" onClick={() => navigate(-1)}>
        <BsArrowLeftSquare />
      </span>

      <Toaster
        toastOptions={{
          style: { backgroundColor: "#b8e981", color: "white" },
        }}
      />
      <div className="heading-wrapper">
        {event && (
          <h2
            className="event-ngo-name"
            onClick={() => {
              navigate(`/ngo/${event.ngo._id}`);
              console.log(`navigate to ${event.ngo.name}`);
            }}
          >
            {" "}
            <span className="org">Organization:</span>⭐ {event.ngo.name}
          </h2>
        )}
      </div>
      <div className="event-wrapper">
        {event && (
          <div className="display-card">
            <p className="event-name">Event: {event.name}</p>
            <p>{event.description}</p>
            <p>Help needed: {event.duties}</p>
            <p>📍 {event.location}</p>
            <p>
              {" "}
              🕒
              {event.startTime}-{event.endTime}pm
            </p>

            <InterestedBtn event={event} />
            {/* <div className="button-row">
              {mongoUser &&
              mongoUser.events.some((event) => event.id === event._id) ? (
                <button className="remove" onClick={removeEvent}>
                  Remove
                </button>
              ) : (
                <button className="interested" onClick={registerEvent}>
                  Interested
                </button>
              )}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
