import React, {useState, useEffect} from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'

const Pagination = (ngos) => {  
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }

   useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/4)); 
  }, [ngos.length]) 

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} className="previous" onClick={handlePrevious}><FcPrevious className="arrow"/>Previous</button>
      <button disabled={currentPage === pageCount} className="next" onClick={handleNext}>Next<FcNext className="arrow"/></button> 
    </div>
  )
}

export default Pagination