import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setregionFilter } from '../redux/actions'
import { useNavigate } from 'react-router-dom';
import './Filters.css'
import axios from 'axios';

const Filters = () => {
  const [region, setregion] = useState('');
  const [cause, setCause] = useState('');
  const [ngos, setNgos] = useState([]);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const handleregionChange = (e) => {
    setregion(e.target.value);
    console.log('region is:', e.target.value);
  }

  const handleregionSubmit = (e) => {
    e.preventDefault();
    dispatch(setregionFilter(region));
  }

  const handlecauseSubmit = (e) => {}

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
          <select value={region} onChange={handleregionChange}>  
            <option value="">Region</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Middle East">Middle East</option>
            <option value="Africa">Africa</option>
          </select>
          <button onClick={handleregionSubmit}>Search</button>
        </form>

        <form>
          <select value={cause}>
            <option value="">Cause</option>
            <option value="hunger">Hunger</option>
            <option value="poverty">Poverty</option>
            <option value="education">Education</option>
            <option value="animal welfare">Animal Welfare</option>
            <option value="microfinance">Microfinance</option>
          </select>
          <button onClick={handlecauseSubmit}>Search</button>
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
        </div> 
      </div>
    );
  };

export default Filters;