import React, { useState } from 'react'
import './Tabs.css'
import DonationsInfo from './DonationsInfo'
import VolunteerInfo from './VolunteerInfo'
import ProfileInfo from './ProfileInfo'
import { GrFormClose } from "react-icons/gr"

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  const toggletabs = (idx) => {
    setToggleState(idx)
    console.log(idx)
  }

  return (

    <div>
      <div className="button-row">
        <button onClick={toggleModal} className="modal-btn">
          Show Your Stats
        </button> 
      </div>

   {modal && (  
    <div className="tabs-container">

      <div className="heading-tabs">
        <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} 
        onClick={() => toggletabs(1)}>My Profile</div>

        <div className={toggleState === 2 ? "tabs  active-tabs" : "tabs"} 
        onClick={() => toggletabs(2)}>Donations</div>

        <div className={toggleState === 3 ? "tabs  active-tabs" : "tabs"} 
        onClick={() => toggletabs(3)}>Volunteer</div>
      </div>


      <div className="content-tabs">
        <div className={toggleState === 1 ? "content active-content" : "content"}>
        <div><ProfileInfo/></div>
        <GrFormClose className="close-btn" onClick={toggleModal}/>
        </div>

        <div className={toggleState === 2 ? "content active-content" : "content"}>
        <div><DonationsInfo/></div>
        <GrFormClose className="close-btn" onClick={toggleModal}/>
        </div>

        <div className={toggleState === 3 ? "content active-content" : "content"}>
        <div><VolunteerInfo/></div>
        <GrFormClose className="close-btn" onClick={toggleModal}/>
        </div>

      </div>
    </div>
      )}
    </div>
  )
}

export default Tabs