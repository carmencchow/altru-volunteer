import React, { useContext, useState } from "react";
import Input from "react-phone-number-input/input";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import EditNGO from "../components/EditNGO";
import "./NgoInfo.css";

const NgoInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNGO, setIsAddingNGO] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [telephone, setTelephone] = useState("");
  const [url, setUrl] = useState("");
  const [serverError, setServerError] = useState("");
  const { user, mongoUser } = useContext(AuthContext);

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      const res = await api.post(
        `/ngo`,
        {
          name: `${name}`,
          description: `${description}`,
          category: `${category}`,
          address: `${address}`,
          district: `${district}`,
          telephone: `${telephone}`,
          url: `${url}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data", res.data);
      setServerError("");
      setIsAddingNGO(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  const handleAddNGO = () => {
    setIsAddingNGO(true);
  };

  const handleEditNGO = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Organization Profile</h1>
      <div className="user-profile">
        <div className="left-side">
          {mongoUser.organization && (
            <div>
              <div>
                <span className="ngo-name">{mongoUser.organization.name}</span>
                <h5>Non-profit Information:</h5>
                <p>About: {mongoUser.organization.description}</p>
                <p>Address: {mongoUser.organization.address}</p>
                <p>District:{mongoUser.organization.district}</p>
                <p>Cause: {mongoUser.organization.category}</p>
                <p>Tel: {mongoUser.organization.telephone}</p>
                <p>URL: {mongoUser.organization.url}</p>
                <h5>Contact: </h5>
                <p className="ngo-contact">
                  {mongoUser.firstname} {mongoUser.lastname}
                </p>
                <p className="email-ngo"> {mongoUser.email}</p>
              </div>
            </div>
          )}

          {!mongoUser.organization ? (
            <button onClick={handleAddNGO} className="add-btn">
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
              <input
                type="text"
                className="description"
                value={description}
                placeholder="Describe your non-profit and the work you are doing"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="address"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
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
                  <option value="selection">Organization Cause:</option>
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

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="district">District:</option>
                <option value="Etobicoke-York">Etobicoke-York</option>
                <option value="North York">North York</option>
                <option value="Toronto">Toronto</option>
                <option value="East York">East York & Scarborough</option>
              </select>

              {serverError && <p className="server-error">{serverError}</p>}

              <button className="edit-btn" onClick={saveProfile}>
                Save Profile
              </button>
            </form>
          ) : null}

          {isEditing && (
            <EditNGO
              {...{
                name,
                description,
                category,
                address,
                district,
                telephone,
                url,
                isEditing,
                setIsEditing,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NgoInfo;
