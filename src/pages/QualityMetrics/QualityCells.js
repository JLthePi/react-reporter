// ./pages/QualityMetrics/QualityCells.js

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Foldable, BarChart } from '../../components'
import { qualityMetrics } from '../../data/descriptions.json'
import { sampleInfo } from '../../meta/example.json'

const QualityCellsContainer = styled.div`
  display: grid;
  grid-template-columns: fit-content(100%) 4fr;
  grid-template-areas:
    'category chart'
    'detail detail';
  gap: 20px;
  padding: 20px;
`

const CategoryContainer = styled.fieldset`
  display: flex;
  width: min(270px, 25vw);
  flex-direction: column;
  grid-area: category;
  border: 1px solid #a0a8ae;
  border-radius: 10px;
  overflow: hidden;
`

const CategoryHeader = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  font-weight: bold;
  font-size: large;
  border-bottom: 1px solid #a0a8ae;
`

const CategoryLabel = styled.label`
  padding: 15px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  & > input {
    display: none;
  }

  & > input:checked + span {
    font-weight: bold;
  }

  & > span {
    display: flex;
    justify-content: space-between;
  }

  & > input:checked + span::after {
    content: '>';
  }
`

const ChartContainer = styled.div`
  grid-area: chart;
  overflow: hidden;
`

const ChartHeader = styled.div`
  font-weight: bold;
  font-size: larger;
  margin: 10px 0 20px;
`

const ChartDescription = styled.div`
  margin: 20px 0;

  & > span {
    display: block;
    margin-bottom: 5px;
  }
`

const DetailContainer = styled.div`
  grid-area: detail;
`

const QualityCells = () => {
  const categories = Object.keys(qualityMetrics.qualityCells)
  const [category, setCategory] = useState(categories[0])
  const [thresholdMin, setThresholdMin] = useState(qualityMetrics.qualityCells[category]?.min || 0)
  const [thresholdMax, setThresholdMax] = useState(qualityMetrics.qualityCells[category]?.max || Infinity)
  const [type, setType] = useState(qualityMetrics.qualitySequencing[category]?.type || 'count')

  const chooseCategory = cat => {
    setCategory(cat)
    setThresholdMin(qualityMetrics.qualityCells[cat]?.min || 0)
    setThresholdMax(qualityMetrics.qualityCells[cat]?.max || Infinity)
    setType(qualityMetrics.qualityCells[cat]?.type || 'count')
  }

  useEffect(() => {
    chooseCategory(categories[0])
  }, [])

  return (
    <QualityCellsContainer>
      <CategoryContainer>
        <CategoryHeader>
          <span>Quality of Cells</span>
        </CategoryHeader>
        {categories.map(cat => (
          <CategoryLabel>
            <input type="radio" value={cat} checked={category === cat} onChange={() => chooseCategory(cat)} />
            <span>{qualityMetrics.qualityCells[cat]?.name}</span>
          </CategoryLabel>
        ))}
      </CategoryContainer>
      <ChartContainer>
        <ChartHeader>{qualityMetrics.qualityCells[category]?.name}</ChartHeader>
        <ChartDescription>
          <span>{qualityMetrics.qualityCells[category]?.definition}</span>
          <span>{qualityMetrics.qualityCells[category]?.notes}</span>
        </ChartDescription>
        <BarChart
          data={sampleInfo}
          chartWidth={800}
          chartHeight={500}
          margins={{ top: 0, right: 50, bottom: 50, left: 100 }}
          xaxis={category}
          yaxis={'customerId'}
          type={type}
          thresholdMin={thresholdMin}
          thresholdMax={thresholdMax}
        />
      </ChartContainer>
      <DetailContainer>
        <Foldable header="Detailed Data">
          <Table
            tableData={sampleInfo}
            columns={['customerId', ...Object.keys(qualityMetrics.qualityCells)]}
            colnames={['Customer ID', ...Object.values(qualityMetrics.qualityCells).map(({ name }) => name)]}
          />
        </Foldable>
      </DetailContainer>
    </QualityCellsContainer>
  )
}

export default QualityCells
