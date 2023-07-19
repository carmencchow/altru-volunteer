import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdPreview } from "react-icons/md";
import NgoDonations from "../components/NgoDonations";
import NgoEvents from "../components/NgoEvents";
import NgoInfo from "../components/NgoInfo";
import Navbar from "../components/Navbar";
import "./NgoProfile.css";

const NgoProfile = () => {
  const navigate = useNavigate();
  const { mongoUser } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx);
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  return (
    <>
      <Navbar />
      <p className="marker">👋 Welcome to Volunteer Connect!</p>
      <p className="welcome">
        This is ... to see what how your page will be displayed to a user{" "}
      </p>
      <div className="profile-container">
        <div className="tabs-container">
          <div className="heading-tabs">
            <button className="preview-btn" onClick={handlePreview}>
              <MdPreview size={50} />
              Preview
            </button>

            <div
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggletabs(1)}
            >
              Profile
            </div>

            <div
              className={toggleState === 2 ? "tabs  active-tabs" : "tabs"}
              onClick={() => toggletabs(2)}
            >
              Donations
            </div>

            {mongoUser && mongoUser.organization && (
              <div
                className={toggleState === 3 ? "tabs  active-tabs" : "tabs"}
                onClick={() => toggletabs(3)}
              >
                Events
              </div>
            )}
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }
            >
              <div>
                <NgoInfo />
              </div>
            </div>
            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <div>
                <NgoDonations />
              </div>
            </div>
            <div
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <div>
                <NgoEvents />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NgoProfile;
