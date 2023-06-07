import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { GrFormClose } from "react-icons/gr";
import "./Modal.css";
import { api } from "../utils/axios";

const Modal = ({
  confirmMessage,
  setConfirmMessage,
  openModal,
  setNgoModal,
  setOpenModal,
  ngoModal,
}) => {
  const { user, setMongoUser } = useContext(AuthContext);
  const [ngo, setNgo] = useState("");

  const fetchNgo = async () => {
    try {
      const token = await user.getIdToken();
      console.log("NGO is", ngoModal);
      const res = await api.get(`/ngo/${ngoModal._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNgo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal = (ngoModal) => {
    console.log("Card opened:", ngoModal.name, ngoModal._id);
    setNgoModal(ngoModal);
    setOpenModal(!openModal);
  };

  const handleRegister = async () => {
    setConfirmMessage(
      "Thank you. We look forward to meeting you at our event!"
    );
    try {
      const token = await user.getIdToken();
      const res = await api.post(
        `/user/${user.uid}/add-event`,
        {
          id: `${ngoModal._id}`,
          title: `${ngoModal.name}`,
        },
        {
          headers: {
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
      await fetchUserData(user.uid, setMongoUser, token);
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
