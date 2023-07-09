import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NgoInfo from "../components/NgoInfo";
// import NgoDonations from "../components/NgoDonations";
// import NgoEvents from "../components/NgoEvents";
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

  if (!mongoUser) return null;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="tabs-container">
          <div className="heading-tabs">
            <button className="preview-btn" onClick={handlePreview}>
              Live Preview
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
              {" "}
              Donations
            </div>

            <div
              className={toggleState === 3 ? "tabs  active-tabs" : "tabs"}
              onClick={() => toggletabs(3)}
            >
              Events
            </div>
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
              <div>{/* <NgoDonations /> */}</div>
            </div>

            <div
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <div>{/* <NgoEvents /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NgoProfile;
