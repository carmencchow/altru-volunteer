import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import Navbar from "../components/Navbar";
import { api } from "../utils/axios";
// f
import "../components/Form.css";

const Admin = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState([]);
  const [commitment, setCommitment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [event, setEvent] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const navigate = useNavigate();
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);

  const handleUpdate = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.put(
        `/user/${user.uid}`,
        {
          name: `${name}`,
          phone: `${phone}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      await fetchUserData(user.uid, setMongoUser, token);
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
                <form onSubmit={handleUpdate}>
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
                    value={phone}
                    placeholder="Phone number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    type="text"
                    className="org-category"
                    value={category}
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <input
                    type="text"
                    className="org-commitment"
                    value={commitment}
                    placeholder="Volunteer hours"
                    onChange={(e) => setCommitment(e.target.value)}
                  />
                  <input
                    type="text"
                    className="org-frequency"
                    value={frequency}
                    placeholder="One day, weekly, monthly"
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  Do you have an event coming up?
                  <input
                    type="checkbox"
                    className="event"
                    value={event}
                    // onChange={(e) => setPhone(e.target.value)}
                  />
                  {event && (
                    <div className="event-form">
                      <input
                        type="text"
                        className="name"
                        value={name}
                        placeholder="Name of ngo"
                        onChange={(e) => setName(e.target.value)}
                      />

                      <input
                        type="text"
                        className="phone"
                        value={phone}
                        placeholder="Phone number"
                        onChange={(e) => setPhone(e.target.value)}
                      />

                      <input
                        type="text"
                        className="name"
                        value={name}
                        placeholder="Name of ngo"
                        onChange={(e) => setName(e.target.value)}
                      />

                      <input
                        type="text"
                        className="phone"
                        value={phone}
                        placeholder="Phone number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  )}
                  <button className="save-btn" onSubmit={handleUpdate}>
                    Update Profile
                  </button>
                </form>

                <div className="save-delete-row">
                  {/* <button className="save-btn" onClick={handleUpdate}>
                    Update Profile
                  </button> */}
                </div>
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
export default Admin;
