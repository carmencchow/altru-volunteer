import React from 'react'
import styled from 'styled-components'
import Filters from '../components/Filters'
import Navbar from '../components/Navbar'
import './Main.css'
import { FiltersProvider } from '../context/FiltersContext'

const Section = styled.div``
const Main = () => {

  return (
    <Section>
      <Navbar/>
      <FiltersProvider>
        <Filters/>
      </FiltersProvider>
    </Section>
  )
}

export default Main