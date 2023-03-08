import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import { AiOutlineHeart } from 'react-icons/ai';
import './Info.css'

const Info = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const addToFavorites = () => {
    console.log("adding org to favorite")
  }

  // Display Organization's name HOW?
  return (
    <div>
      <Navbar/>
      <div> 
        <h1>Organization/Non-Profit Profile</h1>
        <div className="fave-list">
          <div className="heart" ><p class="heart-text">Add to favourites</p><AiOutlineHeart onClick={addToFavorites}/></div>
        </div>
      </div>

      <div className="contact">
        <p>NAME: {props.name}</p>
        {/* <p>City {props.location}</p> */}
        <p>Telephone</p>
        {/* <p>Website {props.website}</p> */}
        <p>Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo an</p>

        <div className="info-links">
          <span className="donate" onClick={() => setOpenModal(true)} >Donate</span>
          <span className="following">Follow</span> 
        </div>

        <DonationModal 
          open={openModal} 
          onClose={() => setOpenModal(false)}/>
      </div>

    </div>
  )
}

export default Info