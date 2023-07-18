import React from "react";
import "./AmountBtn.css";

const AmountBtn = ({ amount, clickedBtn, setClickedBtn }) => {
  const handleClick = () => {
    setClickedBtn(amount);
    console.log("Clicking $", amount);
  };

  return (
    <button
      className="amount-btn"
      style={
        clickedBtn === amount
          ? {
              backgroundColor: "rgb(167, 88, 241)",
              color: "white",
              border: "purple",
            }
          : undefined
      }
      onClick={handleClick}
      value={`${amount}`}
    >
      ${amount}
    </button>
  );
};

export default AmountBtn;
