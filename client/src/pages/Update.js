import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import Navbar from "../components/Navbar";
import "./Update.css";

const Update = () => {
  const navigate = useNavigate();
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [category, setCategory] = useState("");
  const [commitment, setCommitment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [help, setHelp] = useState("");

  const updateProfile = async () => {
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      const res = await api.post(
        `/user/${user.uid}/addNgo`,
        {
          name: `${name}`,
          telephone: `${telephone}`,
          category: `${category}`,
          commitment: `${commitment}`,
          frequency: `${frequency}`,
          help: `${help}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log("Data is:", data);
      await fetchUserData(user.uid, setMongoUser, token);
      console.log(
        "from frontend before profile-nav",
        user.uid,
        setMongoUser,
        token
      );
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const profile = () => {
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="tabs-container">
          <div className="heading-tabs">
            <div className="tabs active-tabs">
              <div onClick={profile}>NGO Profile</div>
            </div>
          </div>

          <div className="content-tabs">
            <div className="content active-content">
              <div>
                <form className="admin-form" onSubmit={updateProfile}>
                  <h2>Tell us about your nonprofit</h2>
                  <input
                    type="text"
                    className="org-name"
                    value={name}
                    placeholder="Name of nonprofit"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="org-phone"
                    value={telephone}
                    placeholder="Phone number"
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                  <div>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="selection">Type of nonprofit:</option>
                      <option value="animals">Animals</option>
                      <option value="children & youth">Children & Youth</option>
                      <option value="education & literacy">
                        Education & Literacy
                      </option>
                      <option value="environment">Environment</option>
                      <option value="health & medicine">
                        Health & Medicine
                      </option>
                      <option value="sports & recreation">
                        Sports & Recreation
                      </option>
                    </select>
                  </div>
                  <div className="volunteers">
                    {" "}
                    <p>Volunteer Information:</p>
                  </div>
                  <div className="row">
                    <select
                      value={commitment}
                      onChange={(e) => setCommitment(e.target.value)}
                    >
                      <option value="hours">Number of hours:</option>
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="10-15">10-15</option>
                      <option value="15-20">15-20</option>
                    </select>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                    >
                      <option value="time">Time commitment:</option>
                      <option value="day">just one day</option>
                      <option value="week">a week</option>
                      <option value="month">a month</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    className="help"
                    placeholder="Describe volunteer position and duties..."
                    value={help}
                    onChange={(e) => setHelp(e.target.value)}
                  />
                  <button className="save-btn" onSubmit={updateProfile}>
                    Save Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
