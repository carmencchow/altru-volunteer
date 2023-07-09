import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Preview.css";
import { AuthContext } from "../context/AuthContext";

const Preview = () => {
  const navigate = useNavigate();
  const { mongoUser } = useContext(AuthContext);

  // Display all Ngo, events information here

  const upload = () => {
    console.log("upload image ...");
  };

  const donate = () => {
    console.log("donate image ...");
  };

  const register = () => {
    console.log("register");
  };
  return (
    <div>
      <span> Preview Page</span>
      <span className="back" onClick={() => navigate(-1)}>
        Back
      </span>
      <div className="about-section">
        <div className="row">
          <h2>{mongoUser.organization.name}</h2>
          <button className="donate" onClick={donate}>
            Make a donation
          </button>
        </div>
        <p>About: {mongoUser.organization.description}</p>
        <div className="background-image">
          stock image
          <button className="image" onClick={upload}>
            Upload Image
          </button>
        </div>
        <div className="info">
          <p>
            <span>Location:</span>
            {mongoUser.organization.address},{mongoUser.organization.district},
            Toronto
          </p>
          <p>
            <span>Tel</span>
            {mongoUser.organization.telephone}
          </p>

          <p>
            <span>Cause: </span>
            {mongoUser.organization.category}
          </p>
          <p>
            <span>URL:</span> {mongoUser.organization.url}
          </p>
        </div>
      </div>
      <div className="events">
        <h2>Events</h2>
        <div className="events-grid">
          {/* Map through events */}
          <div className="events-card">
            <p>name:</p>
            <p>date:</p>
            <p>time:</p>
            <p>location:</p>
            <p>description:</p>
            <p>duties:</p>
            <p>numVol:</p>
            <button onClick={register}>Sign up for more info</button>
          </div>
          <div className="events-card">
            <p>name:</p>
            <p>date:</p>
            <p>time:</p>
            <p>location:</p>
            <p>description:</p>
            <p>duties:</p>
            <p>numVol:</p>
            <button onClick={register}>Sign up for more info</button>
          </div>

          <div className="events-card">
            <p>name:</p>
            <p>date:</p>
            <p>time:</p>
            <p>location:</p>
            <p>description:</p>
            <p>duties:</p>
            <p>numVol:</p>

            {/* SendMail email contact person */}
            <button onClick={register}>Sign up for more info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
