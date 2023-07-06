import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { GrFormClose } from "react-icons/gr";
// import sgMail from "@sendgrid/mail";
import { api } from "../utils/axios";
import { NgosContext } from "../context/NgosContext";
import "./Modal.css";

// const email = process.env.EMAIL;

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

      // Add event to user
      const res = await api.post(
        `/user/${user.uid}/attend`,
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
      setConfirmMessage("");
      const resData = response.data;
      console.log(res.data.results.attending, resData.num_volunteers);
      await fetchUserData(user.uid, setMongoUser, token);
      await getNgo(ngoModal);
      setOpenModal(false);

      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // const msg = {
      //   to: `${user.email}`,
      //   from: email,
      //   subject: "Confirmation Email from Altru",
      //   text: `Dear ${user.name}! Thanks for registering to the event. Our volunteer coordinator will be in touch with you soon.`,
      //   html: `<h3>Dear ${user.name}!</h3> <p>Thanks for registering to the event. Our volunteer coordinator will be in touch with you soon.<p>`,
      // };

      // sgMail
      //   .send(msg)
      //   .then(() => {
      //     console.log("Email sent");
      //   })
      //   .catch((err) => {
      //     console.err("Error sending email:", err);
      //   });
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
            <p className="event-org">{ngoModal.name}</p>
            <p className="event-org">{ngoModal.oneDayEvents.location}</p>
            <p className="event-org">{ngoModal.oneDayEvents}</p>
            <p className="text">
              Date: <span>{ngoModal.oneDayEvents.date}</span>
            </p>
            <p className="text">
              Time:
              <span>
                {ngoModal.oneDayEvents.startTime} -
                {ngoModal.oneDayEvents.endTime}
              </span>
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
