// import React, {useState, useContext} from 'react'
// import {AuthContext} from '../context/AuthContext'

// import DonationItem from './DonationItem'

// const DonationsList = () => {
//   const {user} = useContext(AuthContext)

//   return (
//     <div>
//       <h2>Donations Made</h2>
//         <ul className="donations-list"> 
//         {user.donations.map((donation) => (
//           <DonationItem 
//           id={donation.id}
//           ngo={donation.ngo}
//           amount={donation.donated}
//           /> 
//         ))}
//       </ul> 
//     </div>
//   )
// }

// export default DonationsList