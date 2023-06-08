import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/altru.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleSignOut } = useContext(AuthContext);
  const navMain = () => {
    navigate("/volunteer");
  };

  const navProfile = () => {
    navigate("/profile");
  };

  return (
    <nav>
      <div className="navbar">
        <img className="logo" onClick={navMain} src={logo} alt="logo" />
        <div className="navbar-right">
          <div className="profile-btn" onClick={navProfile}>
            {user && <p className="user-email">{user.email}</p>}
          </div>
          <div className="logout-btn" onClick={handleSignOut}>
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
