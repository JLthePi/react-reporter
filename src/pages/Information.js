// ./pages/Information.js

import React from 'react'
import { styled } from 'styled-components'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { example } from '../data'

const TableWrapper = styled.div`
  width: calc(50vw - 32px);
  min-width: 720px;
  max-width: 1080px;
  margin: 16px;
`

const Information = () => {
  const data = { nodes: example }
  const theme = useTheme(getTheme(), {
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        padding: 8px 16px;
      `,
  })

  if (!data.nodes) return <div>THERE IS NO DATA</div>

  const COLUMNS = [
    { label: 'Geninus ID', renderCell: item => item.geninusId },
    { label: 'Customer ID', renderCell: item => item.customerId },
    { label: 'Group', renderCell: item => item.group },
    { label: 'Sample Type', renderCell: item => item.sampleType },
  ]

  return (
    <TableWrapper>
      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </TableWrapper>
  )
}

export default Information
