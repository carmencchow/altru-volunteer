import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/axios";
import "./NgoDonations.css";

const NgoDonations = () => {
  const [donations, setDonations] = useState(null);
  const { user, mongoUser } = useContext(AuthContext);

  const fetchDonations = async (ngoId) => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`ngo/${ngoId}/donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Donations:", res.data);
      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mongoUser.organization) {
      fetchDonations(mongoUser.organization._id);
    }
  }, [user]);

  return (
    <div className="container">
      <div className="stats">
        <div className="donation-history">
          <h2 className="donors-heading">
            🪙 Donations made to your organization
          </h2>
          <div className="donations-row">
            <p>Individual Donations:</p>
          </div>
        </div>
        {donations && (
          <div className="donated-amounts">
            {donations.map((donation, idx) => (
              <div key={idx} className="donations">
                <p className="amount-span">${donation.amount}.00</p>
                <p className="first-name">{donation.donor.firstname}</p>
                <p>{donation.donor.lastname}</p>
                <p className="date">{String(donation.date).slice(0, 10)}</p>
              </div>
            ))}
          </div>
        )}
        <p className="total">
          Total amount donated:
          <span className="total-amt">
            $
            {donations &&
              donations
                .map((donation) => Number(donation.amount))
                .reduce((a, b) => a + b, 0)}
            .00
          </span>
        </p>
      </div>
    </div>
  );
};

export default NgoDonations;
