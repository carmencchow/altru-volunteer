import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setRegionFilter } from '../redux/actions'
import Display from '../components/Display'
import './Filters.css'

const Filters = () => {
  const [region, setRegion] = useState('');
  const dispatch = useDispatch();  

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    console.log('Region is:', e.target.value);
  }

  const handleRegionSubmit = (e) => {
    e.preventDefault();
    dispatch(setRegionFilter(region));
  }

  return (
    <div>
      <h1>REGIONS</h1>

      <form>
        <select value={region} onChange={handleRegionChange}>  
          <option value="">Region</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Middle East">Middle East</option>
          <option value="Africa">Africa</option>
        </select>
        <button onClick={handleRegionSubmit}>Search</button>
      </form>

    <h1>Display Regional NGOS</h1>

      {/* <Display/> */}

      </div>
    );
  };

export default Filters;