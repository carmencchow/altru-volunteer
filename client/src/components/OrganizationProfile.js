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
  const [newName, setNewName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [category, setCategory] = useState("");
  const [commitment, setCommitment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [help, setHelp] = useState("");
  const [serverError, setServerError] = useState("");
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);

  const handleAdd = () => {
    setIsAddingNGO(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveProfileChanges = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      // const res =
      await api.post(
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
      // const data = res.data;
      // console.log("Data is:", data);
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
      <h2>Non-profit Information</h2>
      <div className="user-profile">
        {mongoUser.organization && (
          <div>
            <p>{mongoUser.organization.name}</p>
            <p>
              Contact: {mongoUser.firstname} {mongoUser.lastname}
            </p>
            <p>Tel: +{mongoUser.organization.telephone}</p>
            <p>Category: {mongoUser.organization.category}</p>

            <h4>Volunteer Information:</h4>
            <p>
              Volunteers needed {mongoUser.organization.commitment} hours per
              {mongoUser.organization.frequency} for{" "}
              {mongoUser.organization.help}
            </p>
          </div>
        )}

        {isAddingNGO ? (
          <form className="admin-form">
            <input
              type="text"
              className="org-name"
              value={newName === "" ? name : newName}
              placeholder="Name of nonprofit"
              onChange={(e) => setName(e.target.value)}
            />
            {serverError && <p className="server-error">{serverError}</p>}
            <Input
              country="CA"
              // type="text"
              // className="org-phone"
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
                <option value="sports & recreation">Sports & Recreation</option>
              </select>
            </div>
            <div className="volunteers">
              {" "}
              <p>Time commitment from volunteers:</p>
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
            <button className="edit-btn" onClick={saveProfileChanges}>
              Save Profile
            </button>
          </form>
        ) : null}
        {!mongoUser.organization ? (
          <button onClick={handleAdd} className="edit-btn">
            Add NGO
          </button>
        ) : (
          <button onClick={handleEdit} className="edit-btn">
            Edit NGO
          </button>
        )}
        {isEditing && <EditNGO name={name} />}
      </div>
    </div>
  );
};

export default OrganizationProfile;
