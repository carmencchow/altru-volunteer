import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../utils/getUser";

const EditGoal = ({ openInput, closeInput }) => {
  const [input, setInput] = useState(0);
  const { setUser, user } = useContext(AuthContext);

  const handleInput = (e) => {
    const fixed = parseFloat(e.target.value).toFixed(2).toString();
    if (fixed.length < parseFloat(e.target.value).toString().length)
      e.target.value = fixed;
    setInput(e.target.value);
  };

  const handleSave = async () => {
    try {
      console.log("New goal amount is", input);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `http://localhost:5000/api/user/${user._id}/amount`,
        {
          goalAmount: `${input}`,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      setInput("");
      await getUser(user._id, setUser);
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
