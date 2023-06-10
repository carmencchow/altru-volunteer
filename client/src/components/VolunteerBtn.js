import React from "react";
import "./VolunteerBtn.css";

const VolunteerBtn = ({ attending, toggleModal }) => {
  return (
    <button
      className="volunteer-btn"
      disabled={attending}
      onClick={() => {
        console.log("button clicked", attending);
        toggleModal();
      }}
    >
      {attending ? "Attending" : "Sign up"}
    </button>
  );
};

export default VolunteerBtn;
