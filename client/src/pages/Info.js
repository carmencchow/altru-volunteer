import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import { AiOutlineHeart } from 'react-icons/ai';

const Info = () => {
  const [openModal, setOpenModal] = useState('false');
  const [closeModal, setCloseModal] = useState('true');

  const handleBack = () => {}

  const addToFavorites = () => {
    console.log("adding org to favorite")
  }

  const handleModal = () => {
    console.log('Open donation modal')
    setOpenModal(true);
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


        <button 
          onClick={() => {setOpenModal(true)}}>Donate</button>
      </div>

      {openModal && <DonationModal closeModal={setOpenModal}/>}

    </div>
  )
}

export default Info