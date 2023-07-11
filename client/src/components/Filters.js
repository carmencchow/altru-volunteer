import React, { useContext, useState } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { NgosContext } from "../context/NgosContext";
import { AuthContext } from "../context/AuthContext";
import "./Filters.css";
import { api } from "../utils/axios";

const Filters = () => {
  const { filters, setFilters } = useContext(FiltersContext);
  const { setNgos } = useContext(NgosContext);
  const { user, verifyUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [events, setEvents] = useState(null);
  const [serverError, setServerError] = useState("");

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleDistrictChange = (e) => {
    setFilters({ ...filters, district: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchNgos();
  };

  const fetchNgos = async () => {
    try {
      const district = filters.district;
      const category = filters.category;
      const token = await user.getIdToken();
      const res = await api.get(`/ngo/${district}/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNgos(res.data);
      console.log(res.data);
      await verifyUser(user);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const token = await user.getIdToken();
      const res = await api.get(`/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServerError("");
      console.log("Results", res.data);
      setEvents(res.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerError(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="filters">
        <form className="dropdown">
          <p className="commitment">Commitment</p>

          <select value={filters.district} onChange={handleDistrictChange}>
            <option value="all" className="all">
              All of Toronto
            </option>
            <option value="Etobicoke-York">Etobicoke-York</option>
            <option value="North York">North York</option>
            <option value="Toronto">Toronto</option>
            <option value="East York">East York & Scarborough</option>
          </select>
        </form>

        <form className="dropdown">
          <p className="cause">Cause</p>
          <select value={filters.category} onChange={handleCategoryChange}>
            <option value="all" className="all">
              All Causes
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

      <button onClick={fetchAllEvents} className="fetch-btn">
        ALL events
      </button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Filters;
