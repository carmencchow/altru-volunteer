import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import "./OrganizationProfile.css";
import { api } from "../utils/axios";

const OrganizationProfile = () => {
  const navigate = useNavigate();
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);

  const handleEdit = (e) => {
    navigate("/update");
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <div>
      <h2>Organization</h2>
      <div className="user-profile">
        <p>
          User: {mongoUser.firstname} {mongoUser.lastname}
          <p> NGO: {mongoUser.ngo}</p>
        </p>
        <p>Email: {user.email}</p>
        <p>Category: {mongoUser.email}</p>
        <p>Member since: {String(mongoUser.createdAt).slice(0, 10)}</p>
        <button onClick={handleEdit} className="edit-btn">
          Add Ngo
        </button>
      </div>
    </div>
  );
};

export default OrganizationProfile;
