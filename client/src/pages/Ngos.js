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
      <h3 className="find">
        Find hundreds of volunteer opportunities in Toronto
      </h3>
      <p>Use the filters to find an organization by cause/area</p>
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
              <div
                className="display-container"
                onClick={() => handleNgoSelected(ngo._id)}
                key={ngo._id}
              >
                <div className="ngo-name">
                  {ngo.name}
                  <p>
                    {ngo.description}
                    <span className="opportunities"></span>
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
