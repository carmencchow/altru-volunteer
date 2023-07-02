import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EditGoal from "./EditGoal";
import "./OrganizationDonations.css";

const OrganizationDonations = () => {
  const { mongoUser } = useContext(AuthContext);
  const [openInput, setOpenInput] = useState(false);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h2>Donations & Donors </h2>
        </div>
        {/* {mongoUser.goalAmount && (
          <div className="donation-container">
            <div className="heading">
              <p className="text">Amount</p>
              <p className="text">Donor</p>
            </div>

            <div className="donated-amounts">
              <div className="amount">
                {mongoUser.donations.map((donation, idx) => (
                  <div key={idx}>${donation} </div>
                ))}
              </div>
              <div className="ngo">
                {mongoUser.ngos.map((ngo, idx) => (
                  <div key={idx}>{ngo}</div>
                ))}
              </div>
            </div>

            <h4>
              Total amount donated:
              <p className="amount-donated">
                ${mongoUser.donations.map(Number).reduce((a, b) => a + b, 0)}
              </p>
            </h4>

          </div>
        )} */}
      </div>
    </div>
  );
};

export default OrganizationDonations;
