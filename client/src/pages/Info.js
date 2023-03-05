import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import { AiOutlineHeart } from 'react-icons/ai';
import './Info.css'

const Info = () => {
  const [openModal, setOpenModal] = useState('false');
 
  // const handleModal = () => {
  //   console.log('Open donation modal')
  //   setOpenModal(true);
  // }

  const handleBack = () => {}

  const addToFavorites = () => {
    console.log("adding org to favorite")
  }


  return (
    <div className="details">
      <Navbar/>
      <div className="heading">
        <h3>Organization</h3>
        <AiOutlineHeart onClick={addToFavorites}/>
        <button onClick={handleBack}>Back</button>
        <img src="" alt=""/>  
      </div>

      <div className="contact">
        <p>City</p>
        <p>Telephone</p>
        <p>Website</p>
        <p>Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo an</p>

        <button onClick={() => setOpenModal(true)} className="modalButton">Donate</button>
        <DonationModal open={openModal} onClose={() => setOpenModal(false)}/>
      </div>

    </div>
  )
}

export default Info