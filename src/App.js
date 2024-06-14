// ./App.js

import React, { useState } from 'react'
import * as Pages from './pages'
import { Tab } from './components'
import styled from 'styled-components'

const AppContainer = styled.div``

const Content = styled.div``

function App() {
  const [activeTab, setActiveTab] = useState('Home')

  const handleTabClick = index => {
    setActiveTab(index)
  }

  return (
    <AppContainer>
      <Tab activeTab={activeTab} handleTabClick={handleTabClick} />
      <Content>
        {activeTab == 'Home' && <Pages.Home />}
        {activeTab == 'Information' && <Pages.Information />}
        {activeTab == 'QualityCells' && <Pages.QualityCells />}
        {activeTab == 'QualitySequencing' && <Pages.QualitySequencing />}
        {activeTab == 'QualityMapping' && <Pages.QualityMapping />}
        {activeTab == 'QualityControl' && <Pages.QualityControl />}
        {activeTab == 'Annotation' && <Pages.Annotation />}
        {activeTab == 'Clustering' && <Pages.Clustering />}
        {activeTab == 'Deg' && <Pages.Deg />}
        {activeTab == 'Gsea' && <Pages.Gsea />}
        {activeTab == 'Workflow' && <Pages.Workflow />}
      </Content>
    </AppContainer>
  )
}

export default App
