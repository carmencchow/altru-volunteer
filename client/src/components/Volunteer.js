import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NgosContext } from "../context/NgosContext";
import VolunteerBtn from "../components/VolunteerBtn";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import "./Volunteer.css";

const Volunteer = () => {
  const { mongoUser } = useContext(AuthContext);
  const { ngos } = useContext(NgosContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ngoModal, setNgoModal] = useState(null);
  const navigate = useNavigate();

  const toggleModal = (ngo) => {
    setNgoModal(ngo);
    setOpenModal(!openModal);
  };

  const handlePrevious = () => {
    console.log("previous page");
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    console.log("next page");
    setCurrentPage(currentPage + 1);
  };

  const handleNgoSelected = (id) => {
    navigate(`/info/${id}`);
  };

  useEffect(() => {
    setPageCount(Math.floor(ngos.length / 4));
  }, [ngos.length]);

  return (
    <div>
      <Navbar />
      <h3 className="find">Find volunteer opportunities:</h3>
      <Filters />

      {ngos && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            className="previous"
            onClick={handlePrevious}
          ></button>
          <button
            disabled={currentPage === pageCount}
            // disabled={currentPage === pageCount - 1}
            className="next"
            onClick={handleNext}
          ></button>
        </div>
      )}

      <div className="display">
        <div className="results-container">
          {ngos
            ?.slice((currentPage - 1) * 5, currentPage * 5)
            .map((ngo, idx) => {
              return (
                <div className="display-container" key={ngo._id}>
                  <div
                    className="ngo-name"
                    onClick={() => handleNgoSelected(ngo._id)}
                  >
                    {ngo.name}
                  </div>
                  <div className="show-details">
                    <div>
                      {ngo.event_description ? (
                        <p className="event">{ngo.event_description}</p>
                      ) : null}
                      {ngo.event_date ? <p>Date: {ngo.event_date}</p> : null}
                      {ngo.event_time ? <p>Time: {ngo.event_time}</p> : null}

                      <div>{ngo.help ? <p>Duties: {ngo.help}</p> : null}</div>
                      <div>
                        {ngo.num_volunteers ? (
                          <p>Volunteers needed: {ngo.num_volunteers}</p>
                        ) : null}
                      </div>
                      {ngo.commitment ? (
                        <p>
                          Commitment: {ngo.commitment}
                          {ngo.frequency}
                        </p>
                      ) : null}

                      {ngo.telephone ? <p>Tel: {ngo.telephone}</p> : null}
                    </div>
                  </div>

                  {ngo.event === true &&
                    mongoUser.userType === "individual" && (
                      <VolunteerBtn
                        className="volunteer-btn"
                        attending={
                          mongoUser.attending &&
                          mongoUser.attending.find((item) => {
                            return item._id === ngo._id;
                          })
                            ? true
                            : false
                        }
                        toggleModal={() => toggleModal(ngo)}
                      />
                    )}
                </div>
              );
            })}
        </div>
      </div>

      {openModal && (
        <Modal
          {...{
            openModal,
            setOpenModal,
            ngoModal,
            setNgoModal,
            confirmMessage,
            setConfirmMessage,
          }}
        />
      )}
    </div>
  );
};

export default Volunteer;
