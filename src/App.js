import React, { useState } from 'react'
import { Home, Analysis } from './components'
import styled from 'styled-components'

const TabsContainer = styled.div`
  font-weight: bold;
`

const TabList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`

const TabItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${props => (props.$isActive ? '#ccc' : 'transparent')};

  &:hover {
    background-color: #ddd;
  }
`

const TabContent = styled.div`
  margin-top: 20px;
`

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = index => {
    setActiveTab(index)
  }

  return (
    <TabsContainer>
      <TabList>
        <TabItem $isActive={activeTab === 0} onClick={() => handleTabClick(0)}>
          HOME
        </TabItem>
        <TabItem $isActive={activeTab === 1} onClick={() => handleTabClick(1)}>
          ANALYSIS
        </TabItem>
      </TabList>
      <TabContent>
        {activeTab === 0 && <Home />}
        {activeTab === 1 && <Analysis />}
      </TabContent>
    </TabsContainer>
  )
}

export default App
