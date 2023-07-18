import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../utils/axios";
import "./FollowBtn.css";

const InterestedBtn = ({ event }) => {
  const { mongoUser, verifyUser, user } = useContext(AuthContext);

  const registerEvent = async () => {
    try {
      const userId = mongoUser._id;
      const token = await user.getIdToken();
      const res = await api.put(
        `/event/${event._id}/register`,
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
      await api.put(
        `/event/${event._id}/remove`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("The event has been removed");
      await verifyUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#b8e981", color: "white" },
        }}
      />
      {mongoUser.events &&
      mongoUser.events.filter((item) => item._id === event._id).length === 0 ? (
        <button
          className="remove"
          onClick={() => {
            registerEvent(event._id);
            console.log("Interested in", event._id);
          }}
        >
          Interested
        </button>
      ) : (
        <button className="interested" onClick={removeEvent}>
          No longer interested
        </button>
      )}
    </div>
  );
};

export default InterestedBtn;
