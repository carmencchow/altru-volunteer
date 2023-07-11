import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/altru.png";
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
    <nav>
      <div className="navbar">
        <img className="logo" onClick={navMain} src={logo} alt="logo" />
        <div className="navbar-right">
          <div className="name-btn">
            {mongoUser && (
              <p className="user-name">
                {mongoUser.firstname}
                {mongoUser.lastname}
              </p>
            )}
          </div>
          <div className="profile-btn" onClick={navProfile}>
            {user && <p className="user-email">{user.email}</p>}
          </div>

          <div className="logout-btn" onClick={handleSignOut}>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
