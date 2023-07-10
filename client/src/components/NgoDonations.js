import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./NgoDonations.css";

const NgoDonations = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h2>🪙 Donations </h2>
        </div>

        {/* Change to {ngo.donations && ( ... )} */}

        {mongoUser.organization.donations > 0 && (
          // {mongoUser.organization.donations && (
          <div className="donated-amounts">
            {mongoUser.organization.donations.map((donation, idx) => (
              <div key={idx} className="donations">
                <span className="amount-span">${donation.amount}</span>
                <span>
                  {donation.donor.firstname}
                  {donation.donor.lastname}
                </span>
                <span>{String(donation.date).slice(0, 10)}</span>
              </div>
            ))}
          </div>
        )}

        <h4>
          Total amount donated:
          <p className="amount-donated">
            $
            {mongoUser.organization.donations
              .map((donation) => Number(donation.amount))
              .reduce((a, b) => a + b, 0)}
          </p>
        </h4>
      </div>
    </div>
  );
};

export default NgoDonations;
