import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./NgoDonations.css";

const NgoDonations = () => {
  const { mongoUser } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h4>Donor List </h4>
        </div>

        <div className="donated-amounts">
          {mongoUser.receivingDonations.map((donation, idx) => (
            <div key={idx} className="donations">
              <span className="amount-span">${donation.amount}</span>
              <span>
                {donation.donor.firstname}
                {donation.donor.lastname}
              </span>
              <span>{donation.ngoName}</span>
              <span>{String(donation.date).slice(0, 10)}</span>
            </div>
          ))}
        </div>

        <h4>
          Total amount donated:
          <p className="amount-donated">
            $
            {mongoUser.receivingDonations
              .map((donation) => Number(donation.amount))
              .reduce((a, b) => a + b, 0)}
          </p>
        </h4>
      </div>
    </div>
  );
};

export default NgoDonations;
