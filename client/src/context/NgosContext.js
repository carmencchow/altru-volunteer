import React, { createContext, useState } from 'react'

export const NgosContext = createContext()

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([])
  const [ngo, setNgo] = useState({})
  const [ngoId, setNgoId] = useState('')
  // const [ ngoModal, setNgoModal ] = useState(null)
  // const [ openModal, setOpenModal ] = useState(false)

  // const toggleModal = (ngo) => {
  //   console.log('Card opened:', ngo.name, ngo._id)
  //   setNgoModal(ngo)
  //   setOpenModal(!openModal);
  // }

  return (
    <NgosContext.Provider value={{  
      ngo, setNgo,
      ngos, setNgos,
      ngoId, setNgoId,
      // toggleModal, 
    }}>
      {children}
    </NgosContext.Provider>
  );
}
