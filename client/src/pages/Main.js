import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import ChatWindow from '../components/ChatWindow'
import './Main.css'
import Display from '../components/Display'

const Section = styled.div``

const Main = () => {

  return (
    <Section>
      <Navbar/>
        <Card/>
        <Filters/>
          <h1>Featured Organizations</h1>
          <div className="featured-cards"></div>
        <ChatWindow/>
      <Footer/>
    </Section>
  )
}

export default Main