import React, { useState } from 'react'
import './Tabs.css'
import DonationsList from './DonationsList';
import VolunteerList from './VolunteerList';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  // const [dropContent, setDropContent] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx)
    console.log(idx)
  }
  
  // const toggleContent = () => {
  //   setDropContent(!dropContent)
  // }

  return (
    <div className="tabs-container">

      <div className="heading-tabs">
        <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} 
        onClick={() => toggletabs(1)}>Upcoming Events</div>

        <div className={toggleState === 2 ? "tabs  active-tabs" : "tabs"} 
        onClick={() => toggletabs(2)}>Donations</div>

        <div className={toggleState === 3 ? "tabs  active-tabs" : "tabs"} 
        onClick={() => toggletabs(3)}>Volunteer Hours</div>
      </div>


      <div className="content-tabs">
        <div className={toggleState === 1 ? "content active-content" : "content"}>MY EVENTS</div>

        <div className={toggleState === 2 ? "content active-content" : "content"}><p>MY DONATIONS</p>
        <div><DonationsList/></div>
        </div>

        <div className={toggleState === 3 ? "content active-content" : "content"}><p>MY VOLUNTEER HOURS</p>
        <div><VolunteerList/></div>
        </div>

       {/* <div onClick={toggleContent} className={dropContent ? "active content" : "content"}>
          <p>My Events</p>
        </div> 

        <div onClick={() => toggleContent() ? "content active-content" : "content"}>MY EVENTS</div> 

        <div onClick={toggleContent} className={toggleState === 2 ? "content active content" : "content"}>
        My Donations</div>*/}

      </div>

    </div>
  )
}

export default Tabs