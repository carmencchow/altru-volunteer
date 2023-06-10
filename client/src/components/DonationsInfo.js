import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EditGoal from "./EditGoal";
import "./DonationsInfo.css";

const DonationsInfo = () => {
  const { user } = useContext(AuthContext);
  const [openInput, setOpenInput] = useState(false);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h2>Donation history </h2>

          <h4>Goal Amount: ${user.goalAmount}</h4>

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

        {user.goalAmount && (
          <div className="donation-container">
            <div className="heading">
              <p>Amount</p>
              <p>Organization</p>
            </div>

            <p className="donated-amounts">
              <div className="amount">
                {user.donations.map((donation) => (
                  <div>${donation} </div>
                ))}
              </div>
              <div className="ngo">
                {user.ngos.map((ngo) => (
                  <div>{ngo}</div>
                ))}
              </div>
            </p>

            <h4>
              Total amount donated:
              <p className="amount-donated">
                ${user.donations.map(Number).reduce((a, b) => a + b, 0)}
              </p>
            </h4>

            <h4>
              Amount needed to reach donation goal:
              <p className="amount-needed">
                $
                {user.goalAmount -
                  user.donations.map(Number).reduce((a, b) => a + b, 0)}
              </p>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsInfo;
