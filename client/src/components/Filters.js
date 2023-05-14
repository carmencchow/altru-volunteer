import React, { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { NgosContext } from "../context/NgosContext";
import "./Filters.css";
import axios from "axios";

const Filters = () => {
  const { filters, setFilters } = useContext(FiltersContext);
  const { ngos, setNgos } = useContext(NgosContext);

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleFrequencyChange = (e) => {
    setFilters({ ...filters, frequency: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchNgos();
  };

  const fetchNgos = async () => {
    try {
      const frequency = filters.frequency;
      const category = filters.category;
      const res = await axios.get(
        `https://altru-volunteer-be.onrender.com/api/ngos/${frequency}/${category}`
      );
      setNgos(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="filters">
        <form className="dropdown">
          <p className="commitment">Commitment</p>

          <select value={filters.frequency} onChange={handleFrequencyChange}>
            <option value="all" className="all">
              Any time
            </option>
            <option value="day">One Day Events</option>
            <option value="week">Weekly commitment</option>
            <option value="month">Monthly commitment</option>
          </select>
        </form>

        <form className="dropdown">
          <p className="cause">Cause</p>
          <select value={filters.category} onChange={handleCategoryChange}>
            <option value="all" className="allf">
              Any Cause
            </option>
            <option value="animals">Animals</option>
            <option value="children & youth">Children & Youth</option>
            <option value="education & literacy">Education & Literacy</option>
            <option value="environment">Environment</option>
            <option value="health & medicine">Health & Medicine</option>
            <option value="sports & recreation">Sports & Recreation</option>
          </select>
        </form>
      </div>

      <div className="search-row">
        <button className="searchBtn" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
