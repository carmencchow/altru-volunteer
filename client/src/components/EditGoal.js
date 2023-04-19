import React, { useContext, useState } from "react";
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import './EditGoal.css';

const EditGoal = ({ openInput, closeInput }) => {
  const [input, setInput] = useState(0);
  const { userId, getUser } = useContext(AuthContext);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSave = async () => {
    try {
      console.log("New goal amount is", input);
      const res = await axios.put(
        `http://localhost:5000/api/user/${userId}/amount`,
        { 
          goalAmount: `${input}` 
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log(data);
      setInput('')
      getUser();
      closeInput();
    } catch (err) {
      console.log(err);
    }
  };

  if (!openInput) return null;  

  return (
    <div className="row">
      <div className="edit-input">$
        <input
          type="text"
          className="edit"
          value={input}
          placeholder="Enter goal amount"
          onChange={handleInput}
          closeInput={closeInput}
        />
        <button className="close-btn" onClick={closeInput}>X</button>
        <button className="save-btn" onClick={handleSave}>Save</button> 
      </div>
    </div>
  );
};

export default EditGoal;