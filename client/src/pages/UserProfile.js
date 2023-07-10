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
  // const saveGoal = (e) => {
  //   const fixed = parseFloat(e.target.value).toFixed(2).toString();
  //   if (fixed.length < parseFloat(e.target.value).toString().length)
  //     e.target.value = fixed;
  //   setInput(e.target.value);
  // };

  const handleSaveAmount = async () => {
    try {
      console.log("New goal amount is", input);
      const token = await user.getIdToken();
      const res = await api.post(
        `/user/${user.uid}/goal`,
        {
          goalAmount: `${goalAmount}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data is", res.data);
      setInput("");
      setIsEditing(false);
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (err) {
      console.log("Error is: ", err);
    }
  };

  // Edit goal
  const handleEditAmount = async () => {
    try {
      const token = await user.getIdToken();
      await api.put(
        `/user/${user.uid}/goal`,
        {
          goalAmount: `${goalAmount}`,
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
  const unfollowNgo = async (follow) => {
    try {
      console.log(follow);
      const token = await user.getIdToken();
      await api.post(
        {
          remove: `${follow}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="userprofile">
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
                  placeholder="Enter goal amount"
                  min="10"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />

                <button className="save-goal-btn" onClick={handleSaveAmount}>
                  Save
                </button>

                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <button className="goal-btn" onClick={() => setIsEditing(true)}>
                Add Goal
              </button>
            )}
          </div>
        </div>
        <h3>Your donations</h3>
        {mongoUser.donations && (
          // {mongoUser.donations > 0 && (
          <div className="following">
            {mongoUser.donations.map((donation, idx) => (
              <div key={idx} className="donations">
                <p>${donation.amount}.00</p>
                <p>{donation.ngo.name}</p>
                <p>{String(donation.date).slice(0, 10)}</p>
              </div>
            ))}

            <h3>Organizations you follow:</h3>

            <div className="organizations">
              {mongoUser.ngos.map((ngo, idx) => (
                <div className="follow-list" key={idx}>
                  {ngo.name}
                  <button
                    className="unfollow-btn"
                    onClick={async () => await unfollowNgo(ngo)}
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
