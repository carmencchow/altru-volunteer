import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/altru.png";
import "./Login.css";

const Login = () => {
  const { signIn, mongoUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const home = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    try {
      if (email && password) {
        // signIn function handles authentication process and updates the user state internally. No need to access user object/token in Login
        await signIn(email, password);
      } else {
        console.log("Missing email or password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mongoUser && mongoUser.isOrganizer) {
      navigate("/profile");
    } else if (mongoUser && !mongoUser.isOrganizer) {
      navigate("/ngos");
    }
  }, [mongoUser]);

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
          <h2>👋 Hello again!</h2>
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

          <div className="login-div">
            <button
              type="submit"
              className="login-submit"
              onClick={handleSignIn}
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
