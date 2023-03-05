import React, {useState} from 'react'
import './Card.css'
import afghan from '../assets/afghan-children.jpg';
import chile from '../assets/chile-women.jpg';
import food from '../assets/fooddistribution.jpg';
import ocean from '../assets/ocean-cleanup.jpg';
import vietnam from '../assets/vietnam-children.jpg';
import { BiMap, BiWorld, BiDonateHeart } from 'react-icons/bi';


const Card = () => {
  const [followOrg, setfollowOrg] = useState('')
  const [unfollowOrg, setunfollowOrg] = useState('')

  const follow = () => {
    console.log('Following');
  }

  return (
    <div className="card-container">

      <div className="image">
        <p className="name">Canadian Red Cross</p>
        <img className="image" src={food} alt=""/>
        <button className="followBtn" onClick={follow}>Follow</button>
        <BiWorld/> 
        <BiDonateHeart/>      
        </div>

      <div className="image">
        <p className="name">Canadian Red Cross</p>
        <img className="image" src={ocean} alt=""/>
        <button className="followBtn"onClick={follow}>Follow</button>
      </div>

      <div className="image">
        <p className="name">Canadian Red Cross</p>
        <img className="image" src={chile} alt=""/>
        <button className="followBtn"onClick={follow}>Follow</button>
      </div>

      <div className="image">
        <p className="name">Canadian Red Cross</p>
        <img className="image" src={vietnam} alt=""/>
        <button className="followBtn"onClick={follow}>Follow</button>
      </div>
   </div>

   
  )
}

export default Card