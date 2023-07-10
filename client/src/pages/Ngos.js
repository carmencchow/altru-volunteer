import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NgosContext } from "../context/NgosContext";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import "./Ngos.css";

const Ngos = () => {
  const { ngos } = useContext(NgosContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();

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
                <div className="ngo-name">
                  {ngo.name}
                  <p>
                    {ngo.description}{" "}
                    <span
                      className="opportunities"
                      onClick={() => handleNgoSelected(ngo._id)}
                    >
                      View Volunteer Opportunities ...
                    </span>
                  </p>
                  <p>{ngo.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ngos;
