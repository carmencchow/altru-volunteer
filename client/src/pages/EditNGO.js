import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import Input from "react-phone-number-input/input";
import "./EditNGO.css";

const EditNGO = ({
  name,
  about,
  url,
  telephone,
  help,
  category,
  frequency,
  commitment,
  setIsEditing,
}) => {
  const { user, setMongoUser } = useContext(AuthContext);
  const [newName, setNewname] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCommitment, setNewCommitment] = useState("");
  const [newFrequency, setNewFrequency] = useState("");
  const [newHelp, setNewHelp] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      await api.put(
        `/user/${user.uid}/editNgo/`,
        {
          name: `${newName}` ? `${newName}` : `${name}`,
          about: `${newAbout}` || `${about}`,
          url: `${newUrl}` || `${url}`,
          telephone: `${newTelephone}` || `${telephone}`,
          category: `${newCategory}` || `${category}`,
          commitment: `${newCommitment}` || `${commitment}`,
          frequency: `${newFrequency}` || `${frequency}`,
          help: `${newHelp}` || `${help}`,
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
          value={newName}
          // value={newName ? newName : name}
          placeholder={name ? name : "Name of non-profit"}
          onChange={(e) => setNewname(e.target.value)}
        />
        <input
          type="text"
          className="about"
          value={newAbout ? newAbout : about}
          placeholder={
            about
              ? about
              : "Describe your non-profit and the work you are doing"
          }
          onChange={(e) => setNewAbout(e.target.value)}
        />
        <input
          type="url"
          className="url"
          value={newUrl ? newUrl : url}
          placeholder={url ? url : "https://www.organization.com"}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Input
          country="CA"
          value={newTelephone ? newTelephone : telephone}
          placeholder={telephone ? telephone : "Phone number"}
          maxLength="14"
          onChange={(e) => setNewTelephone}
        />
        <div>
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
        </div>
        <div className="volunteers">
          <p>Volunteer Information:</p>
        </div>
        <div className="row">
          <select
            className="updateNgo"
            value={newCommitment ? newCommitment : commitment}
            onChange={(e) => setNewCommitment(e.target.value)}
          >
            <option value="hours">Number of hours:</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="10-15">10-15</option>
            <option value="15-20">15+</option>
          </select>
          <select
            className="updateNgo"
            value={newFrequency ? newFrequency : frequency}
            onChange={(e) => setNewFrequency(e.target.value)}
          >
            <option value="time">Frequency:</option>
            {/* <option value="day">just one day</option> */}
            <option value="week">a week</option>
            <option value="month">a month</option>
          </select>
        </div>
        <input
          type="text"
          className="help"
          placeholder={help ? help : "Describe volunteer duties ..."}
          value={newHelp ? newHelp : help}
          onChange={(e) => setNewHelp(e.target.value)}
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
