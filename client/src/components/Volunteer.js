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
  const { user, setUser } = useContext(AuthContext);
  const { ngos, setNgos } = useContext(NgosContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [confirm, setConfirm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ngoModal, setNgoModal] = useState(null);
  const navigate = useNavigate();

  const toggleModal = (ngo) => {
    console.log("Card opened:", ngo.name, ngo._id);
    setNgoModal(ngo);
    setOpenModal(!openModal);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleNgoSelected = (id) => {
    console.log(`Going to ${id}`);
    navigate(`/info/${id}`);
  };

  useEffect(() => {
    setPageCount(Math.ceil(ngos.length / 4));
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
                <div className="display-container">
                  <div key={ngo}>
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

                        <p>{ngo.help ? <p>Duties: {ngo.help}</p> : null}</p>
                        <p>
                          {ngo.num_volunteers ? (
                            <p>Volunteers needed: {ngo.num_volunteers}</p>
                          ) : null}
                        </p>
                        {ngo.commitment ? (
                          <p>
                            Commitment: {ngo.commitment}
                            {ngo.frequency}
                          </p>
                        ) : null}

                        <p>Tel: {ngo.telephone}</p>
                      </div>
                    </div>

                    {ngo.event === true && (
                      <VolunteerBtn
                        // attending={user?.attending.find(
                        //   (item) => item === ngo._id
                        // )}
                        toggleModal={() => toggleModal(ngo)}
                      />
                    )}

                    {/* <button disabled={disabled} className="follow" onClick={handleFollow}>
                      {(user?.following)?.find(item => item===ngo.name) ? `Following` : `Follow ${ngo.name}`}
                    </button> */}
                  </div>
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
            confirm,
            setConfirm,
          }}
        />
      )}
    </div>
  );
};

export default Volunteer;
