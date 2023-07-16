import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NgosContext } from "../context/NgosContext";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import "./Ngos.css";

const Ngos = () => {
  const { ngos } = useContext(NgosContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
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
    setPageCount(Math.ceil(ngos.length / 5));
  }, [ngos.length]);

  // Display Featured Followed Ngos

  return (
    <div>
      <Navbar />
      <h3 className="find">
        Find hundreds of volunteer opportunities in Toronto. Search volunteer
        opportunities in your city and find how you can make a difference.
      </h3>
      <Filters setCurrentPage={setCurrentPage} />

      <div className="pagination">
        <p className="numResults">Number of results: {ngos.length}</p>
        <button
          disabled={currentPage === 1}
          className="previous"
          onClick={handlePrevious}
        ></button>
        {currentPage}/{pageCount}
        <button
          disabled={currentPage === pageCount}
          className="next"
          onClick={handleNext}
        ></button>
      </div>

      <div className="display">
        <div className="results-heading">
          <p>Opportunity</p>
          <p>Organization</p>
          <p>Cause</p>
          <p>Location</p>
          <p>Date</p>
        </div>

        <div className="results-container">
          {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo) => (
            <div key={ngo._id}>
              <div
                className="results-wrapper"
                onClick={() => handleNgoSelected(ngo._id)}
              >
                {/* <div className="opportunity"> */}
                {ngo.events && ngo.events.length > 0 && (
                  <p>{ngo.events[0].name}</p>
                )}
                {/* </div> */}
                <div className="name-section">
                  <p>{ngo.name}</p>
                </div>
                {/* <div className="results-section"> */}
                <p>{ngo.category}</p>
                {/* </div> */}
                {/* <div className="results-section"> */}
                <p>{ngo.district}</p>
                {/* </div> */}
                {/* <div className="results-section"> */}
                {ngo.events && ngo.events.length > 0 && (
                  <p>{ngo.events[0].date}</p>
                )}
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ngos;
