import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import Navbar from "../components/Navbar";
import "./Profile.css";
import "./Edit.css";
import { api } from "../utils/axios";

const Edit = () => {
  const navigate = useNavigate();
  const { user, setMongoUser } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.put(
        `/user/${user.uid}`,
        {
          firstname: `${firstname}`,
          lastname: `${lastname}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      await fetchUserData(user.uid, setMongoUser, token);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const profile = () => {
    navigate("/profile");
  };

  const handleDelete = async () => {
    await api.delete(`/user/${user.uid}`).then((res) => {
      console.log(`Account deleted`, res.data);
      navigate("/");
    });
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="tabs-container">
          <div className="heading-tabs">
            <div className="tabs active-tabs">
              <div onClick={profile}>My Profile</div>
            </div>
          </div>

          <div className="content-tabs">
            <div className="content active-content">
              <div>
                <h3>User Info</h3>

                <div className="row">
                  <p className="first">First name:</p>
                  <p className="last">Last name:</p>
                </div>

                <div className="row">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={firstname}
                    onChange={handleFirstname}
                  />

                  <input
                    type="lastname"
                    className="form-control"
                    placeholder=""
                    value={lastname}
                    onChange={handleLastname}
                  />
                </div>

                <div className="save-delete-row">
                  <button className="save-btn" onClick={handleUpdate}>
                    Save Changes
                  </button>
                </div>
                <div className="save-delete-row">
                  <button className="delete-btn" onClick={handleDelete}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Edit;
