import React from 'react'

const Ngo = ({ ngo }) => {
  const { name, website, tag, region } = ngo;
  
  return (
    <div className="ngo-info">
      <p key={ngo._id}>{name}</p>
      <p>{website}</p>
      <p>{tag}</p>
      <p>{region}</p> 
    </div>
    )
  }

export default Ngo