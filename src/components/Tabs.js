import React, { useState } from 'react'
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
  background-color: ${props => (props.isActive ? '#ccc' : 'transparent')};

  &:hover {
    background-color: #ddd;
  }
`

const TabContent = styled.div`
  margin-top: 20px;
`

function Tabs() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = index => {
    setActiveTab(index)
  }

  return (
    <TabsContainer>
      <TabList>
        <TabItem isActive={activeTab === 0} onClick={() => handleTabClick(0)}>
          Tab 1
        </TabItem>
        <TabItem isActive={activeTab === 1} onClick={() => handleTabClick(1)}>
          Tab 2
        </TabItem>
      </TabList>
      <TabContent>
        {activeTab === 0 && <TabContent1 />}
        {activeTab === 1 && <TabContent2 />}
      </TabContent>
    </TabsContainer>
  )
}

const TabContent1 = () => <div>Content for Tab 1</div>

const TabContent2 = () => <div>Content for Tab 2</div>

export default Tabs
