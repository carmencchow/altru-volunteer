import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, saveNgoDetails } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMap, BiWorld } from 'react-icons/bi';
import { VscOrganization } from 'react-icons/vsc';
import { FaBullhorn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Filters.css'
import axios from 'axios';

const Filters = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [cause, setCause] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [tag, setTag] = useState('');

  const [ngos, setNgos] = useState([]);
  const ngoState = useSelector(state => state)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  // Pagination buttons
  const handlePrevious = () => {
    console.log('pre page')
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    console.log('next page')
    setCurrentPage(currentPage + 1);
  }

  // Search Filters
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  }

  const handleCauseChange = (e) => {
    setCause(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. updates redux store with selected region and cause
    dispatch(setFilters(region, cause));
    // 2. call this function
    fetchFilteredNgos()
  }

  const handleSaveDetails = () => {
    dispatch(saveNgoDetails(region, cause, name, website, ));   
    navigate('/info')
    console.log('Save NGO details')
  }

  const fetchAllNgos = async () => {
    // Get NGOs from server
    const res = await axios.get('http://localhost:5000/api/ngos/');
    // Display in UI
    setNgos(res.data);
  };

  const fetchFilteredNgos = async () => {
    // 3. Get region and cause values from Redux store
    const location = ngoState.filters.region
    const cause = ngoState.filters.category
    // 4. Get NGOS from server
    const res = await axios.get(`http://localhost:5000/api/ngos/${location}/${cause}`);    
    // 5. Update the NGO list in UI
    setNgos(res.data);
    console.log(res.data.location);
  };

  // Update the page count state whenever the NGO list is updated
  useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/5)); // Total number of pages
  }, [ngos.length], // Length of NGO list chnages
  )

  // Display list of NGOs when page loads for the first time
  useEffect(() => {
    fetchAllNgos(); 
  }, [],  
  );

  // Update state with new state below: 
  return (
    <div>

    <h1 className="h1"><FaBullhorn className="cta"/><Link to="/cards">Featured NGOs: Urgent and Active Campaigns</Link></h1>
      
    <div className="filters-headings">
      <h2>Find a non-profit</h2>
      <h2>Search by region or cause</h2>
    </div>
        
    <div className="filters">
      <div className="filters-row">

        <div className="searchbar">
          <AiOutlineSearch/>
           <input type="text"
            className="searchbar"
            placeholder="Search Nonprofits" 
            value={search}
            onChange={handleSearchChange}
          />
        </div>
       
      <div className="menus">

          <form className="dropdown">
            <select value={region} onChange={handleRegionChange}>  
              <option value="all">--- Region ---</option>
              <option value="South America">South America</option>
              <option value="Asia">Asia</option>
              <option value="Middle East">Middle East</option>
              <option value="Africa">Africa</option>
            </select>
          </form>

          <form className="dropdown">
            <select value={cause} onChange={handleCauseChange}>
              <option value="all">--- Cause ---</option>
              <option value="animal welfare">Animal Welfare</option>
              <option value="children">Children</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="hunger">Hunger</option>
              <option value="women">Women</option>
            </select>
          </form>
        </div>

        <button className="search" onClick={handleSubmit}>Search</button>
    
      </div>
    </div>

    {/* Pagination */}
    <div className="pagination">
      <button disabled={currentPage === 1} className="previous" onClick={handlePrevious}>Previous</button>
      <p>{currentPage}/{pageCount}</p>
      <button disabled={currentPage === pageCount} className="next" onClick={handleNext}>Next</button> 
    </div>

    <div className="display">
      <div className="heading">
        <p>Organizations</p>
      </div>

      {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo, idx) => {
        return (
          <div className="display-container">
            <div key={idx} className="row">
              <p className="name">{ngo.name}</p>
              <p className="location"><BiMap/>{ngo.location[0].toUpperCase()}</p>

            <div className="rightside">
              <button className="infoBtn" onClick={handleSaveDetails}><VscOrganization/>Profile</button>        
              <button className="websiteBtn" onClick={() => {
                window.open(`${ngo.website}`);
              }}><BiWorld className="icon"/>Website</button>
            </div>
            </div> 
          </div> 
          )
        })}
        </div> 
      </div>
    );
  };

export default Filters;








