import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/altru.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, profile, token, handleSignOut, setToken } =
    useContext(AuthContext);
  const [data, setData] = useState(null);

  const fetchProtectedData = async () => {
    const res = await axios.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(res.data);
  };
  useEffect(() => {
    fetchProtectedData();
  }, []);

  const navMain = () => {
    navigate("/volunteer");
  };

  const navProfile = () => {
    navigate("/profile");
  };

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   console.log("User signed out");
  //   try {
  //     const res = await axios.post(
  //       "https://altru-volunteer-be.onrender.com/api/auth/logout"
  //     );
  //     setUser(null);
  //     setToken("");
  //     await localStorage.clear();
  //     navigate("/login");
  //   } catch (err) {
  //     console.log(err, "Unable to log out");
  //   }
  // };

  return (
    <nav>
      <div className="navbar">
        <img className="logo" onClick={navMain} src={logo} alt="logo" />
        <div className="navbar-right">
          <div className="profile-btn" onClick={navProfile}>
            {user && <p>{user.email}</p>}
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
