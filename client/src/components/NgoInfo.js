import React, { useContext, useState } from "react";
import Input from "react-phone-number-input/input";
import { fetchUserData } from "../utils/fetchUserData";
import { Image } from "cloudinary-react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import EditNGO from "../components/EditNGO";
import "./NgoInfo.css";

const NgoInfo = () => {
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);
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
      await fetchUserData(user.uid, setMongoUser, token);

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

                <h5>Address:</h5>
                <p>{mongoUser.organization.address}</p>
                <p>{mongoUser.organization.district}</p>
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
              Add Organization
            </button>
          ) : (
            <button onClick={handleEditNGO} className="edit-btn">
              Edit Organization
            </button>
          )}
        </div>

        <div classname="right-side">
          {isAddingNGO ? (
            <form className="admin-form">
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
              <div>
                <select
                  className="ngo-select"
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
                className="ngo-select"
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
