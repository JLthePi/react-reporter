// ./components/Tab.js

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const TabContainer = styled.ul`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  z-index: 1000;
  transform: translateY(${props => (props.$isHidden ? '-100%' : '0')});
  display: flex;
  list-style-type: none;
  padding: 0;
  background-color: #f9f9f9;
`

const LogoContainer = styled.li`
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

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    ul {
      display: block;
    }
  }
`

const TabPadding = styled.div`
  height: 50px;
`

const SubTabList = styled.ul`
  position: absolute;
  display: none;
  top: 100%;
  cursor: pointer;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const SubTabItem = styled.li`
  padding: 10px 20px;
  white-space: nowrap;

  &:hover {
    background-color: #ddd;
  }
`

const Tab = ({ activeTab, handleTabClick }) => {
  const [isHidden, setIsHidden] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos

      setIsHidden(isScrollingDown)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <>
      <TabContainer $isHidden={isHidden}>
        <LogoContainer>GENINUS</LogoContainer>
        <TabItem $isActive={activeTab === 0} onClick={() => handleTabClick(0)}>
          HOME
        </TabItem>
        <TabItem $isActive={activeTab === 10} onClick={() => handleTabClick(10)}>
          INFORMATION
        </TabItem>
        <TabWrapper>
          <TabItem $isActive={(activeTab >= 20) & (activeTab < 30)} onClick={() => handleTabClick(20)}>
            ANALYSIS
          </TabItem>
          <SubTabList>
            <SubTabItem onClick={() => handleTabClick(20)}>OVERVIEW</SubTabItem>
            <SubTabItem onClick={() => handleTabClick(21)}>QUALITY METRICS</SubTabItem>
            <SubTabItem onClick={() => handleTabClick(22)}>CLUSTERING & ANNOTATION</SubTabItem>
            <SubTabItem onClick={() => handleTabClick(23)}>DEG & GSEA</SubTabItem>
          </SubTabList>
        </TabWrapper>
        <TabItem $isActive={activeTab === 30} onClick={() => handleTabClick(30)}>
          WORKFLOW
        </TabItem>
      </TabContainer>
      <TabPadding />
    </>
  )
}

export default Tab
