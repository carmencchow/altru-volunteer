import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRegionFilter, setCauseFilter } from '../redux/actions'
import { useNavigate } from 'react-router-dom';
import './Filters.css'
import axios from 'axios';

const Filters = () => {
  const [region, setRegion] = useState('');
  const [cause, setCause] = useState('');
  const [ngos, setNgos] = useState([]);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  }

  const handleCauseChange = (e) => {
    setCause(e.target.value);
  }

  const handleRegionSubmit = (e) => {
    e.preventDefault();
    dispatch(setRegionFilter(region));
  }

  const handleCauseSubmit = (e) => {
    e.preventDefault();
    dispatch(setCauseFilter(cause));
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/ngos');
      setNgos(res.data);
      console.log(res.data);
    };
    fetchData(); 
  }, [])

  return (
    <div>
      <h1>Find an NGO:</h1>

      <div className="filters">
        <form>
          <select value={region} onChange={handleRegionChange}>  
            <option value="">Region</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Middle East">Middle East</option>
            <option value="Africa">Africa</option>
            <option value="Cameroon">Cameroon</option>
          </select>
          <button onClick={handleRegionSubmit}>Search</button>
        </form>

        <form>
          <select value={cause} onChange={handleCauseChange}>
            <option value="">Cause</option>
            <option value="hunger">Hunger</option>
            <option value="poverty">Poverty</option>
            <option value="education">Education</option>
            <option value="animal welfare">Animal Welfare</option>
            <option value="microfinance">Microfinance</option>
          </select>
          <button onClick={handleCauseSubmit}>Search</button>
        </form>
      </div>

      <div className="display">
        <div className="heading">
          <p>Organization</p>
          <p>Cause</p>
          <p>Region</p>
        </div>
        {ngos?.map((ngo, idx) => {
          return (
            <div key={idx} className="row">
              <p className="name">{ngo.name}</p>
              <p className="category">{ngo.category}</p>
              <p className="website">{ngo.website}</p>
              <button onClick={() => navigate('/info')}>Info</button>
            </div> 
            )
          })}

          {/* {region.map((item, id) => {
            return (
              <div key={id} className="row">
                <p className="name">{item.name}</p>
                <p className="category">{item.category}</p>
                <p className="website">{item.website}</p>
                <button onClick={() => navigate('/info')}>Info</button>
              </div> 
              )
            })} */}


        </div> 
      </div>
    );
  };

export default Filters;