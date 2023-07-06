import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import Input from "react-phone-number-input/input";
import "./OrganizationProfile.css";
import { api } from "../utils/axios";
import EditNGO from "../pages/EditNGO";

const OrganizationProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNGO, setIsAddingNGO] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [telephone, setTelephone] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [commitment, setCommitment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [help, setHelp] = useState("");
  const [serverError, setServerError] = useState("");
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);

  const handleAddNGO = () => {
    setIsAddingNGO(true);
  };

  const handleEditNGO = () => {
    setIsEditing(true);
  };

  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      await api.post(
        `/user/${user.uid}/addNgo`,
        {
          name: `${name}`,
          about: `${about}`,
          url: `${url}`,
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
      setServerError("");
      await fetchUserData(user.uid, setMongoUser, token);
      setIsAddingNGO(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="user-profile">
        <div className="left-side">
          {mongoUser.organization && (
            <div>
              <span className="ngo-name">{mongoUser.organization.name}</span>
              <p>{mongoUser.organization.about}</p>
              <h5>Volunteer Information:</h5>
              <p>{mongoUser.organization.help}</p>
              <p>
                Time commitment: {mongoUser.organization.commitment} hours /
                {mongoUser.organization.frequency}
              </p>
              <h5>Contact:</h5>

              <p className="ngo-contact">
                {mongoUser.firstname} {mongoUser.lastname}
              </p>
              <p className="email-ngo"> {mongoUser.email}</p>
              <p className="ngo-website">{mongoUser.organization.url}</p>
              <p>{mongoUser.organization.telephone}</p>
            </div>
          )}
          {!mongoUser.organization ? (
            <button onClick={handleAddNGO} className="edit-btn">
              Add NGO
            </button>
          ) : (
            <button onClick={handleEditNGO} className="edit-btn">
              Edit NGO
            </button>
          )}
        </div>

        <div classname="right-side">
          {isAddingNGO ? (
            <form className="admin-form">
              <div className="volunteers">
                <p>NGO Information:</p>
              </div>
              <input
                type="text"
                className="org-name"
                value={name}
                placeholder="Name of nonprofit"
                onChange={(e) => setName(e.target.value)}
              />
              {serverError && <p className="server-error">{serverError}</p>}
              <input
                type="text"
                className="about"
                value={about}
                placeholder="Describe your non-profit and the work you are doing"
                onChange={(e) => setAbout(e.target.value)}
              />
              <input
                type="url"
                className="url"
                value={url}
                placeholder="https://www.example.com"
                onChange={(e) => setUrl(e.target.value)}
              />
              <Input
                country="CA"
                maxLength="14"
                value={telephone}
                placeholder="Phone number"
                onChange={setTelephone}
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
                  <option value="health & medicine">Health & Medicine</option>
                  <option value="sports & recreation">
                    Sports & Recreation
                  </option>
                </select>
              </div>
              <div className="volunteers">
                <p>Time commitment from volunteers:</p>
              </div>
              <div className="row">
                <select
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value)}
                >
                  <option value="hours">Number of hours:</option>
                  <option value="1-5 hours">1-5</option>
                  <option value="6-10 hours">6-10</option>
                  <option value="10-15 hours">10-15</option>
                  <option value="15-20 hours">15-20</option>
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
              <div className="volunteers">
                <p>Volunteer duties and responsibilities:</p>
              </div>
              <input
                type="text"
                className="help"
                placeholder="Describe volunteer position and duties..."
                value={help}
                onChange={(e) => setHelp(e.target.value)}
              />
              <button className="edit-btn" onClick={createProfile}>
                Save Profile
              </button>
            </form>
          ) : null}

          {isEditing && (
            <EditNGO
              {...{
                name,
                about,
                url,
                isEditing,
                setIsEditing,
                telephone,
                category,
                commitment,
                frequency,
                help,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
