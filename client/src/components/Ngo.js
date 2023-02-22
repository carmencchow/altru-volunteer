import React from 'react'

const Ngo = ({ ngo }) => {
  const { name, website, tag, location } = ngo;
  
  return (
    <div className="ngo-info">
      <p key={ngo._id}>{name}</p>
      <p>{website}</p>
      <p>{tag}</p>
      <p>{location}</p> 
    </div>
    )
  }

export default Ngo