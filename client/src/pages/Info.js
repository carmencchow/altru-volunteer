import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import { AiOutlineHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import './Info.css'

const Info = () => {
  const [openModal, setOpenModal] = useState(false);

  const ngos = useSelector((state) => state.details)

  const addToFavorites = () => {
    console.log("adding org to favorite")
  }

  return (
    <div>
      <Navbar/>
      <div> 
        <h1>Organization/Non-Profit Profile</h1>

       <div className="fave-list">
    
       <DonationModal 
          open={openModal} 
          onClose={() => setOpenModal(false)}/>

      <div className="heart"><p className="heart-text">Add to favourites</p><AiOutlineHeart onClick={addToFavorites}/></div>
      

      </div>

      </div>

      <div className="contact">
        <p>NAME: {ngos.name}</p>
        <p>TELEPHONE:</p>
        <p>CAUSE: {ngos.category}</p>
        <p>SUMMARY: {ngos.tag} Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo an</p>

        <div className="info-links">
          <span className="donate" onClick={() => setOpenModal(true)} >Donate</span>
          <span className="following">Follow</span> 
        </div>
      </div>

    </div>
  )
}

export default Info