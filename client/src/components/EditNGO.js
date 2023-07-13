import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import Input from "react-phone-number-input/input";
import "./EditNGO.css";

const EditNGO = ({
  name,
  description,
  category,
  address,
  district,
  telephone,
  url,
  setIsEditing,
}) => {
  const { user, verifyUser } = useContext(AuthContext);
  const [newName, setNewname] = useState(name);
  // const [newName, setNewname] = useState(mongoUser.organization.name);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const [newAddress, setNewAddress] = useState(address);
  const [newDistrict, setNewDistrict] = useState(district);
  const [newTelephone, setNewTelephone] = useState(telephone);
  const [newUrl, setNewUrl] = useState(url);
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
          // name: newName || name,
          // description: newDescription || description,
          // category: newCategory || category,
          // address: newAddress || address,
          // district: newDistrict || district,
          // telephone: newTelephone || telephone,
          // url: newUrl || url,

          // name: `${newName}` || `${name}`,
          // address: `${newAddress}` || `${address}`,
          // description: `${newDescription}` || `${description}`,
          // category: `${newCategory}` || `${category}`,
          // district: `${newDistrict}` || `${district}`,
          // telephone: `${newTelephone}` || `${telephone}`,
          // url: `${newUrl}` || `${url}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // await verifyUser(user);
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
          value={newName}
          placeholder={"Organization name"}
          onChange={(e) => setNewname(e.target.value)}
        />
        <input
          type="text"
          className="description"
          value={newDescription}
          placeholder={"Organization description"}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <input
          type="text"
          className="address"
          placeholder={"Organization address"}
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <input
          type="url"
          className="url"
          value={newUrl}
          placeholder={"Organization URL https://www.organization.com"}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Input
          country="CA"
          value={newTelephone}
          placeholder={"Phone number"}
          maxLength="14"
          onChange={(e) => setNewTelephone}
        />
        <select
          className="ngo-select"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="selection">Organization Cause:</option>
          <option value="animals">Animals</option>
          <option value="children & youth">Children & Youth</option>
          <option value="education & literacy">Education & Literacy</option>
          <option value="environment">Environment</option>
          <option value="health & medicine">Health & Medicine</option>
          <option value="sports & recreation">Sports & Recreation</option>
        </select>

        <select
          className="ngo-selectS"
          value={newDistrict}
          onChange={(e) => setNewDistrict(e.target.value)}
        >
          <option value="district">District:</option>
          <option value="Etobicoke-York">Etobicoke-York</option>
          <option value="North York">North York</option>
          <option value="Toronto">Toronto</option>
          <option value="East York">East York & Scarborough</option>
        </select>

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
