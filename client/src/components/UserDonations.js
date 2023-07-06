import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EditGoal from "./EditGoal";
import "./UserDonations.css";

const UserDonations = () => {
  const { mongoUser } = useContext(AuthContext);
  const [openInput, setOpenInput] = useState(false);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h2>Donation history </h2>

          <h4>Goal Amount: ${mongoUser.goalAmount}</h4>

          <div className="goal-input">
            <EditGoal
              openInput={openInput}
              closeInput={() => {
                setOpenInput(false);
              }}
            />

            {!openInput ? (
              <div
                className="edit-amount"
                onClick={() => {
                  setOpenInput(true);
                }}
              >
                <button className="edit-btn">Edit</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {mongoUser.goalAmount && (
          <div className="donation-container">
            <div className="heading">
              <p className="text">Amount</p>
              <p className="text">Organization</p>
              <p className="text">Date</p>
            </div>

            <div className="donated-amounts">
              {mongoUser.donations.map((donation, idx) => (
                <div key={idx} className="donations">
                  <span className="amount-span">${donation.amount}</span>
                  <span>{donation.ngoName}</span>
                  <span>{String(donation.date).slice(0, 10)}</span>
                </div>
              ))}
            </div>

            <h4>
              Total amount donated:
              <p className="amount-donated">
                $
                {mongoUser.donations
                  .map((donation) => Number(donation.amount))
                  .reduce((a, b) => a + b, 0)}
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
              </p>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDonations;
