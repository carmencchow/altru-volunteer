import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
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
  const { user, setMongoUser } = useContext(AuthContext);
  const [newName, setNewname] = useState(name);
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api.put(
        // `/ngo/${ngo._id}/`,
        {
          name: `${newName}` || `${name}`,
          description: `${newDescription}` || `${description}`,
          category: `${newCategory}` || `${category}`,
          address: `${newAddress}` || `${address}`,
          district: `${newDistrict}` || `${district}`,
          telephone: `${newTelephone}` || `${telephone}`,
          url: `${newUrl}` || `${url}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserData(user.uid, setMongoUser, token);
      setIsEditing(false);
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
          value={newName ? newName : name}
          placeholder={name ? name : "Name of non-profit"}
          onChange={(e) => setNewname(e.target.value)}
        />
        <input
          type="text"
          className="description"
          value={newDescription ? newDescription : description}
          placeholder={
            description
              ? description
              : "Describe your non-profit and the work you are doing"
          }
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <select
          className="updateNgo"
          value={newCategory ? newCategory : category}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="selection">Type of nonprofit:</option>
          <option value="animals">Animals</option>
          <option value="children & youth">Children & Youth</option>
          <option value="education & literacy">Education & Literacy</option>
          <option value="environment">Environment</option>
          <option value="health & medicine">Health & Medicine</option>
          <option value="sports & recreation">Sports & Recreation</option>
        </select>
        <input
          type="text"
          className="address"
          placeholder={
            newAddress ? newAddress : "Describe volunteer duties ..."
          }
          value={newAddress ? newAddress : address}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <select
          className="updateNgo"
          value={newDistrict ? newDistrict : district}
          onChange={(e) => setNewDistrict(e.target.value)}
        >
          <option value="district">District:</option>
          <option value="Etobicoke-York">Etobicoke-York</option>
          <option value="North York">North York</option>
          <option value="Toronto">Toronto</option>
          <option value="East York">East York & Scarborough</option>
        </select>
        <Input
          country="CA"
          value={newTelephone ? newTelephone : telephone}
          placeholder={telephone ? telephone : "Phone number"}
          maxLength="14"
          onChange={(e) => setNewTelephone}
        />
        <input
          type="url"
          className="url"
          value={newUrl ? newUrl : url}
          placeholder={url ? url : "https://www.organization.com"}
          onChange={(e) => setNewUrl(e.target.value)}
        />

        <div className="buttons">
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
