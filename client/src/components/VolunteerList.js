import React from 'react'
import VolunteerItem from './VolunteerItem'

const VolunteerList = () => {

  const activity = [
    { 
      id: 1,
      ngo: 'Ape Action Africa',
      date: 'August 19, 2022',
      hours: 2
    },
    { 
      id: 2,
      ngo: 'Animals Asia',
      date: 'January 3, 2023',
      hours: 6
    },
    { 
      id: 3,
      ngo: 'Dubai Cares',
      date: 'February 20th, 2023',
      hours: 5
    },
  ]

  return (
    <div>
      <ul>
        {activity.map((item) => (
          <VolunteerItem 
            id={item.id}
            ngo={item.ngo}
            hours={item.hours}
            date={item.date}
            />
        ))}
      </ul>
    </div>
  )
}


export default VolunteerList