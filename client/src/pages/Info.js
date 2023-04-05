import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs';
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

  const selectAmount = () => {

  }

  const handleFollow = (e) => {
    console.log(e.target.value)
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
      <Tabs/>

      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <h3>{currentNgo.name}<span className="follow" onClick={handleFollow}>Follow</span> 
        </h3>
        <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      </div>
        <p>About us: {currentNgo.tag}</p>        
      {/* <div className="url" onClick={() => { window.open(`${currentNgo.website}`)}}>
        {currentNgo.website} */}

      <div className="donation-card">
        <h3>Make a donation: </h3>

        <div className="donation-amount">
          <p onClick={selectAmount} value="15">15</p>
          <p onClick={selectAmount} value="25">$25</p>
          <p onClick={selectAmount} value="50">$50</p>
          <p onClick={selectAmount} value="75">$75</p>
          <p onClick={selectAmount} value="100">$100</p>
          <p>Other</p>
        <div/>
      
        <input 
          type="text" 
          className="input"
          value={amount}
          onChange={selectAmount}
        />                    
                    
        <button>Process</button>
      </div> 

      </div>
      </div>
    </div>

    )
  }

export default Info