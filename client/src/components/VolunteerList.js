import React from 'react'
import VolunteerItem from './VolunteerItem'

const VolunteerList = () => {

  const activity = [
    { 
      id: 1,
      ngo: 'Meals on Wheels ',
      date: 'August 19, 2022',
      event: 'Hot lunches delivery'
    },
    { 
      id: 2,
      ngo: 'Kew Beach Stewards',
      date: 'January 3, 2023',
      event: 'Beach cleanup'
    },
    { 
      id: 3,
      ngo: 'Toronto Humane Society',
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
            date={item.date}
            event={item.event}
            />
        ))}
      </ul>
    </div>
  )
}


export default VolunteerList