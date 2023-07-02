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
  const [numVolunteers, setNumVolunteers] = useState(0);
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

  const handleDelete = async () => {
    console.log("Deleting your account");
    await api.delete(`/user/${user.uid}`).then((res) => {
      console.log(`Account deleted`, res.data);
      navigate("/");
    });
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
                  <input
                    type="text"
                    className="org-name"
                    value={name}
                    placeholder="NGO name"
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
                      <option value="selection">Category:</option>
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
                  <input
                    type="number"
                    className="org-commitment"
                    value={commitment}
                    placeholder="Hours required"
                    onChange={(e) => setCommitment(e.target.value)}
                  />
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option value="time">Time commitment:</option>
                    <option value="day">just one day</option>
                    <option value="week">per week</option>
                    <option value="month">per month</option>
                  </select>
                  What kind of help do you need?
                  <input
                    type="text"
                    className="help"
                    placeholder="Eg. clerical work, social media ..."
                    value={help}
                    onChange={(e) => setHelp(e.target.value)}
                  />
                  <input
                    type="number"
                    className="numVolunteer"
                    value={numVolunteers}
                    placeholder="How many volunteers needed?"
                    onChange={(e) => setNumVolunteers(e.target.value)}
                  />
                  <button className="save-btn" onSubmit={updateProfile}>
                    Create Ngo Profile
                  </button>
                </form>

                <div className="save-delete-row"></div>
                <div className="save-delete-row">
                  <button className="delete-btn" onClick={handleDelete}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
