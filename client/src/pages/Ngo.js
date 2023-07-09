import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import AmountBtn from "../components/AmountBtn";
// import Form from "../components/Form";
import FollowBtn from "../components/FollowBtn";
import logo from "../assets/altru.png";
import { api } from "../utils/axios";
import "./Ngo.css";

const Ngo = () => {
  const navigate = useNavigate();
  const { user, setMongoUser } = useContext(AuthContext);
  const { id } = useParams();
  const [ngo, setNgo] = useState({});
  const [isDonating, setIsDonating] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("0");
  const amounts = [10, 15, 25, 50, 75];
  let total = 0;

  const fetchNgo = async () => {
    const token = await user.getIdToken();
    const res = await api.get(`/ngo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNgo(res.data);
  };

  const handleConfirmation = async () => {
    try {
      const token = await user.getIdToken();
      console.log(
        "Publishable Key:",
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );
      await api.post(
        `/user/${user.uid}/donation`,
        // `/ngo/donate/${ngo._id}`,

        {
          ngoId: `${ngo._id}`,
          amount: `${clickedBtn}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserData(user.uid, setMongoUser, token);
      setIsDonating(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePayment = async () => {
    handleConfirmation();
    const token = await user.getIdToken();
    const body = {
      token,
      total,
    };

    await api.post("/payment", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsDonating(false);
    console.log("closing");
  };

  useEffect(() => {
    fetchNgo();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <span className="back" onClick={() => navigate(-1)}>
          Back
        </span>

        {isDonating && (
          <div className="donation-card">
            <p>Select an amount to donate: </p>

            <div className="donation-options">
              {amounts.map((amount, idx) => {
                return (
                  <AmountBtn
                    key={idx}
                    amount={amount}
                    clickedBtn={clickedBtn}
                    setClickedBtn={setClickedBtn}
                  />
                );
              })}
              <StripeCheckout
                className="stripe-btn"
                stripeKey="pk_test_51L1kSgAoNhpouPlcKhLQKANoLZIUKTvg6C2sNBHmBUlpAjYAD5SyZ4sKgTxSB3De9wi0hLyAMAaok6rMEcGqaEhH00Ukq7JyfZ"
                image={logo}
                token={handlePayment}
                name="Making a donation"
                amount={total * 100}
              />
            </div>
          </div>
        )}

        <div className="about-section">
          <div className="row">
            <h2>NGO Name: {/* {mongoUser.organization.name} */}</h2>
          </div>
          <p>
            About:
            {/* {mongoUser.organization.description} */}
          </p>
          <div className="background-image">NGO's background image</div>
          <div className="info">
            <p>
              <span>Location:</span>
              {/* {mongoUser.organization.address},{mongoUser.organization.district}, */}
              Toronto
            </p>
            <p>
              <span>Tel</span>
              {/* {mongoUser.organization.telephone} */}
            </p>

            <p>
              <span>Cause: </span>
              {/* {mongoUser.organization.category} */}
            </p>
            <p>
              <span>URL:</span>
              {/* {mongoUser.organization.url} */}
            </p>
          </div>
        </div>
      </div>

      <div className="button-row">
        <button onClick={() => setIsDonating(true)} className="donate">
          {" "}
          Donate{" "}
        </button>
        <FollowBtn classa ngo={ngo} />
      </div>

      {/* {isDonating && (
        <div className="donation-card">
          <p>Select an amount to donate: </p>

          <div className="donation-options">
            {amounts.map((amount, idx) => {
              return (
                <AmountBtn
                  key={idx}
                  amount={amount}
                  clickedBtn={clickedBtn}
                  setClickedBtn={setClickedBtn}
                />
              );
            })}
          </div>

          <div className="process">
            <StripeCheckout
              className="stripe-btn"
              stripeKey="pk_test_51L1kSgAoNhpouPlcKhLQKANoLZIUKTvg6C2sNBHmBUlpAjYAD5SyZ4sKgTxSB3De9wi0hLyAMAaok6rMEcGqaEhH00Ukq7JyfZ"
              image={logo}
              token={handlePayment}
              name="Donating"
              amount={total * 100}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Ngo;
