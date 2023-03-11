import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import Cards from '../components/Cards'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import './Main.css'

const Section = styled.div``

const Main = () => {

  return (
    <Section>
      {/* <Navbar/> */}
      <Filters/>
      {/* <ChatWindow/> */}
      {/* <Footer/> */}
    </Section>
  )
}

export default Main