import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/altru.png";
import "./Login.css";

const Login = () => {
  const { token, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const home = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    if (email && password) {
      const data = await signIn(email, password);
      console.log("User credentials:", data);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/volunteer");
    }
  }, [token]);

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

          <p className="error">{error}</p>

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
