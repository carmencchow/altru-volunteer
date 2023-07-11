import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Preview.css";
import { AuthContext } from "../context/AuthContext";
import { TfiLocationPin } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { BiLeaf } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPreview } from "react-icons/md";

const Preview = () => {
  const navigate = useNavigate();
  const { mongoUser } = useContext(AuthContext);

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
      <span className="preview">
        <MdPreview /> Preview Page
      </span>
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack />
      </span>

      {mongoUser.organization && (
        <div className="about-section">
          <div className="row">
            <div className="right-side">
              <h2>🏅 {mongoUser.organization.name}</h2>
              <button className="preview-follow" onClick={donate}>
                Follow Organization
              </button>
              <button className="preview-donate" onClick={donate}>
                Make a donation
              </button>
            </div>
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
              <span>
                <TfiLocationPin />
              </span>
              {mongoUser.organization.address}
              {/* {mongoUser.organization.district} */}
            </p>
            <p>
              <span>
                <BsTelephone />
              </span>
              {mongoUser.organization.telephone}
            </p>

            <p>
              <span>Cause:</span>
              {mongoUser.organization.category}
            </p>
            <p>
              <span>
                <TbWorld />
              </span>{" "}
              {mongoUser.organization.url}
            </p>
          </div>
        </div>
      )}

      <div className="events">
        <h2>Events</h2>
        <div className="events-grid">
          <div className="events-card">
            <p>name:</p>
            <p>date:</p>
            <p>time:</p>
            <p>location:</p>
            <p>description:</p>
            <p>duties:</p>
            <button onClick={register}>Register for event</button>
          </div>
          <div className="events-card">
            <p>name:</p>
            <p>date:</p>
            <p>time:</p>
            <p>location:</p>
            <p>description:</p>
            <p>duties:</p>
            <button onClick={register}>Register for event</button>{" "}
          </div>

          <div className="events-card">
            <p>name:</p>
            <p>date:</p>
            <p>time:</p>
            <p>location:</p>
            <p>description:</p>
            <p>duties:</p>
            {/* SendMail email contact person */}
            <button onClick={register}>Register for event</button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
