import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setregionFilter } from '../redux/actions'
import Display from '../components/Display'
import './Filters.css'
import axios from 'axios';

const Filters = () => {
  const [region, setregion] = useState('');
  const [cause, setCause] = useState()
  const dispatch = useDispatch();  

  const handleregionChange = (e) => {
    setregion(e.target.value);
    console.log('region is:', e.target.value);
  }

  const handleregionSubmit = (e) => {
    e.preventDefault();
    dispatch(setregionFilter(region));
  }


  return (
    <div>
      <h1>Find an NGO:</h1>

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
        <button onClick={handleregionSubmit}>Search</button>
      </form>


<Display/>
      </div>
    );
  };

export default Filters;