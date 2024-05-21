// ./components/Home.js

import React from 'react'
import styled from 'styled-components'

const HomeContainer = styled.div`
  font-weight: bold;
`

const HomeContent = styled.div`
  margin-top: 20px;
`
const Home = () => {
  return (
    <HomeContainer>
      <HomeContent>
        <h1>THIS IS HOME</h1>
      </HomeContent>
    </HomeContainer>
  )
}

export default Home
