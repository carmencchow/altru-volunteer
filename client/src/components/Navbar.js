import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, mongoUser, handleSignOut } = useContext(AuthContext);
  const navMain = () => {
    if (mongoUser.isOrganizer) {
      navigate("/profile");
    }
    navigate("/ngos");
  };

  const navProfile = () => {
    if (mongoUser.isOrganizer) {
      navigate("/profile");
    }
    navigate("/user/profile");
  };

  return (
    <div>
      <div className="navbar">
        <img className="logo" onClick={navMain} src={logo} alt="logo" />
        <div className="navbar-right">
          <div className="profile-btn" onClick={navProfile}>
            {user && <p className="user-email">{user.email}</p>}
            {/* </div> */}

            {/* <div className="logout-btn" onClick={handleSignOut}> */}
            <p className="logout-btn" onClick={handleSignOut}>
              Logout
            </p>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
