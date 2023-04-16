// import React, { useState } from 'react'

// const Button = ({ ngo, toggleModal }) => {
//   const [ volunteer, setVolunteer ] = useState('Sign up')
//   const [ confirm, setConfirm ] = useState('')
//   const [ disabled, setDisabled ] = useState(false)

//   const handleRegister = () => {
//     setConfirm('Thank you. Please check your email for confirmation')
//     setVolunteer('Attending')
//     setDisabled(true)
//     // Decrement volunteer number by 1
//     // Update backend - user's events
//     // Update profile
//   }

//   return (
//     <div>
//       <button disabled={disabled} 
//         onClick={() => {
//           console.log(ngo, ngo.name, ngo._id)
//           toggleModal(ngo)}}
//         className="volunteer-btn">{volunteer}
//       </button>
//     </div> 
//   )
// }

// export default Button