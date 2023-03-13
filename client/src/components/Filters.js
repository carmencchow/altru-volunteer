import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { saveNgoDetails } from '../redux/actions'; // ** REDUX **
// import { setFilters } from '../redux/actions'; // ** REDUX **
// import { ngoSelected } from '../features/ngoSlice' // ** RTK **
// import { setFilters } from '../features/filtersSlice' // ** RTK **

import { useContext } from 'react'; // ** CONTEXT **
import { FiltersContext } from '../contexts/FiltersContext'; // ** CONTEXT **
import { NgosContext } from '../contexts/NgosContext';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMap, BiWorld } from 'react-icons/bi';
import { VscOrganization } from 'react-icons/vsc';
import { FaBullhorn } from 'react-icons/fa';
import axios from 'axios';
import './Filters.css'

const Filters = () => {
  const { filters, setFilters } = useContext(FiltersContext) 
  const { ngos, setNgos } = useContext(NgosContext)
  // const [region, setRegion] = useState('');
  // const [cause, setCause] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
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

  const handleRegionChange = (e) => {
    setFilters({ ...filters, region: e.target.value }); 
    // Only change value of region to the one user selected
  }

  const handleCauseChange = (e) => {
    setFilters({ ...filters, cause: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(setFilters(region, cause));
    fetchFilteredNgos()
  }

  const handlengoSelected = (id) => {
    // dispatch(saveNgoDetails(region, category, name, website)); // ** REDUX **
    // dispatch(ngoSelected(region, category, name, website)); // ** RTK ** 
    navigate(`/info/${id}`)
    console.log(id)
  }

  const fetchAllNgos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ngos/')  
      setNgos(res.data);
      console.log(res.data);
    } catch (err) {
      setErrorMessage('Unable to fetch list of NGOs')
    } 
  };

  const fetchFilteredNgos = async () => {
    try {
      const location = filters.region 
      const cause = filters.cause 

      // const location = ngoState.filters.region // *** REDUX 
      // const cause = ngoState.filters.category // *** REDUX 
      // const location = filteredNGOs.filters.region // *** RTK 
      // const cause = filteredNGOs.filters.category // *** RTK 

      const res = await axios.get(`http://localhost:5000/api/ngos/${location}/${cause}`);    
      setNgos(res.data);
      console.log(res.data.location);
    } catch (err) {
      setErrorMessage('Unable to fetch results');
    }
  };

  // Update the page count state whenever the NGO list is updated
  useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/5)); // Total number of pages
    }, [ngos.length]) // Length of NGO list chnages
  

  // Display list of NGOs when page loads for the first time
  useEffect(() => {
    fetchAllNgos();
    }, []);

    return (
    <div>

      <h1 className="h1"><FaBullhorn className="cta"/><Link to="/cards">Featured NGOs: Urgent and Active Campaigns</Link></h1>
        
      <div className="filters-headings">
        <h2>Find a non-profit</h2>
        <h2>Search by region or cause</h2>
      </div>
        
      <div className="filters">
        <div className="filters-row">

          {/* <div className="searchbar">
            <AiOutlineSearch/>
            <input type="text"
              className="searchbar"
              placeholder="Search Nonprofits" 
              value={search}
              onChange={handleSearchChange}
            />
          </div> */}
        
        <div className="menus">

            <form className="dropdown">
              <select value={filters.region} onChange={handleRegionChange}>  
                <option value="all">--- All Regions ---</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Middle East">Middle East</option>
                <option value="South America">South America</option>                        
              </select>
            </form>

            <form className="dropdown">
              <select value={filters.cause} onChange={handleCauseChange}>
                <option value="all">--- All Causes ---</option>
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

      <div className="pagination">
        <button disabled={currentPage === 1} className="previous" onClick={handlePrevious}>Previous</button>
        <p>{currentPage}/{pageCount}</p>
        <button disabled={currentPage === pageCount} className="next" onClick={handleNext}>Next</button> 
      </div>

      <div className="display">
        <div className="heading">
          <p>Organizations</p>
        </div>

        <div className="results-container">
          {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo, idx) => {
              return (
                <div className="display-container">
                  <div key={idx} className="row">
                    <p className="name">{ngo.name}</p>
                    <p className="location"><BiMap/>{ngo.location[0].toUpperCase()}</p>
                    <p className="category">{ngo.category}</p>
                    <div className="rightside">
                      <button className="infoBtn" onClick={() => handlengoSelected(ngo._id)}><VscOrganization/>Profile</button>   
                      <button className="websiteBtn" onClick={() => { window.open(`${ngo.website}`)}}><BiWorld className="icon"/>Website</button>
                    </div>          
                  </div> 
                </div> 
                )
              })}
          </div> 
    
      </div>  
    </div>
    )
  }

export default Filters;








