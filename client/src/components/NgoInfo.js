import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "react-phone-number-input/input";
import { api } from "../utils/axios";
import EditNGO from "../components/EditNGO";
import "./NgoInfo.css";

const NgoInfo = () => {
  const { user, verifyUser, mongoUser } = useContext(AuthContext);
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

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api.post(
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
      await verifyUser(user);
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

  useEffect(() => {
    if (mongoUser && mongoUser.organization) {
      setName(mongoUser.organization.name);
      setDescription(mongoUser.organization.description);
      setAddress(mongoUser.organization.address);
      setUrl(mongoUser.organization.url);
      setTelephone(mongoUser.organization.telephone);
      setCategory(mongoUser.organization.category);
      setDistrict(mongoUser.organization.district);
    }
  }, [mongoUser]);

  return (
    <div>
      <h2>📂 Organization Profile</h2>
      <div className="user-profile">
        <div className="ngo-profile-about">
          {mongoUser.organization && (
            <div>
              <div>
                <span className="ngo-name">{mongoUser.organization.name}</span>
                <p className="website">Website: {mongoUser.organization.url}</p>
                <h5>Organization description:</h5>
                <p>{mongoUser.organization.description}</p>
                <p>Cause: {mongoUser.organization.category}</p>
                <h5>Address:</h5>
                <p>
                  {mongoUser.organization.address}{" "}
                  <span>({mongoUser.organization.district})</span>
                </p>
                <h5>Contact: </h5>
                <p className="ngo-contact">
                  {mongoUser.firstname} {mongoUser.lastname}
                </p>
                <p className="email-ngo"> {mongoUser.email}</p>
                <p>{mongoUser.organization.telephone}</p>
              </div>
            </div>
          )}

          {!mongoUser.organization ? (
            <button onClick={handleAddNGO} className="add-btn">
              Create a profile
            </button>
          ) : (
            <button onClick={handleEditNGO} className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>

        <div className="right-side">
          {isAddingNGO ? (
            <div className="admin-form">
              <div className="volunteers"></div>
              <input
                type="text"
                className="org-name"
                value={name}
                placeholder="Organization name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="description"
                value={description}
                placeholder="Organization description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="address"
                value={address}
                placeholder="Organization address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="url"
                className="url"
                value={url}
                placeholder="Organization URL https://www.organization.com"
                onChange={(e) => setUrl(e.target.value)}
              />
              <Input
                country="CA"
                maxLength="14"
                value={telephone}
                placeholder="Organization phone number"
                onChange={setTelephone}
              />
              <div className="profile-row">
                <select
                  className="ngo-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="selection">Organization Cause:</option>
                  <option value="animals">Animals</option>
                  <option value="social justice">Social Justice</option>
                  <option value="education & literacy">
                    Education & Literacy
                  </option>
                  <option value="environment">Environment</option>
                  <option value="health & medicine">Health & Medicine</option>
                  <option value="sports & recreation">
                    Sports & Recreation
                  </option>
                </select>

                <select
                  className="ngo-select"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="district">District:</option>
                  <option value="Etobicoke-York">Etobicoke-York</option>
                  <option value="North York">North York</option>
                  <option value="Toronto">Toronto</option>
                  <option value="East York & Scarborough">
                    East York & Scarborough
                  </option>
                </select>
              </div>

              {serverError && <p className="server-error">{serverError}</p>}

              <button className="edit-btn" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
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
