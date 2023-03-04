import React from 'react'

const Info = () => {

  const handleEdit = () => {}

  const handleSave = () => {}

  const handleBack = () => {
  }

  return (
    <div className="details">
      <div className="heading">
        <h3>Organization</h3>
        <button onClick={handleBack}>Back</button>
        
        <img src="" alt=""/>  
      </div>

      <div className="contact">
        <p>City</p>
        <p>Telephone</p>
        <p>Website</p>
        <p>Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at pagtytypeset. Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s, noong may isang di kilalang manlilimbag and kumuha ng galley ng type at ginulo an</p>

      <button onClick={handleEdit}>Update</button>
      <button onClick={handleSave}>Save</button>

      </div>
    </div>
  )
}

export default Info