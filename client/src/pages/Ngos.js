import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NgosContext } from "../context/NgosContext";
import Highlights from "../components/Highlights";
import FollowedOrgs from "../components/FollowedOrgs";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import "./Ngos.css";

const Ngos = () => {
  const { ngos } = useContext(NgosContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const [isShowingHighlights, setIsShowingHighlights] = useState(true);
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

  return (
    <section className="ngos-wrapper">
      <Navbar />
      <div>
        <div className="ngos-heading">
          <p className="marker">👋 Welcome to Volunteer Connect!</p>
          <p className="cta">
            Start your volunteering journey by searching for volunteer
            opportunities with amazing charities in Toronto. You can donate your
            time, skills or money, and contribute to your neighborhood in a
            lasting way. Track your donations, followed organizations and events
            by clicking on your email above to view your profile.
          </p>
          <p></p>
        </div>

        <Filters
          setCurrentPage={setCurrentPage}
          setIsSearching={setIsSearching}
          setIsLoading={setIsShowing}
        />

        {isSearching && (
          <>
            <div className="pagination">
              <div>
                <p className="numResults">Number of results: {ngos.length}</p>
              </div>
              <div className="pagination-buttons">
                <button
                  disabled={currentPage === 1}
                  className="previous"
                  onClick={handlePrevious}
                ></button>
                <p className="currentNum">
                  {currentPage}/{pageCount}
                </p>
                <button
                  disabled={currentPage === pageCount}
                  className="next"
                  onClick={handleNext}
                ></button>
              </div>
            </div>

            <div className="results-heading">
              <p>Opportunity</p>
              <p>Organization</p>
              <p>Cause</p>
              <p>Location</p>
              <p>Date</p>
            </div>

            <div className="display">
              <div className="results-container">
                {ngos
                  ?.slice((currentPage - 1) * 5, currentPage * 5)
                  .map((ngo) => (
                    <div
                      key={ngo._id}
                      onClick={() => handleNgoSelected(ngo._id)}
                    >
                      <div className="results-wrapper">
                        {ngo.events && ngo.events.length > 0 && (
                          <p className="one-event">{ngo.events[0].name}</p>
                        )}
                        <p>{ngo.name}</p>
                        <p>{ngo.category}</p>
                        <p>{ngo.district}</p>
                        {ngo.events && ngo.events.length > 0 && (
                          <p>{ngo.events[0].date}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        <h3 className="show-highlights" onClick={() => setIsShowing(true)}>
          Highlighted Volunteer Opportunities
        </h3>

        {isShowing && <Highlights setIsShowing={setIsShowing} />}
        {isShowing && <FollowedOrgs />}
      </div>
    </section>
  );
};

export default Ngos;
