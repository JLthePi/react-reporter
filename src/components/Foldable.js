import React, { useState } from 'react'
import styled from 'styled-components'

const FoldableContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px;
`

const Header = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  cursor: pointer;
  user-select: none;
`

const Content = styled.div`
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const Foldable = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleFold = () => {
    setIsOpen(!isOpen)
  }

  return (
    <FoldableContainer>
      <Header onClick={toggleFold}>{header}</Header>
      <Content isOpen={isOpen}>{children}</Content>
    </FoldableContainer>
  )
}

export default Foldable
