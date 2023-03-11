import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import { AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../redux/actions';
import './Info.css'

const Info = () => {
  const [openModal, setOpenModal] = useState(false);
  const ngos = useSelector((state) => state.details);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToFavorites = () => {
    console.log("Adding org to favorite")
    dispatch(addToFavorites);
  }

  return (
    <div>
      <Navbar/>
      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <h1>Organization Profile</h1>
        <h1>{ngos.name}</h1>
        <h1>{ngos.website}</h1>

       <div className="fave-list">
    
        <DonationModal 
          open={openModal} 
          onClose={() => setOpenModal(false)}/>

          <div className="heart"><p className="heart-text">Add to favourites</p><AiOutlineHeart onClick={addToFavorites}/></div>

          <div className="favorites-container"></div>
        </div>
      </div>

      <div className="contact">
        <p>CAUSE: {ngos.category}</p>
        <p>{ngos.tag} Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo an</p>

        <div className="info-links">
          <span className="donate" onClick={() => setOpenModal(true)} >Donate</span>
          <span className="following">Follow</span> 
          <span className="volunteer">Volunteer</span> 
        </div>
      </div>

    </div>
  )
}

export default Info