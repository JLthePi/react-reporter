// ./pages/QualityMetrics.js

import React from 'react'
import { Table, Foldable } from '../components'
import { sampleInfo } from '../data/example.json'

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

  return (
    <div>
      <Foldable header="Quality of Cells">
        <Table tableData={sampleInfo} columns={qualityCell.columns} colnames={qualityCell.colnames} />
      </Foldable>
      <Foldable header="Quality of Sequencing">
        <Table tableData={sampleInfo} columns={qualitySequencing.columns} colnames={qualitySequencing.colnames} />
      </Foldable>
      <Foldable header="Quality of Mapping">
        <Table tableData={sampleInfo} columns={qualityMapping.columns} colnames={qualityMapping.colnames} />
      </Foldable>
    </div>
  )
}

export default QualityMetrics
