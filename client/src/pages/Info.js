import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import AmountBtn from "../components/AmountBtn";
import Form from "../components/Form";
import FollowBtn from "../components/FollowBtn";
import logo from "../assets/altru.png";
import "./Info.css";
import { api } from "../utils/axios";

const Info = () => {
  const navigate = useNavigate();
  const { user, setMongoUser } = useContext(AuthContext);
  const { id } = useParams();
  const [ngo, setNgo] = useState({});
  const [clickedBtn, setClickedBtn] = useState("0");
  const amounts = [10, 25, 50, 75, 100];
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

        {
          id: `${ngo._id}`,
          donation: `${clickedBtn}`,
          name: `${ngo.name}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePayment = async () => {
    // const handlePayment = async (token) => {
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

        <FollowBtn ngo={ngo} />
        <div className="header-text">
          <span className="header1">Want to donate to: {ngo.name}?</span>
        </div>
      </div>

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
        <p>Enter billing information:</p>

        <Form />

        <div className="process">
          <StripeCheckout
            className="stripe-btn"
            // stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            stripeKey="pk_test_51L1kSgAoNhpouPlcKhLQKANoLZIUKTvg6C2sNBHmBUlpAjYAD5SyZ4sKgTxSB3De9wi0hLyAMAaok6rMEcGqaEhH00Ukq7JyfZ"
            image={logo}
            token={handlePayment}
            name="Donating"
            amount={total * 100}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
