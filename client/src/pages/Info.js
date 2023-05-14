import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../utils/getUser";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import AmountBtn from "../components/AmountBtn";
import Form from "../components/Form";
import FollowBtn from "../components/FollowBtn";
import logo from "../assets/altru.png";
import "./Info.css";

const Info = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { id } = useParams();
  const [ngo, setNgo] = useState({});
  const [total, setTotal] = useState(0);
  const [clickedBtn, setClickedBtn] = useState("0");
  const [confirmation, setConfirmation] = useState("");
  const amounts = [10, 25, 50, 75, 100];

  const fetchNgo = async () => {
    const res = await axios.get(
      `https://altru-volunteer-be.onrender.com/api/ngos/${id}`
    );
    setNgo(res.data);
  };

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `https://altru-volunteer-be.onrender.com/api/user/${user._id}/donation`,

        {
          id: `${ngo._id}`,
          donation: `${clickedBtn}`,
          name: `${ngo.name}`,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      await getUser(user._id, setUser);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePayment = (token) => {
    handleConfirmation();
    console.log("Payment received");
    const body = {
      token,
      total,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("https://altru-volunteer-be.onrender.com/api/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {})
      .catch((err) => console.log(err));
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
          <span className="header1">
            Don't have time to volunteer with {ngo.name}? Consider donating
            instead.
          </span>
        </div>
      </div>

      <div className="donation-card">
        <p>Select an amount to donate: </p>
        <p className="confirmation">{confirmation}</p>

        <div className="donation-options">
          {amounts.map((amount) => {
            return (
              <AmountBtn
                amount={amount}
                clickedBtn={clickedBtn}
                setClickedBtn={setClickedBtn}
              />
            );
          })}
        </div>

        <Form />

        <div className="process">
          <StripeCheckout
            stripeKey="pk_test_51L1kSgAoNhpouPlc1wUQc6a3zAxdhzv9hXazyvrYZa1beIP9okC7mpVZAI4hWioLXHaAYwxqtNsQnNJowellghHP00AhoZshJu"
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
