import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./VolunteerBtn.css";

const VolunteerBtn = ({ getUser, attending, toggleModal }) => {
  return (
    <div className="volunteer">
      <button
        disabled={attending}
        onClick={() => {
          console.log("button clicked", attending);
          toggleModal();
        }}
        className="volunteer-btn"
      >
        {attending ? "Attending" : "Sign up"}
      </button>
    </div>
  );
};

export default VolunteerBtn;
