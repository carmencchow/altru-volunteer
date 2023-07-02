import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./OrganizationProfile.css";

const OrganizationProfile = () => {
  const navigate = useNavigate();
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);

  const handleEdit = (e) => {
    navigate("/update");
  };

  return (
    <div>
      <h2>Organization</h2>
      <div className="user-profile">
        <p>
          User: {mongoUser.firstname} {mongoUser.lastname}
        </p>
        {mongoUser.organization && (
          <p>Name of Charity: {mongoUser.organization.name}</p>
        )}
        <p>Type: {mongoUser.userType}</p>
        <p>Email: {user.email}</p>
        {mongoUser.organization && (
          <p>Category: {mongoUser.organization.category}</p>
        )}
        <p>Member since: {String(mongoUser.createdAt).slice(0, 10)}</p>
        <button onClick={handleEdit} className="edit-btn">
          Add Ngo
        </button>
      </div>
    </div>
  );
};

export default OrganizationProfile;
