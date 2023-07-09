import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import Navbar from "../components/Navbar";
import { api } from "../utils/axios";
import UserEvents from "../components/UserEvents";
import UserDonations from "../components/UserDonations";
import "./UserProfile.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [goalAmount, setGoalAmount] = useState(0);
  const [input, setInput] = useState(0);
  const navigate = useNavigate();
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);

  if (!mongoUser) return null;

  // Add donation goal
  const saveGoal = (e) => {
    const fixed = parseFloat(e.target.value).toFixed(2).toString();
    if (fixed.length < parseFloat(e.target.value).toString().length)
      e.target.value = fixed;
    setInput(e.target.value);
  };

  const handleSave = async () => {
    try {
      console.log("New goal amount is", input);
      const token = await user.getIdToken();
      await api.put(
        `/user/${user.uid}/amount`,
        {
          goalAmount: `${input}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInput("");
      setIsEditing(false);
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (err) {
      console.log("Error is: ", err);
    }
  };

  // Unfollow NGO
  const handleUnfollow = async (follow) => {
    try {
      console.log(follow);
      const token = await user.getIdToken();
      const res = await api.post(
        `/user/${user.uid}/unfollow/ngo`,
        {
          remove: `${follow}`,
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="user-profile">
        <div className="user-row">
          <div>
            <h3>
              {mongoUser.firstname}
              {mongoUser.lastname}
            </h3>
          </div>
          <div className="donations-section">
            <h4>Goal Amount: ${mongoUser.goalAmount}</h4>
            {isEditing ? (
              <div className="goal-input">
                <input
                  type="number"
                  className="goal-input"
                  placeholder="Enter goal amount"
                  min="10"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />

                <button className="save-goal-btn" onClick={handleSave}>
                  Save
                </button>

                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <button className="goal-btn" onClick={() => setIsEditing(true)}>
                Add Goal
              </button>
            )}

            {/* <UserDonations /> */}
          </div>
        </div>

        <h3>Your donations</h3>
        {mongoUser.ngos && (
          <div className="following">
            <h3>Organizations you follow:</h3>

            <div className="organizations">
              {mongoUser.ngos.map((ngo, idx) => (
                <div className="follow-list" key={idx}>
                  {ngo}
                  <button
                    className="unfollow-btn"
                    onClick={async () => await handleUnfollow(ngo)}
                  >
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="events-section">
          <h3>Your Volunteering Events</h3>
          <UserEvents />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
