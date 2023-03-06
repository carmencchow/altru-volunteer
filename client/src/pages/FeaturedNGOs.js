import React from 'react'
import Cards from '../components/Cards'
import './Cards.css'
import './FeaturedNGOs.css'

const FeaturedNGOs = () => {
  return (
    <div>
      <div className="heading">
        <h1 onClick="/features">Featured NGOs</h1>
      </div>
      <Cards/>
    </div>
  )
}

export default FeaturedNGOs