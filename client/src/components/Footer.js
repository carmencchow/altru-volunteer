import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Footer = () => {
  return (
    <Box>
      <p className="copyright">Thank you for donating! Copyright Altru @ 2023</p>
    </Box>
  )
}

export default Footer;