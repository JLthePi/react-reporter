// ./components/ProjectInfo.js

import React from 'react'
import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { projectInfo } from '../data/example.json'

const ProjectInfo = () => {
  const data = { nodes: projectInfo }
  console.log(data)

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

  const COLUMNS = [{ renderCell: item => item.name }, { renderCell: item => item.value }]

  return <CompactTable columns={COLUMNS} data={data} theme={theme} />
}

export default ProjectInfo
