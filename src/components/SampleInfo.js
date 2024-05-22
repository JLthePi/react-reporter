// ./components/SampleInfo.js

import React from 'react'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { sampleInfo } from '../data/example.json'

const SampleInfo = () => {
  const data = { nodes: sampleInfo }

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
    { label: 'Patient', renderCell: item => item.patient },
    { label: 'Case', renderCell: item => item.case },
  ]

  return <CompactTable columns={COLUMNS} data={data} theme={theme} />
}

export default SampleInfo
