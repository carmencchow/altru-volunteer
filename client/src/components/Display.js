import React from 'react'
import { useSelector } from 'react-redux'
import './Display.css'

const Display = () => {
  const ngos = useSelector((state) => state.filterItems.ngos)
  console.log(ngos)
    return (    
      <div className="ngo-container">
        {ngos?.map((ngo, idx) => {
          return (
            <div key={idx} className="ngo-card">
              <p className="name">{ngo.name}</p>
              <p className="category">{ngo.category}</p>
              <p className="website">{ngo.website}</p>
            </div> 
          )
        })}
      </div> 
    );
  }

export default Display;

