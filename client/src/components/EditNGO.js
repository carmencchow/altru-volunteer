import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import Input from "react-phone-number-input/input";
import "./EditNGO.css";

const EditNGO = ({ setIsEditing }) => {
  const { user, verifyUser, mongoUser } = useContext(AuthContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState();
  const [telephone, setTelephone] = useState();
  const [url, setUrl] = useState();
  const [serverError, setServerError] = useState("");

  const updateProfile = async ({ ngoId, e }) => {
    console.log("input", e);
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api.put(
        `/ngo/${ngoId}/`,
        {
          name,
          description,
          category,
          address,
          district,
          telephone,
          url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await verifyUser(user);
      setIsEditing(false);
      setServerError("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="admin-form">
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
          placeholder="Organization address"
          value={address}
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
          value={telephone}
          placeholder="Phone number"
          maxLength="14"
          onChange={(e) => setTelephone}
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
            <option value="education & literacy">Education & Literacy</option>
            <option value="environment">Environment</option>
            <option value="health & medicine">Health & Medicine</option>
            <option value="sports & recreation">Sports & Recreation</option>
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
        <div className="editing-buttons">
          <button className="save-ngo" onClick={updateProfile}>
            Save Changes
          </button>
          <button className="cancel-ngo" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
export default EditNGO;
