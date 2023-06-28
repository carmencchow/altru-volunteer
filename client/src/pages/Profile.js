import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DonationsInfo from "../components/DonationsInfo";
import VolunteerInfo from "../components/VolunteerInfo";
import ProfileInfo from "../components/ProfileInfo";
import Navbar from "../components/Navbar";
import "./Profile.css";
import OrganizationProfileInfo from "../components/OrganizationProfileInfo";

// Display different components based on the mongoUser's userType
const Profile = () => {
  const { mongoUser } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx);
  };

  if (!mongoUser) return null;
  console.log(mongoUser, mongoUser.userType);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="tabs-container">
          <div className="heading-tabs">
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
              Volunteer
            </div>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }
            >
              <div>
                {mongoUser.userType === "individual" ? (
                  <ProfileInfo />
                ) : (
                  <OrganizationProfileInfo />
                )}
              </div>
            </div>

            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <div>
                <DonationsInfo />
              </div>
            </div>

            <div
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <div>
                <VolunteerInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
