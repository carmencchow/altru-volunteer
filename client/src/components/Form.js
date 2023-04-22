import React, {useState} from 'react'

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');

  const handleNameInput = (e) => {
    setName(e.target.value)
  }

  const handleAddressInput = (e) => {
    setAddress(e.target.value)
  }

  const handleCityInput = (e) => {
    setCity(e.target.value)
  }

  const handlePostalInput = (e) => {
    setPostal(e.target.value)
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handleProvinceInput = (e) => {
    setProvince(e.target.value)
  }
  return (

    <div className="donor-info">
      <h3>Donor Information</h3>
      <div className="column">
        <p>Name:</p>
        <input type="text" className="form-control" value={name} onChange={handleNameInput}/>
        <p>Address:</p>
        <input type="text" className="form-control" value={address}
        onChange={handleAddressInput}/>
      </div>
      <div className="column">
        <p>City:</p>
        <input type="text" className="form-control" value={city}
        onChange={handleCityInput}/>
        <p>Province/State:</p>
        <input type="text" className="form-control" value={province}
        onChange={handleProvinceInput}/>
      </div>
      <div className="column">
        <p>Postal/ZIP Code:</p>
        <input type="text" className="form-control" value={postal}
        onChange={handlePostalInput}/>
        <p>Email address: </p>
        <input type="text" className="form-control" value={email}
        onChange={handleEmailInput}/>
      </div>        
    </div>
  )
}

export default Form