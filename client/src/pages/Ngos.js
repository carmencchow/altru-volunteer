import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { NgosContext } from "../context/NgosContext";
// import VolunteerBtn from "../components/VolunteerBtn";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import "./Ngos.css";

const Ngos = () => {
  // const { mongoUser } = useContext(AuthContext);
  const { ngos } = useContext(NgosContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ngoModal, setNgoModal] = useState(null);
  const navigate = useNavigate();

  // const toggleModal = (ngo) => {
  //   setNgoModal(ngo);
  //   setOpenModal(!openModal);
  // };

  const handlePrevious = () => {
    console.log("previous page");
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    console.log("next page", currentPage);
    setCurrentPage(currentPage + 1);
  };

  const handleNgoSelected = (id) => {
    navigate(`/ngo/${id}`);
  };

  useEffect(() => {
    setPageCount(Math.floor(ngos.length / 4));
  }, [ngos.length]);

  return (
    <div>
      <Navbar />
      <h3 className="find">Find volunteer opportunities:</h3>
      <Filters />

      {ngos && currentPage !== pageCount ? (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            className="previous"
            onClick={handlePrevious}
          ></button>
          <button
            disabled={currentPage === pageCount + 1}
            className="next"
            onClick={handleNext}
          ></button>
        </div>
      ) : (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            className="previous"
            onClick={handlePrevious}
          ></button>
        </div>
      )}

      <div className="display">
        <div className="results-container">
          {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo) => {
            return (
              <div className="display-container" key={ngo._id}>
                <div
                  className="ngo-name"
                  onClick={() => handleNgoSelected(ngo._id)}
                >
                  {ngo.name}
                  <p>{ngo.description}</p>
                  <p>{ngo.address}</p>
                  <p>{ngo.location}</p>
                  <p>{ngo.telephone}</p>
                  <p>{ngo.contact}</p>
                </div>

                {/* <div className="show-details">
                  <div>
                    {ngo.length > 0 && (
                      <div className="single-events">
                        {ngo.map((event, idx) => (
                          <div key={idx}>
                            <p>Name: {event.name}</p>
                            <p>{event.location}</p>
                            <p>{event.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
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
                        Commitment: {ngo.commitment} hours /{ngo.frequency}
                      </p>
                    ) : null}

                    {ngo.telephone ? <p>Tel: {ngo.telephone}</p> : null}
                  </div>
                </div>

                {ngo.event === true &&
                  mongoUser.isOrganizer &&
                  mongoUser.isOrganizer(
                    <p>{ngo.oneDayEvents.numVolunteers}</p>
                  )}

                {ngo.event === true &&
                  mongoUser.isOrganizer &&
                  mongoUser.isOrganizer(
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
                  )} */}
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

export default Ngos;
