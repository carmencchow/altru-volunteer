// import React, { useState, useContext } from 'react'
// import { DonationsContext } from '../context/DonationsContext'

// const SetAmount = () => {
//   const { total } = useContext(DonationsContext)
//   const [amount, setAmount] = useState('$0')
  
//   const handleAmount = (e) => {
//     console.log('Other amount is: ', e.target.value)
//     setAmount(e.target.value)
//   }

//   const saveAmount = (e) => {
//     console.log('Saving amount', setAmount, e.target.value)
//   }

//   return (
//     <div>
//       <input 
//         type="text" 
//         className="choose-amount" 
//         placeholder="Other amount"
//         value={total} 
//         onChange={handleAmount}
//         >
//       </input>
//       <button onClick={saveAmount}>Save</button>
//     </div>
//   )
// }

// export default SetAmount