// import React, { useState } from "react";
// // import "./AddCard.css";
// import SaveCardBtn from "./SaveCardBtn";

// const AddGoalAmount = ({ open, listId, id, onCardSaved, handleFetchData }) => {

//   const [goalAmount, setGoalAmount] = useState("");

//   if (!open) return null;

//   const handleGoalAmount = (e) => {
//     setGoalAmount(e.target.value);
//   };
  
//   const handleGoalSaved = () => {
//     setGoalAmount("");
//   };

//   return (
//     <div className="input-container">
//       <div>  
//         <input 
//           type="text" 
//           className="goal-amount" 
//           placeholder="Donation amount" 
//           value={goalAmount}
//           onChange={handleGoalAmount}>
//         </input>
//       </div>

//       <SaveCardBtn
//         input={goalAmount}
//         listId={listId}
//         onCardSaved={handleGoalSaved}
//         id={id}
//         handleFetchData={handleFetchData}
//       />
//     </div>
//   );
// };

// export default AddGoalAmount;
