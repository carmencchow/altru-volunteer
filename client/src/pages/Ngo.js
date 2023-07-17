import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BsArrowLeftSquare } from "react-icons/bs";
import StripeCheckout from "react-stripe-checkout";
import UnFollowBtn from "../components/UnFollowBtn";
import FollowBtn from "../components/FollowBtn";
import AmountBtn from "../components/AmountBtn";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import { api } from "../utils/axios";
import "./Ngo.css";

const Ngo = () => {
  const navigate = useNavigate();
  const { mongoUser, user, verifyUser } = useContext(AuthContext);
  const { id } = useParams();
  const [ngo, setNgo] = useState({});
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

  // const followNgo = async () => {
  //   try {
  //     const token = await user.getIdToken();
  //     console.log("Following ngo", ngo, ngo.name);
  //     await api.post(
  //       `/ngo/follow/${ngo._id}`,
  //       {
  //         ngoId: `${ngo._id}`,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     toast("Following", `${ngo.name}`);
  //     await verifyUser(user);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const unfollowNgo = async () => {
  //   try {
  //     const userId = mongoUser._id;
  //     console.log("userid", userId, ngo._id);
  //     const token = await user.getIdToken();
  //     await api.put(
  //       `/ngo/unfollow/${ngo._id}`,
  //       {
  //         userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     await verifyUser(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
      await verifyUser(user);
      toast("Thank you for your donation!");
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
  };

  useEffect(() => {
    fetchNgo();
  }, []);

  return (
    <div>
      <Navbar />
      <span className="back" onClick={() => navigate(-1)}>
        <BsArrowLeftSquare />
      </span>
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#b8e981", color: "white" },
        }}
      />
      <div>
        <div className="about-section">
          <div className="ngo-heading">
            <h2>{ngo.name}</h2>
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

          <FollowBtn ngo={ngo} />

          <div className="background-image">
            <p>NGO's background image</p>
          </div>
          <p>Description: {ngo.description}</p>
          <div className="info">
            <p> {ngo.address}</p>
            <p> {ngo.telephone}</p>
            <p> {ngo.url}</p>
          </div>
        </div>
      </div>

      <div>
        <h2>Volunteer Events</h2>
        <div className="ngo-row">
          {ngo && ngo.events && (
            <div className="ngo-events">
              {ngo.events.map((event, idx) => (
                <div key={idx} className="ngo-event-card">
                  <p>⭐ {event.name}</p>
                  <p>📍 {event.location}</p>
                  <p>📅 {event.date}</p>
                  <div className="button-row">
                    <button
                      className="details"
                      onClick={() => {
                        navigate(`/event/${event._id}`);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ngo;
