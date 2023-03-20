import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import DonationModal from '../components/DonationModal'
import Navbar from '../components/Navbar'
import { AiOutlineHeart, AiOutlineCalendar } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import './Info.css'

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [favorite, setFavorite] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentNgo, setCurrentNgo] = useState({
    _id: '',       
    name: '',
    category: [],
    location: [],
    website: '',
    tag: '' 
  });
  const favorites = [];
    
  const openCalendar = () => {
    navigate(`/info/${id}`)
    console.log(id)
  }

  const addToFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
      console.log(`Adding '${res.data.name}' to favorites list`)
      if (!favorite.includes(res.data.name)){
        favorites.push(favorite)
        setFavorite([...favorite, res.data.name])
        console.log('Favorites list:', favorite, favorites)
      } else {
        toast.success(`${res.data.name} removed from favorites`)
        console.log(`${res.data.name} removed from favorites`)  
        setFavorite([...favorite.filter((ngo) => ngo !==res.data.name)])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addToToday = () => {
    console.log('Donation added')
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

          <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
          <div className="heart"><p className="heart-text">Add to favourites</p><AiOutlineHeart onClick={addToFavorites}/></div>

        </div>
      </div>

      <div className="contact">
        <p>CAUSE: {currentNgo.category}</p> 
        <p>ABOUT US: {currentNgo.tag}</p>
        <br></br>        
        <div className="url" onClick={() => { window.open(`${currentNgo.website}`)}}>{currentNgo.website}</div>
     
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