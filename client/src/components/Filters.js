import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMap, BiWorld, BiDonateHeart } from 'react-icons/bi';

import './Filters.css'
import axios from 'axios';

const Filters = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [cause, setCause] = useState('');
  const [ngos, setNgos] = useState([]);
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const ngoState = useSelector(state => state)

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  }

  const handleCauseChange = (e) => {
    setCause(e.target.value);
  }

  // user clicks on search button
  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. updates redux store with selected region and cause
    dispatch(setFilters(region, cause));
    // 2. call this function
    fetchFilteredNgos()
  }

  const fetchAllNgos = async () => {
    // get NGOs from server
    const res = await axios.get('http://localhost:5000/api/ngos/');
    // show them in UI
    setNgos(res.data);
  };

  const fetchFilteredNgos = async () => {
    // 3. get region and cause values from Redux store
    const location = ngoState.filters.region
    const cause = ngoState.filters.category
    // 4. get ngos from server
    const res = await axios.get(`http://localhost:5000/api/ngos/${location}/${cause}`);
    // 5. update the NGO list in UI
    setNgos(res.data);
    console.log(res.data.location);
  };

  // Display list of NGOs when page loads for the first time
  useEffect(() => {
    fetchAllNgos(); 
  }, [],  
  );


  // Update state with new state below: 
  return (
    <div>

      <div className="filters">

        <div className="searchbar">
          <div className="input">
            <div className="input-group">
            <AiOutlineSearch/>
            <input type="text" className="searchbar" placeholder="Search Nonprofits" value={search}/>
            </div>
          </div>
        </div>

        <div className="menus">
          <form className="dropdown">
            <select value={region} onChange={handleRegionChange}>  
              <option value="">Region</option>
              <option value="South America">South America</option>
              <option value="Asia">Asia</option>
              <option value="Middle East">Middle East</option>
              <option value="Africa">Africa</option>
              <option value="Cameroon">Cameroon</option>
            </select>
          </form>

          <form className="dropdown">
            <select value={cause} onChange={handleCauseChange}>
              <option value="">Cause</option>
              <option value="hunger">Hunger</option>
              <option value="poverty">Poverty</option>
              <option value="education">Education</option>
              <option value="animal welfare">Animal Welfare</option>
              <option value="microfinance">Microfinance</option>
            </select>
          </form>
          </div>

          <button onClick={handleSubmit}>Search</button>

        </div>

      <div className="display">
        <div className="heading">
          <p>Organizations</p>
        </div>

        {ngos?.map((ngo, idx) => {
          return (
            <div className="display-container">
              <div key={idx} className="row">
                {/* <div className="leftside"> */}
                   <p className="name">{ngo.name}</p>
                   <p className="location"><BiMap/>{ngo.location[0].toUpperCase()}</p>
                {/* </div> */}

                <div className="rightside">
                  <button className="infoBtn" onClick={() => navigate('/info')}><BiDonateHeart className="icon"/>Donate</button>        
                  <button className="websiteBtn" onClick={() => {
                    window.location.replace(`${ngo.website}`)
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