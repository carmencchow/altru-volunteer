import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { api } from "../utils/axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [goalAmount, setGoalAmount] = useState(0);
  const [input, setInput] = useState(0);
  const { mongoUser, user, verifyUser } = useContext(AuthContext);

  if (!mongoUser) return null;

  const handleSaveAmount = async () => {
    try {
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
      await verifyUser(user);
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
      await verifyUser(user);
    } catch (err) {
      console.log("Error is: ", err);
    }
  };

  // Unfollow NGO
  const unfollowNgo = async () => {
    // try {
    //   const token = await user.getIdToken();
    //   await api.delete(`/ngo/unfollow/${ngoId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   await verifyUser(user)
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="profile-name">
        <p>👋 Hi, {mongoUser.firstname}!</p>
      </div>
      <div className="profile-section">
        <div className="userprofile"></div>
        <h4>Following:</h4>

        <div className="organizations">
          {mongoUser.ngos &&
            mongoUser.ngos.map((ngo, idx) => (
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

      <div className="donations-section">
        <div className="row">
          <h4>💵 Donations</h4>
          <h4 className="goal-amt">Goal Amount: ${mongoUser.goalAmount}.00</h4>
        </div>
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
            <button
              className="cancel-goal-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="goal-row">
            <button className="goal-btn" onClick={() => setIsEditing(true)}>
              Edit Goal
            </button>
          </div>
        )}
        {mongoUser.donations && (
          <div className="donations-table">
            {mongoUser.donations.map((donation, idx) => (
              <div key={idx} className="donations">
                <p>
                  ${donation.amount}.00 to {donation.ngo.name}
                </p>
                {/* <p>{String(donation.date).slice(0, 10)}</p> */}
                {/* </div> */}
              </div>
            ))}
          </div>
        )}
        <h4>
          Total amount donated:
          <p className="amount-donated">
            $
            {mongoUser.donations
              .map((donation) => Number(donation.amount))
              .reduce((a, b) => a + b, 0)}
            .00
          </p>
        </h4>
        <h4>
          Amount needed to reach donation goal:
          <p className="amount-needed">
            $
            {mongoUser.goalAmount -
              mongoUser.donations
                .map((donation) => Number(donation.amount))
                .reduce((a, b) => a + b, 0)}
            .00
          </p>
        </h4>{" "}
      </div>

      <div className="events-section">
        <h4>🗓️ Upcoming Events</h4>
        {mongoUser.events &&
          mongoUser.events.map((event, idx) => (
            <div className="list" key={idx}>
              <div className="place">
                <p>Event: {event.name}</p>
                <p>NGO: {event.ngo.name}</p>
                <div className="date">
                  <p>
                    Location: <span>{event.location}</span>
                  </p>
                  <p>
                    Date: <span>{event.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;
