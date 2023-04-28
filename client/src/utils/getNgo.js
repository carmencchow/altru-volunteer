import axios from 'axios'
import { useState } from 'react'

const fetchNgo = async () => {
  const [ngo, setNgo] = useState('');


  try{
    const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    setNgo(res.data)
  } catch(e){
    console.log(e);
  }
}

export { fetchNgo };
