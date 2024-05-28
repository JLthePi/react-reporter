// ./pages/QualityMetrics/QualitySequencing.js

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Foldable } from '../../components'
import { sampleInfo } from '../../meta/example.json'
import { threshold } from '../../data/threshold.json'
import { BarChart } from '../../components'

const QualitySequencingContainer = styled.div``

const QualitySequencing = () => {
  const qualitySequencing = {
    columns: [
      'customerId',
      'numberOfReads',
      'validBarcodes',
      'sequencingSaturation',
      'q30BasesInBarcodes',
      'q30BasesInRnaRead',
      'q30BasesInUmi',
    ],
    colnames: [
      'Customer ID',
      'Number of Reads',
      'Valid Barcodes',
      'Sequencing Saturation',
      'Q30 Bases in Barcodes',
      'Q30 Bases in RNA Read',
      'Q30 Bases in UMI',
    ],
  }

  const categories = qualitySequencing.columns.slice(1)
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
    <QualitySequencingContainer>
      <fieldset>
        {categories.map((cat, idx) => (
          <label>
            <input type="radio" value={cat} checked={category === cat} onChange={() => chooseCategory(cat)} />
            <span>{qualitySequencing.colnames[idx + 1]}</span>
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
      <Foldable header="Quality of Sequencing">
        <Table tableData={sampleInfo} columns={qualitySequencing.columns} colnames={qualitySequencing.colnames} />
      </Foldable>
    </QualitySequencingContainer>
  )
}

export default QualitySequencing
