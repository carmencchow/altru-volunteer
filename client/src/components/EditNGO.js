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
  const [image, setImage] = useState("");

  // Convert uploaded image to base64
  const convertToBase64 = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  const uploadImage = async () => {
    try {
      const token = await user.getIdToken();
      await api
        .post(`/image`, {
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            base64: image,
          }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="profile-row">
          <select
            className="ngo-select"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
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
            value={newDistrict}
            onChange={(e) => setNewDistrict(e.target.value)}
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

        <div className="base64">
          <input accept="image/*" type="file" onChange={convertToBase64} />
          <button onClick={uploadImage}>Upload Image</button>
          {image === "" || image == null ? (
            ""
          ) : (
            <img width={100} height={100} src={image} alt="" />
          )}
        </div>
      </form>
    </>
  );
};
export default EditNGO;
