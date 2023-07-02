import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./OrganizationProfile.css";

const OrganizationProfile = () => {
  const navigate = useNavigate();
  const { mongoUser, user } = useContext(AuthContext);

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
        <p>Account Type: {mongoUser.userType}</p>
        <p>Email: {user.email}</p>
        {mongoUser.organization && (
          <p>Category: {mongoUser.organization.category}</p>
        )}
        {mongoUser.organization && (
          <p>Frequency: {mongoUser.organization.frequency}</p>
        )}
        {mongoUser.organization && (
          <p>Commitment: {mongoUser.organization.commitment}</p>
        )}
        {mongoUser.organization && <p>Duties: {mongoUser.organization.help}</p>}
        <p>Member since: {String(mongoUser.createdAt).slice(0, 10)}</p>
        <button onClick={handleEdit} className="edit-btn">
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default OrganizationProfile;
