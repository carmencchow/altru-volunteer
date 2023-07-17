import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import background from "../assets/volunteer.jpg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="banner">
        <div className="logo-wrapper">
          <img className="home-logo" src={logo} alt="logo" />
          <div className="buttons">
            <div className="login-btn" onClick={handleLogin}>
              Login
            </div>
            <div className="signup-btn" onClick={handleSignup}>
              Signup
            </div>
          </div>
        </div>
      </div>
      <div className="home-text">
        <p className="welcome-text">Make a difference in your community.</p>
        <p className="sub-text">
          Uniting volunteers and organizations for social impact.
        </p>
      </div>
    </div>
  );
};

export default Home;
