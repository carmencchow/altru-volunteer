import React from 'react'
import { useEffect, useState } from 'react'
import Ngo from '../components/Ngo'
import './Display.css'

const Display = () => {
  const [ ngos, setNgos ] = useState(null)

  useEffect(() => {
    const fetchNgos = async () => { 
      const res = await fetch('http://localhost:5000/api/ngo')
      const json = await res.json()
      if(res.ok){
        setNgos(json)
      }
    }
    fetchNgos();
  }, [])

  return (
    <div className="display-ngos">
      <h3>List of NGOS that match your search:</h3>
        { ngos && ngos.map((item) => (
        <div className="row">
          <Ngo key={item._id} ngo={item}/>   
        </div>
      ))}
    </div>
    )
  }


export default Display