import React, { useState } from 'react'
import { Home, Analysis, Information } from './components'
import styled from 'styled-components'

const TabsContainer = styled.div``

const TabList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`

const Logo = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
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

const SubTabList = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  list-style-type: none;
  padding: 0;

  &:hover {
    ${TabItem} {
      display: block;
    }
  }
`

const SubTabItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f9f9f9;
  display: none;

  &:hover {
    background-color: #ddd;
  }
`

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = index => {
    setActiveTab(index)
  }

  return (
    <TabsContainer>
      <TabList>
        <Logo>GENINUS</Logo>
        <TabItem $isActive={activeTab === 0} onClick={() => handleTabClick(0)}>
          HOME
        </TabItem>
        <TabItem $isActive={activeTab === 1} onClick={() => handleTabClick(1)}>
          INFORMATION
        </TabItem>
        <SubTabList>
          <TabItem
            $isActive={activeTab === 2}
            onClick={() => handleTabClick(2)}
          >
            ANALYSIS
          </TabItem>
          <SubTabItem>OVERVIEW</SubTabItem>
          <SubTabItem>DETAILS</SubTabItem>
        </SubTabList>
        <TabItem $isActive={activeTab === 3} onClick={() => handleTabClick(3)}>
          WORKFLOW
        </TabItem>
      </TabList>
      <TabContent>
        {activeTab === 0 && <Home />}
        {activeTab === 1 && <Information />}
        {activeTab === 2 && <Analysis />}
      </TabContent>
    </TabsContainer>
  )
}

export default App
