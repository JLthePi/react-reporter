// ./pages/QualityMetrics/QualityMapping.js

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Foldable } from '../../components'
import { sampleInfo } from '../../meta/example.json'
import { threshold } from '../../data/threshold.json'
import { BarChart } from '../../components'

const QualityMappingContainer = styled.div``

const QualityMapping = () => {
  const qualityMapping = {
    columns: [
      'customerId',
      'readsMappedToGenome',
      'readsMappedConfidentlyToGenome',
      'readsMappedConfidentlyToIntergenicRegions',
      'readsMappedConfidentlyToIntronicRegions',
      'readsMappedConfidentlyToExonicRegions',
      'readsMappedConfidentlyToTranscriptome',
      'readsMappedAntisenseToGene',
    ],
    colnames: [
      'Customer ID',
      'Reads Mapped To Genome',
      'Reads Mapped Confidently To Genome',
      'Reads Mapped Confidently To Intergenic Regions',
      'Reads Mapped Confidently To Intronic Regions',
      'Reads Mapped Confidently To Exonic Regions',
      'Reads Mapped Confidently To Transcriptome',
      'Reads Mapped Antisense To Gene',
    ],
  }

  const categories = qualityMapping.columns.slice(1)
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
    <QualityMappingContainer>
      <fieldset>
        {categories.map((cat, idx) => (
          <label>
            <input type="radio" value={cat} checked={category === cat} onChange={() => chooseCategory(cat)} />
            <span>{qualityMapping.colnames[idx + 1]}</span>
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
      <Foldable header="Quality of Mapping">
        <Table tableData={sampleInfo} columns={qualityMapping.columns} colnames={qualityMapping.colnames} />
      </Foldable>
    </QualityMappingContainer>
  )
}

export default QualityMapping
