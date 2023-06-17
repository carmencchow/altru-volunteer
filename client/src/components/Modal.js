import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { GrFormClose } from "react-icons/gr";
import { NgosContext } from "../context/NgosContext";
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
  const { getNgo } = useContext(NgosContext);
 
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

      // Decrement volunteer count from ngo
      const response = await api.put(
        `/ngo/${ngoModal._id}/decrement`,
        {
          id: `${ngoModal._id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = response.data;
      console.log("Volunteers:", resData);
      await fetchUserData(user.uid, setMongoUser, token);
      setOpenModal(false);
      await getNgo(ngoModal);
    } catch (err) {
      console.log(err);
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
