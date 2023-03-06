import React, {useState} from 'react';

const Tab = () => {
  const [active, setActive] = useState(tabs[0]);
  const tabs = [];

  return (
    <div className="tab-group">
      {/* {tabs.map(tab => (
        <div 
          key={tab} 
          active={active === tab} 
          onClick={() => setActive(tab)}
        >
          {tab} 
        </div>
      ))} */}
    </div>
  )
}

export default Tab