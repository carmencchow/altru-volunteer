import React from 'react'
import './Home.css'
import child from '../assets/child.jpg';

const Home = () => {
  return (
    <section className="container">
      <div className="main-section">
        <div className="wrapper">
          <div className="left">
            <div className="text">Altru</div>
              <p className="description">Ut perferendis cumque et necessitatibus sint est minus necessitatibus aut nostrum dolores. </p>
            </div>
            <div className="right">
            <img src={child} style={{width: 600, height: 500 }} alt="volunteer" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home