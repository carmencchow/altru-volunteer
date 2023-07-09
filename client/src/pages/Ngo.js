import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import AmountBtn from "../components/AmountBtn";
import logo from "../assets/altru.png";
import { api } from "../utils/axios";
import "./Ngo.css";

const Ngo = () => {
  const navigate = useNavigate();
  const { mongoUser, user, setMongoUser } = useContext(AuthContext);
  const { id } = useParams();
  const [ngo, setNgo] = useState({});
  const [disabled, setDisabled] = useState(false);
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

  const handleFollow = async () => {
    try {
      const token = await user.getIdToken();
      console.log("Following ngo", ngo, ngo.name);
      await api.post(
        // `/user/${user.uid}/follow/ngo`,
        `/ngo/follow/${ngo._id}`,
        {
          ngoId: `${ngo._id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDisabled("Following...");
      await fetchUserData(user.uid, setMongoUser, token);
    } catch (e) {
      console.log(e);
    }
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
          ngoName: `${ngo.name}`,
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

        <div className="about-section">
          <div className="row">
            <h2>{ngo.name}</h2>
            {/* {isDonating && ( */}
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
          </div>
          {/* )} */}
          <div className="background-image">NGO's background image</div>
          <p>Description: {ngo.description}</p>
          <div className="info">
            <p>
              <span>Location:{ngo.location}</span>
              Toronto
            </p>
            <p>
              <span>Tel: {ngo.telephone}</span>
            </p>

            <p>
              <span>Cause: {ngo.category}</span>
            </p>
            <p>
              <span>URL: {ngo.url}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="button-row">
        <button onClick={() => setIsDonating(true)} className="donate">
          Donate
        </button>

        <div>
          <button disabled={disabled} className="follow" onClick={handleFollow}>
            {mongoUser.ngos.find((item) => item === ngo.name)
              ? `Following`
              : `Follow ${ngo.name}`}
          </button>
        </div>
        <div className="row">
          <h2>Volunteer Events</h2>
        </div>
      </div>
    </div>
  );
};

export default Ngo;
