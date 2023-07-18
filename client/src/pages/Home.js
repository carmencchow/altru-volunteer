import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import background from "../assets/volunteer.jpg";
import logo from "../assets/logo.png";
import "./Home.css";

const Home = () => {
  const { mongoUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (mongoUser && mongoUser.isOrganizer) {
      navigate("/profile");
    } else if (mongoUser && !mongoUser.isOrganizer) {
      navigate("/ngos");
    }
  }, [mongoUser]);

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
        <motion.p className="welcome-text">
          Uniting volunteers and organizations for social good.
        </motion.p>
        {/* <motion.p className="sub-text">
          Volunteer Connect is a platform for volunteers and charitable
          organizations. We help connect volunteers and organizations for social
          good.
        </motion.p> */}
      </div>
    </div>
  );
};

export default Home;
