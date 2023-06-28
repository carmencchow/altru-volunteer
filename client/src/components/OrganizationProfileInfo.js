import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import "./ProfileInfo.css";
import { api } from "../utils/axios";

const OrganizationProfileInfo = () => {
  const navigate = useNavigate();
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);

  const handleEdit = (e) => {
    navigate("/admin");
  };

  return (
    <div>
      <h2>NGO Info</h2>
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
    </div>
  );
};

export default OrganizationProfileInfo;
