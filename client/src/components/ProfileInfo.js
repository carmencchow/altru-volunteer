import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import "./ProfileInfo.css";
import { api } from "../utils/axios";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);

  const handleEdit = (e) => {
    navigate("/edit");
  };

  // Unfollow NGO
  const handleUnfollow = async (follow) => {
    try {
      console.log(follow);
      const token = await user.getIdToken();
      const res = await api.post(
        `/user/${user.uid}/unfollow/ngo`,
        {
          remove: `${follow}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Personal Info</h2>
      <div className="user-profile">
        <p>
          User: {mongoUser.firstname} {mongoUser.lastname}
        </p>
        <p>Email: {user.email}</p>
        <p>Member since: {String(mongoUser.createdAt).slice(0, 10)}</p>
        <button onClick={handleEdit} className="edit-btn">
          Edit Profile
        </button>
      </div>

      {user.following && (
        // {!user.following.length === 0 && (
        <div className="following">
          <h3 className="follow-heading">Following</h3>

          <div className="organizations">
            {user.following.map((follow) => (
              <div className="follow-list">
                {follow}
                <button
                  className="unfollow-btn"
                  onClick={async () => await handleUnfollow(follow)}
                >
                  Unfollow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
