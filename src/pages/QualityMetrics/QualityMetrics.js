// ./pages/QualityMetrics.js

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Table, Foldable } from '../../components'
import { sampleInfo } from '../../meta/example.json'
import { threshold } from '../../data/threshold.json'
import { BarChart } from '../../components'

const QualityMetricsContainer = styled.div``

const QualityMetrics = () => {
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
      'Q30 Bases In Barcodes',
      'Q30 Bases In RNA Read',
      'Q30 Bases In UMI',
    ],
  }

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
    <QualityMetricsContainer>
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
      <Foldable header="Quality of Sequencing">
        <Table tableData={sampleInfo} columns={qualitySequencing.columns} colnames={qualitySequencing.colnames} />
      </Foldable>
      <Foldable header="Quality of Mapping">
        <Table tableData={sampleInfo} columns={qualityMapping.columns} colnames={qualityMapping.colnames} />
      </Foldable>
    </QualityMetricsContainer>
  )
}

export default QualityMetrics
