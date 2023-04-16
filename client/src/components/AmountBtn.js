import React, {useState} from 'react'
import './AmountBtn.css'

const AmountBtn = ({ select, amount, setSelect }) => {
  // const [ button, setButton ] = useState(false)
  // const [ buttonColor, setButtonColor ] = useState('')
  // const [ buttonText, setButtonText ] = useState('')
  // const [ buttonBorder, setButtonBorder ] = useState('')

  // const amounts = ['$10', '$25', '$50', '$75', '$100', 'Other']

  const handleClick = () => {
    // setInputValue(e.target.value);
    setSelect(amount);
    // setButtonColor('purple');
    // setButtonText('white')
    // setButtonBorder('purple');
    // console.log('amount chose', e.target.value)
  }

  return (
    // <div className="donation-options">
    //   {amounts.map((amount) => {
    //     return(
          <button 
            className="amount-btn" 
            style={
              select === amount ?
              { backgroundColor: 'purple', color: 'white', border: 'purple' } : undefined
            } 
            onClick={handleClick} 
            value={`${amount}`}>{amount}
          </button>
    //     )
    //   })}
    // </div>
  )
}

export default AmountBtn