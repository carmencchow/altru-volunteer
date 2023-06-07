import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EditGoal from "./EditGoal";
import "./DonationsInfo.css";

const DonationsInfo = () => {
  const { mongoUser } = useContext(AuthContext);
  const [openInput, setOpenInput] = useState(false);

  if (!mongoUser) return null;

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
                <button className="edit">Edit</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {mongoUser.goalAmount && (
          <div className="donation-container">
            <p className="heading">
              <p>Amount</p>
              <p>Organization</p>
            </p>

            <p className="donated-amounts">
              <div className="amount">
                {mongoUser.donations.map((donation) => (
                  <div>${donation} </div>
                ))}
              </div>
              <div className="ngo">
                {mongoUser.ngos.map((ngo) => (
                  <div>{ngo}</div>
                ))}
              </div>
            </p>

            <h4>
              Total amount donated:
              <p className="amount-donated">
                ${mongoUser.donations.map(Number).reduce((a, b) => a + b, 0)}
              </p>
            </h4>

            <h4>
              Amount needed to reach donation goal:
              <p className="amount-needed">
                $
                {mongoUser.goalAmount -
                  mongoUser.donations.map(Number).reduce((a, b) => a + b, 0)}
              </p>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsInfo;
