import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserDonations from "../components/UserDonations";
import UserVolunteers from "../components/UserVolunteers";
import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import "./Profile.css";
import OrganizationProfile from "../components/OrganizationProfile";
import OrganizationDonations from "../components/OrganizationDonations";
import OrganizationVolunteers from "../components/OrganizationEvents";

const Profile = () => {
  const { mongoUser } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx);
  };

  if (!mongoUser) return null;
  console.log(mongoUser);

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
              {mongoUser.userType === "individual" ? "Profile" : "NGO Profile"}
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
                {mongoUser.userType === "individual" ? (
                  <UserProfile />
                ) : (
                  <OrganizationProfile />
                )}
              </div>
            </div>

            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <div>
                {mongoUser.userType === "individual" ? (
                  <UserDonations />
                ) : (
                  <OrganizationDonations />
                )}
              </div>
            </div>

            <div
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <div>
                {mongoUser.userType === "individual" ? (
                  <UserVolunteers />
                ) : (
                  <OrganizationVolunteers />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
