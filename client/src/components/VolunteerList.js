import React from 'react'
import VolunteerItem from './VolunteerItem'

const VolunteerList = () => {

  const activity = [
    { 
      id: 1,
      ngo: 'Ape Action Africa',
      date: 'August 19, 2022',
      event: 'Reading workshop'
    },
    { 
      id: 2,
      ngo: 'Animals Asia',
      date: 'January 3, 2023',
      event: 'Beach cleanup'
    },
    { 
      id: 3,
      ngo: 'Dubai Cares',
      date: 'February 20th, 2023',
      event: '5K fun run'
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