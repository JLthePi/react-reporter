// ./pages/QualityMetrics/QualityCells.js

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Foldable } from '../../components'
import { sampleInfo } from '../../meta/example.json'
import { threshold } from '../../data/threshold.json'
import { BarChart } from '../../components'

const QualityCellsContainer = styled.div``

const QualityCells = () => {
  const qualityCell = {
    columns: [
      'customerId',
      'estimatedNumberOfCells',
      'meanReadsPerCell',
      'medianUmiCountsPerCell',
      'totalGenesDetected',
      'medianGenesPerCell',
      'fractionReadsInCells',
    ],
    colnames: [
      'Customer ID',
      'Estimated Number of Cells',
      'Mean Reads Per Cell',
      'Median UMI Counts Per Cell',
      'Total Genes Detected',
      'Median Genes Per Cell',
      'Fraction Reads In Cells',
    ],
  }

  const categories = qualityCell.columns.slice(1)
  const [category, setCategory] = useState(categories[0])
  const [thresholdMin, setThresholdMin] = useState(threshold[category]?.min || 0)
  const [thresholdMax, setThresholdMax] = useState(threshold[category]?.max || Infinity)

  const chooseCategory = cat => {
    setCategory(cat)
    setThresholdMin(threshold[cat]?.min || 0)
    setThresholdMax(threshold[cat]?.max || Infinity)
  }

  useEffect(() => {
    chooseCategory(categories[0])
  }, [])

  return (
    <QualityCellsContainer>
      <fieldset>
        {categories.map((cat, idx) => (
          <label>
            <input type="radio" value={cat} checked={category === cat} onChange={() => chooseCategory(cat)} />
            <span>{qualityCell.colnames[idx + 1]}</span>
          </label>
        ))}
      </fieldset>
      <BarChart
        data={sampleInfo}
        chartWidth={500}
        chartHeight={500}
        margins={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xaxis={category}
        yaxis={'customerId'}
        thresholdMin={thresholdMin}
        thresholdMax={thresholdMax}
      />
      <Foldable header="Quality of Cells">
        <Table tableData={sampleInfo} columns={qualityCell.columns} colnames={qualityCell.colnames} />
      </Foldable>
    </QualityCellsContainer>
  )
}

export default QualityCells
