import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import Input from "react-phone-number-input/input";
import "./EditNGO.css";

const EditNGO = ({ setIsEditing }) => {
  const { user, verifyUser } = useContext(AuthContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState();
  const [telephone, setTelephone] = useState();
  const [url, setUrl] = useState();
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

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api
        .post(`/image`, {
          // crossDomain: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Accept: "application/json",
            // "Access-Control-Allow-Origin": "*",
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
