import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/altru.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser, token, setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const home = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    console.log("Submitting");
    try {
      e.preventDefault();
      console.log("Form data:", formData);
      const res = await axios.post(
        "https://altru-volunteer-be.onrender.com/api/auth/login",

        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Result:", res);
      const data = res.data;
      localStorage.setItem("token", res.data.token);
      setUser(data.user);
      setToken(data.token);
      console.log(data.user.firstname, data.user.lastname, data.user._id);
      localStorage.setItem("user", data.user);
      // localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/volunteer");
    } catch (err) {
      console.log(err, "Incorrect password or email");
      setError("Incorrect email or password. Please try again!");
      navigate("/login");
    }
  };

  return (
    <>
      <img
        onClick={home}
        className="login-logo"
        src={logo}
        style={{ width: 130, height: 40 }}
        alt="logo"
      />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>Welcome!</h2>
          <div className="email-input">
            <input
              name="email"
              type="email"
              placeholder="  Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="password-input">
            <input
              name="password"
              type="password"
              placeholder="  Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <p className="error">{error}</p>

          <div className="login-div">
            <button
              type="submit"
              className="login-submit"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>

          <div className="new-account">
            <div className="no-account"> Don't have an account?</div>
            <div className="register" onClick={handleSignup}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
