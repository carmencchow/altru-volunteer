import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../utils/getUser";
import { GrFormClose } from "react-icons/gr";
import "./Modal.css";

const Modal = ({
  confirmMessage,
  setConfirmMessage,
  openModal,
  setNgoModal,
  setOpenModal,
  ngoModal,
}) => {
  const { user, setUser } = useContext(AuthContext);
  const [ngo, setNgo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const fetchNgo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ngos/${ngoModal._id}`
      );
      setNgo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal = (ngoModal) => {
    console.log("Card opened:", ngoModal.name, ngoModal._id);
    setNgoModal(ngoModal);
    setOpenModal(!openModal);
    setDisabled(!disabled);
  };

  const handleRegister = async () => {
    setConfirmMessage(
      "Thank you. We look forward to meeting you at our event!"
    );
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${user._id}/add-event`,
        {
          id: `${ngoModal._id}`,
          title: `${ngoModal.name}`,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConfirmMessage("");
      const data = res.data;
      console.log(
        "Event added to user: ",
        data.results.attending,
        ngoModal._id,
        ngoModal.name
      );
      await fetchNgo(ngoModal._id);
      await getUser(user._id, setUser);
      setOpenModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-popup">
        <div className="modal-content">
          <div className="modal-innercontent">
            <div className="close-btn-row">
              <GrFormClose className="close-btn" onClick={toggleModal} />
            </div>
            <h4 className="message">
              Thank you for your interest in volunteering for this event! Here
              are the event details:
            </h4>
            <p className="event-name">{ngoModal.event_description}</p>
            <p className="event-org">{ngoModal.name}</p>
            <p className="text">
              Date: <span>{ngoModal.event_date}</span>
            </p>
            <p className="text">
              Time: <span>{ngoModal.event_time}</span>
            </p>
            <h5 className="contact">
              Please enter your contact info below and we will get in touch
              shortly
            </h5>

            <div className="contact-info">
              <div className="modal-inputs">
                <input
                  className="modal-input"
                  type="text"
                  name="name"
                  placeholder="  Name"
                />
                <input
                  className="modal-input"
                  type="text"
                  name="email"
                  placeholder="  Email"
                />
              </div>
            </div>

            <div className="button-container">
              <button onClick={() => handleRegister(ngoModal)}>Confirm</button>
              <p className="confirm-msg">{confirmMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
