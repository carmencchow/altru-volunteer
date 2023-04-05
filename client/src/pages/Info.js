import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import { GrFormClose } from "react-icons/gr";
import Profile from '../components/Profile'
import Navbar from '../components/Navbar'
import { RxAvatar } from 'react-icons/rx'
import axios from 'axios'
import './Info.css'

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ favorite, setFavorite ] = useState('');
  const [ favorites, setFavorites ] = useState([]);
  const [ amount, setAmount ] = useState(0);
  const [ currentNgo, setCurrentNgo ] = useState({
    _id: '',       
    name: '',
    category: [],
    location: [],
    website: '',
    tag: '' 
  });

  // const toggleDrawer = () => {
  //   setDrawer(!drawer)
  // }

  const handleAmount = () => {
    
  }

  const addToFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
      console.log(`Adding '${res.data.name}' to favorites list`)
      if (!favorites.includes(res.data.name)){
        setFavorite(res.data.name)  
        setFavorites([...favorites, res.data.name])
        toast.success(`${res.data.name} added to favorites`) 
        console.log('Favorites list:', favorite, favorites)
      } else {
        toast.success(`${res.data.name} removed from favorites`)
        setFavorites([...favorites.filter((ngo) => ngo !==res.data.name)])
      }
    } catch (err) {
      console.log(err)
    }

    // try {
    //   const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    //   console.log(`Adding '${res.data.name}' to favorites list`)
    //   if (!favorite.includes(res.data.name)){
    //     favorites.push(favorite)
    //     setFavorite([...favorite, res.data.name])
    //     console.log('Favorites list:', favorite, favorites)
    //   } else {
    //     toast.success(`${res.data.name} removed from favorites`)
    //     console.log(`${res.data.name} removed from favorites`)  
    //     setFavorite([...favorite.filter((ngo) => ngo !==res.data.name)])
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
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
      <Profile/>
      {/* <div className="drawer-btn" onClick={toggleDrawer}>
        <Profile/>Profile      
        <GrFormClose className="close-button" onClick={toggleDrawer}/>
      </div> */}

      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <h3>{currentNgo.name}</h3> 
        <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      </div>
        <p>About us: {currentNgo.tag}</p>        
      <div className="url" onClick={() => { window.open(`${currentNgo.website}`)}}>
        {currentNgo.website}
     
      <div className="info-links">
        <span className="goal">Follow</span> 
        <span className="favorite">Set a goal</span> 
      </div>

      <div className="donation-card">
        <h3>Make a donation: </h3>

        <div className="donation-amount">
          <p>$20</p>
          <p>$25</p>
          <p>$50</p>
          <p>$70</p>
          <p>Other</p>
        <div/>
      
        <input 
          type="text" 
          className="input"
          value={amount}
          onChange={handleAmount}/>                    
                    
        <button>Process</button>
      </div> 

      </div>
      </div>
    </div>

    )
  }

export default Info