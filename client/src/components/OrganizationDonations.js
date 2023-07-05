import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./OrganizationDonations.css";

const OrganizationDonations = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h2>Donations & Donors </h2>
        </div>

        <div className="donated-amounts">
          {mongoUser.receivingDonations.map((donation, idx) => (
            <div key={idx} className="donations">
              <span className="amount-span">${donation.amount}</span>
              <span>{donation.donor}</span>
              <span>{donation.ngoName}</span>
              <span>{String(donation.date).slice(0, 10)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDonations;
