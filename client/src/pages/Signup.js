import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

import logo from "../assets/altru.png";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { user, signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirm, setConfirm] = useState("");

  const homepage = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async () => {
    if (email && password) {
      // Send email and password to Firebase
      const data = await signUp(email, password);
      console.log("Register new user:", data);
      const token = await data.user.getIdToken();

      // Send details to server
      await api.post(
        "/auth/createUser",
        {
          firebaseUID: data.user.uid,
          email: data.user.email,
          firstname: firstname,
          lastname: lastname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/volunteer");
    }
  }, [user]);

  return (
    <>
      <img
        onClick={homepage}
        className="signup-logo"
        src={logo}
        style={{ width: 130, height: 40 }}
        alt="logo"
      />

      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>Create an account</h2>

          <div className="name-row">
            <div className="firstname-input">
              <input
                name="firstname"
                type="text"
                placeholder="  Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="lastname-input">
              <input
                name="lastname"
                type="text"
                placeholder="  Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="email-input">
            <input
              name="email"
              type="email"
              placeholder="  Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password-input">
            <input
              name="password"
              type="password"
              placeholder="  Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="confirm-input">
            <input
              name="confirm"
              type="password"
              placeholder="  Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            className="signup-submit"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <div className="account">
            <div className="my-account">Already have an account?</div>
            <div className="login" onClick={handleLogin}>
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
