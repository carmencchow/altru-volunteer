import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import { AiOutlineHeart, AiOutlineCalendar } from 'react-icons/ai';
import './Info.css'
import axios from 'axios'

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [currentNgo, setCurrentNgo] = useState({
    _id: '',       
    name: '',
    category: [],
    location: [],
    website: '',
    tag: '' 
  });

  const openCalendar = () => {
    navigate(`/info/${id}`)
    console.log(id)
  }


  const addToFavorites = () => {
    console.log("Adding org to favorite")
  }

  const fetchNgo = async () => {
    const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    setCurrentNgo(res.data)
    console.log(res.data)
  }

  useEffect (() => {
    fetchNgo();
  }, [])

  return (
    <div>
      <Navbar/>
      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <h1>{currentNgo.name}</h1> 

       <div className="fave-list">
    
        <DonationModal 
          open={openModal} 
          onClose={() => setOpenModal(false)}/>

          <div className="heart"><p className="heart-text">Add to favourites</p><AiOutlineHeart onClick={addToFavorites}/></div>

          <div className="favorites-container"></div>
        </div>
      </div>

      <div className="contact">
        <p>CAUSE: {currentNgo.category}</p> 
        <p>ABOUT US: {currentNgo.tag}</p>
        <br></br>        
        <p>{currentNgo.website}</p> 
        <br></br>

        <div className="info-links">
          <span className="donate" onClick={() => setOpenModal(true)} >Donate</span>
          <span className="following">Follow</span> 
          <span className="volunteer"><AiOutlineCalendar onClick={openCalendar}></AiOutlineCalendar>Volunteer</span>

          {/* Number of people  */}
        </div>

      </div>

    </div>
  )
}

export default Info