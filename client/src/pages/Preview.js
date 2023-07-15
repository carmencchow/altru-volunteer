import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TfiLocationPin } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { BiLeaf } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPreview } from "react-icons/md";
import { api } from "../utils/axios";
import "./Preview.css";
import Navbar from "../components/Navbar";

const Preview = () => {
  const navigate = useNavigate();
  const { mongoUser, user } = useContext(AuthContext);
  const [ngo, setNgo] = useState(null);
  const ngoId = mongoUser.organization._id;

  const fetchNgoData = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/ngo/${ngoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setNgo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const upload = () => {
    console.log("upload image ...");
  };

  const donate = () => {
    console.log("donate image ...");
  };

  const register = () => {
    console.log("register");
  };

  useEffect(() => {
    if (mongoUser.organization) {
      fetchNgoData(mongoUser.organization._id);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <span className="preview">
        <MdPreview /> Preview Page
      </span>
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack />
      </span>

      {ngo && (
        <div className="about-section">
          <div className="right-side">
            <h2 className="preview-h2">🏅 {ngo.name}</h2>
            <div className="row">
              <button className="preview-follow" onClick={donate}>
                Follow
              </button>
              <button className="preview-donate" onClick={donate}>
                Donate
              </button>
            </div>
          </div>
          <p>{ngo.description}</p>
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
              {ngo.address}
              {ngo.district}
            </p>
            <p>
              <span>
                <BsTelephone />
              </span>
              {ngo.telephone}
            </p>
            <p>
              <span>
                <TbWorld />
              </span>{" "}
              {ngo.url}
            </p>
          </div>
        </div>
      )}

      <div className="events">
        <h2>Events</h2>
        <div className="events-grid">
          <div>
            {ngo && ngo.events && (
              <div>
                {ngo.events.map((event, idx) => (
                  <div key={idx} className="event-card">
                    <p className="event-name">{event.name}</p>
                    <p>
                      Date: <span>{event.date} </span>
                    </p>
                    <p className="event-location"> {event.location} </p>
                    <button>Register for event</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
