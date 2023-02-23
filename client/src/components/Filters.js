import React, { useState } from 'react'
import './Filters.css'

const Filters = () => {
  
  const [query, setQuery] = useState('');
  const [cause, setCause] = useState('');
  const [region, setRegion] = useState('');
  const [donate, setDonate] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = () => {
    console.log('Submit button clicked by user')
  }

  return (
    <main>
      <div className="search">
        <input 
          type="text" 
          value={query} 
          placeholder="Search for an organization"/>
        <button type="submit" onClick={handleSubmit}>Search</button>
      </div>

      <form>
        <select> 
          <option value="">Causes</option>  
          <option value="Animal">Animal</option>
          <option value="Water">Water</option>
          <option value="Hunger">Hunger</option>
        </select>
      </form>
    
      <form>
        <select> 
          <option value="">Women's Rights</option>  
          <option value="Animal">Education</option>
          <option value="Water">Gender-based Violence</option>
          <option value="Hunger">Micro-finance</option>
          <option value="Hunger">Under representation</option>
        </select>
      </form>

      <form>
        <select> 
          <option value="">Region</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
        </select>
      </form>

      <form>
        <select> 
          <option value="">Donate</option>
          <option value="volunteer">Volunteer</option>
          <option value="either">Either</option>
          <option value="both">Both</option>
        </select>
      </form>
       

    </main>
    );
  };

export default Filters;