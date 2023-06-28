import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDonationsInfo from "../components/AdminDonationsInfo";
import AdminVolunteerInfo from "../components/AdminVolunteerInfo";
import AdminProfileInfo from "../components/AdminProfileInfo";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Admin = () => {
  const { mongoUser } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx);
  };

  if (!mongoUser) return null;

  return (
    <>
      <Navbar />
      <div className="Admin-container">
        <div className="tabs-container">
          <div className="heading-tabs">
            <div
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggletabs(1)}
            >
              NGO Profile
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
              Events and Volunteers
            </div>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }
            >
              <div>
                <AdminProfileInfo />
              </div>
            </div>

            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <div>
                <AdminDonationsInfo />
              </div>
            </div>

            <div
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <div>
                <AdminVolunteerInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
