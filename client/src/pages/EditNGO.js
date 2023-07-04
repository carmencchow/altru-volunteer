import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";
import Input from "react-phone-number-input/input";
import "./Update.css";

const EditNGO = ({ name }) => {
  const { user, setMongoUser, mongoUser } = useContext(AuthContext);
  const [newName, setNewname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [category, setCategory] = useState("");
  const [commitment, setCommitment] = useState("");
  const [frequency, setFrequency] = useState("");
  const [help, setHelp] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      console.log("getting token");
      await api.put(
        `/user/${user.uid}/editNgo`,
        {
          name: `${newName}`,
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
      await fetchUserData(user.uid, setMongoUser, token);
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
          value={name ? name : newName}
          // placeholder={name}
          onChange={(e) => setNewname(e.target.value)}
        />
        <Input
          country="CA"
          value={telephone}
          placeholder="Phone number"
          type="number"
          maxLength="10"
          onChange={(e) => setTelephone}
        />
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          {" "}
          <p>Volunteer Information:</p>
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
        <input
          type="text"
          className="help"
          placeholder="Describe volunteer position and duties..."
          value={help}
          onChange={(e) => setHelp(e.target.value)}
        />
        <button className="save-btn" onClick={updateProfile}>
          Save Profile
        </button>
      </form>
    </>
  );
};
export default EditNGO;
