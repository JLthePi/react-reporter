// ./components/Table.js

import React from 'react'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

const Table = ({ tableData, columns, colnames }) => {
  const data = { nodes: tableData }

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

  const COLUMNS = columns.map((col, i) => {
    return { label: colnames[i], renderCell: item => item[col] }
  })

  return <CompactTable columns={COLUMNS} data={data} theme={theme} />
}

export default Table
