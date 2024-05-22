// ./App.js

import React, { useState } from 'react'
import { Home, Analysis, Information, QualityMetrics, ClusteringAnnotation, DegGsea } from './pages'
import { Tab } from './components'
import styled from 'styled-components'

const AppContainer = styled.div``

const Content = styled.div`
  margin-top: 20px;
`

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = index => {
    setActiveTab(index)
  }

  return (
    <AppContainer>
      <Tab activeTab={activeTab} handleTabClick={handleTabClick} />
      <Content>
        {activeTab === 0 && <Home />}
        {activeTab === 10 && <Information />}
        {activeTab === 20 && <Analysis />}
        {activeTab === 21 && <QualityMetrics />}
        {activeTab === 22 && <ClusteringAnnotation />}
        {activeTab === 23 && <DegGsea />}
      </Content>
    </AppContainer>
  )
}

export default App
