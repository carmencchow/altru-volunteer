import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import "./OrganizationProfile.css";

const OrganizationProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState([]);
  const [commitment, setCommitment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [event, setEvent] = useState(false);
  const [help, setHelp] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [numVolunteers, setNumVolunteers] = useState(0);

  const navigate = useNavigate();
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);

  const createNGOProfile = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.post(
        `/ngo/`,
        {
          name: `${name}`,
          phone: `${phone}`,
          category: `${category}`,
          commitment: `${commitment}`,
          frequency: `${frequency}`,
          // event: `${event}`,
          // help: `${help}`,
          // eventDate: `${eventDate}`,
          // eventTime: `${eventTime}`,
          // eventDescription: `${eventDescription}`,
          // numVolunteers: `${numVolunteers}`,
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

  const handleEdit = async () => {};

  return (
    <>
      <div className="profile-container">
        <div className="content-tabs">
          <div className="content active-content">
            <div>
              <form className="admin-form" onSubmit={createNGOProfile}>
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
                <div>
                  Category:
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="animals">Animals</option>
                    <option value="children & youth">Children & Youth</option>
                    <option value="education & literacy">
                      Education & Literacy
                    </option>
                    <option value="environment">Environment</option>
                    <option value="health & medicine">Health & Medicine</option>
                    <option value="sports & recreation">
                      Sports & Recreation
                    </option>
                  </select>
                </div>
                What type of commitment are you looking for?
                <select
                  value={frequency}
                  onChange={(e) => {
                    setFrequency(e.target.value);
                  }}
                >
                  <option value="day">One Day Events</option>
                  <option value="week">Weekly commitment</option>
                  <option value="month">Monthly commitment</option>
                </select>
                <input
                  type="number"
                  className="org-commitment"
                  value={commitment}
                  placeholder="Hours required"
                  onChange={(e) => setCommitment(e.target.value)}
                />
                What kind of help do you need?
                <input
                  type="text"
                  className="help"
                  placeholder="Eg. clerical work, social media ..."
                  value={help}
                  onChange={(e) => setHelp(e.target.value)}
                />
                {/* Do you have an event coming up?
                <input
                  type="checkbox"
                  className="checkbox-event"
                  value={event}
                  onChange={() => setEvent(true)}
                />
                {event && (
                  <div className="event-form">
                    <input
                      type="text"
                      className="event-date"
                      value={eventDate}
                      placeholder="Date of event"
                      onChange={(e) => setEventDate(e.target.value)}
                    />

                    <input
                      type="text"
                      className="event-time"
                      value={eventTime}
                      placeholder="Event time"
                      onChange={(e) => setEventTime(e.target.value)}
                    />

                    <input
                      type="text"
                      className="desc"
                      value={eventDescription}
                      placeholder="Description of event"
                      onChange={(e) => setEventDescription(e.target.value)}
                    />

                    <input
                      type="number"
                      className="numVolunteer"
                      value={numVolunteers}
                      placeholder="How many volunteers needed?"
                      onChange={(e) => setNumVolunteers(e.target.value)}
                    />
                  </div>
                )} */}
                <button className="save-btn" onSubmit={createNGOProfile}>
                  Create Profile
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
    </>
  );
};
export default OrganizationProfile;
