import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../utils/axios";
import "./FollowBtn.css";

const FollowBtn = ({ ngo }) => {
  const { mongoUser, verifyUser, user } = useContext(AuthContext);

  const followNgo = async () => {
    try {
      const token = await user.getIdToken();
      console.log("Following ngo", ngo, ngo.name);
      await api.post(
        `/ngo/follow/${ngo._id}`,
        {
          ngoId: `${ngo._id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Following", `${ngo.name}`);
      await verifyUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const unfollowNgo = async () => {
    try {
      const userId = mongoUser._id;
      const token = await user.getIdToken();
      await api.put(
        `/ngo/unfollow/${ngo._id}`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Unfollowing", `${ngo.name}`);
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

      {mongoUser.ngos &&
      mongoUser.ngos.filter((item) => item._id === ngo._id).length === 0 ? (
        <button
          className="unfollow-btn"
          onClick={() => {
            followNgo(ngo._id);
            console.log("Following", ngo._id);
          }}
        >
          Follow {ngo.name}
        </button>
      ) : (
        <button className="btn" onClick={unfollowNgo}>
          Unfollow {ngo.name}
        </button>
      )}
    </div>
  );
};

export default FollowBtn;
