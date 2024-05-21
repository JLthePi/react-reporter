// ./pages/Information.js

import React from 'react'
import styled from 'styled-components'
import { Table } from '../components'

const TableWrapper = styled.div`
  width: calc(50vw - 32px);
  min-width: 720px;
  max-width: 1080px;
  margin: 16px;
`

const Information = () => {
  return (
    <TableWrapper>
      <Table />
    </TableWrapper>
  )
}

export default Information
