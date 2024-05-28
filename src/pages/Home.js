// ./pages/Home.js

import React from 'react'
import styled from 'styled-components'
import homeImage from '../images/home.jpg'

const HomeContainer = styled.div``

const HomeContent = styled.div``
const Home = () => {
  return (
    <HomeContainer>
      <HomeContent>
        <h1>HOME TAB</h1>
        <img src={homeImage} alt="home" />
      </HomeContent>
    </HomeContainer>
  )
}

export default Home
