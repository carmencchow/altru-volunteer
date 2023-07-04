import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserData } from "../utils/fetchUserData";
import { api } from "../utils/axios";

const EditGoal = ({ openInput, closeInput }) => {
  const [input, setInput] = useState(0);
  const { setMongoUser, user } = useContext(AuthContext);

  const handleInput = (e) => {
    const fixed = parseFloat(e.target.value).toFixed(2).toString();
    if (fixed.length < parseFloat(e.target.value).toString().length)
      e.target.value = fixed;
    setInput(e.target.value);
  };

  const handleSave = async () => {
    try {
      console.log("New goal amount is", input);
      const token = await user.getIdToken();
      const res = await api.put(
        `/user/${user.uid}/amount`,
        {
          goalAmount: `${input}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      setInput("");
      closeInput();
    } catch (err) {
      console.log("Error is: ", err);
    }
  };

  if (!openInput) return null;

  return (
    <div className="row">
      <div className="edit">
        $
        <input
          type="number"
          className="goal-input"
          min="10"
          value={input}
          placeholder="Enter goal amount"
          onChange={handleInput}
          closeInput={closeInput}
        />
        <button className="save-goal-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditGoal;
