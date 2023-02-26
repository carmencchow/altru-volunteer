import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import Card from '../components/Card'
import './Main.css'
import Display from '../components/Display'

const Section = styled.div``

const Main = () => {

  return (
    <Section>
      <Filters/>
        <h1>Featured Organizations</h1>
        <div className="featured-cards">
          <Card/>
          <Card/>
          <Card/>
        </div>
      {/* <Display/> */}
      <Footer/>
    </Section>
  )
}

export default Main