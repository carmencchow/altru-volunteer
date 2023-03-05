import React from 'react'
import { useState } from 'react';
import { BsChatSquareDots } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi';
import './ChatWindow.css';

const ChatWindow = (props) => {
  let hide = { display: 'none' }
  let show = { display: 'block' }

  const { messages } = props

  const [chat, setChat] = useState('closed');
  const toggleChat = (e) => {
    console.log("chat box")
    setChat(!chat)
  }



  const handleClick = () => { 
    console.log('chat window clicked')
    // pop up modal

  }

  return (
    <div className="container">
      <p>Click to start chatting</p>
      <BsChatSquareDots className="chat" size={50} onClick={toggleChat}/>
    
        
      <div className="chatbox" style={ chat ? show : hide }>
        <div className="chatbox-container">
          <h3 className="top">Chat Window</h3>
          <p>how can I help you?</p>
          <div className="chatbox-body">
          </div>

          <div className="input">
            <input type="text" className="input" placeholder="Write a message"></input>
            <FiSend/>
          </div>
        </div>


      </div>

    </div>
  )
}

export default ChatWindow;