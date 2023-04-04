import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

const Main = () => {
  const navigate = useNavigate();

  const volunteer = () => {
    navigate('/volunteer');
  }

  const donate = () => {
    navigate('/donate');
  }

  return (
    <div>
      <h1>Welcome to Altru!</h1> 

      <h2>Find Nonprofits to donate to or volunteer events </h2>

      <button onClick={volunteer}>I am interested in volunteering</button>
      <button onClick={donate}>I am interested in donating</button>
  
    </div>
  )
}

export default Main