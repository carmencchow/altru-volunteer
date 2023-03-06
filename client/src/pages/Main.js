import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import Cards from '../components/Cards'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import './Main.css'
import Display from '../components/Display'

const Section = styled.div``

const Main = () => {

  return (
    // When user is logged in display a message with user name at the top:
    <Section>
      <Navbar/>
      <Filters/>
      {/* <ChatWindow/> */}
      {/* <Footer/> */}
    </Section>
  )
}

export default Main