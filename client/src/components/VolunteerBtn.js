import React from "react";
import "./VolunteerBtn.css";

const VolunteerBtn = ({ attending, toggleModal }) => {
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
        {!attending ? "Sign up" : "Attending"}
      </button>
    </div>
  );
};

export default VolunteerBtn;
