import React from 'react'
import DonationItem from './DonationItem'

const DonationsList = () => {

  const donations = [
    { 
      id: 1,
      ngo: 'AWARE Zimbabwe',
      date: 'August 19, 2022',
      donated: 25
    },
    { 
      id: 2,
      ngo: 'African Child Projects',
      date: 'January 3, 2023',
      donated: 100
    },
    { 
      id: 3,
      ngo: 'Dubai Cares',
      date: 'February 20th, 2023',
      donated: 40
    },
  ]

  return (
    <div>
      <ul>
        {donations.map((donation) => (
          <DonationItem 
            id={donation.id}
            ngo={donation.ngo}
            amount={donation.donated}
            date={donation.date}
            />
        ))}
      </ul>
    </div>
  )
}

export default DonationsList