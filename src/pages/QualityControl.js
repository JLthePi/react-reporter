// ./pages/QualityControl.js

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ScatterPlot, StackedBarPlot } from '../components'
import csvData from '../meta/meta.csv'
import { totalInfo, sampleInfo } from '../meta/example.json'

const QualityControlContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
`

const SummaryTotalContainer = styled.div``
const SummarySampleContainer = styled.div``
const MitoContainer = styled.div``
const CountContainer = styled.div``

const DescriptionContainer = styled.div`
  position: relative;

  &:hover > div {
    display: block;
  }
`

const Description = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  background-color: #f9f9f9;
  border: 1px solid #a0a8ae;
  border-radius: 10px;
  padding: 20px;
`

const QualityControl = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(csvData)
  }, [])

  return (
    <QualityControlContainer>
      <SummaryTotalContainer>
        <span>SUMMARY TOTAL</span>
        <StackedBarPlot
          data={totalInfo}
          xaxis={'nFeatureRNA'}
          yaxis={'percentMt'}
          margins={{ top: 50, right: 50, bottom: 75, left: 75 }}
          xlab={'Number of RNA Features'}
          ylab={'MitoChondria Gene Percentage (%)'}
          xlim={[0, NaN]}
          ylim={[0, 100]}
        />
      </SummaryTotalContainer>
      <SummarySampleContainer>
        <span>SUMMARY SAMPLE</span>
      </SummarySampleContainer>
      <MitoContainer>
        <DescriptionContainer>
          <h1>Filtering Low Quiality Cells</h1>
          <Description>
            <p>
              The MiQC presents an alternative approach to guide data-driven decisions concerning cell populations
              within single-cell RNA sequencing datasets. It incorporates both mitochondrial RNA (percent.mt) and
              library complexity (nFeatureRNA) to provide a comprehensive understanding of cell quality.
            </p>
            <p>
              Elevated levels of mitochondrial RNA (percent.mt) often serve as indicators of cellular damage, prompting
              the exclusion of cells surpassing specific thresholds in many analyses (e.g., 5% for PBMC or 20% for
              tissue samples). However, setting these thresholds can be challenging, especially when analyzing archived
              tumor tissues or specific organ samples. Consequently, researchers must carefully consider the biological
              context and experimental factors when establishing mtRNA thresholds for cell filtering.
            </p>
            <p>
              We implement default parameters for MiQC (posterior.cutoff = 0.75, linear models). For a deeper
              understanding of the statistical principles underlying MiQC and its applications in analysis, please refer
              the MiQC paper (Hippen et al. (2021)).
            </p>
          </Description>
        </DescriptionContainer>
        <ScatterPlot
          data={data}
          xaxis={'nFeatureRNA'}
          yaxis={'percentMt'}
          margins={{ top: 50, right: 50, bottom: 75, left: 75 }}
          xlab={'Number of RNA Features'}
          ylab={'MitoChondria Gene Percentage (%)'}
          xlim={[0, NaN]}
          ylim={[0, 100]}
        />
      </MitoContainer>
      <CountContainer>
        <ScatterPlot
          data={data}
          xaxis={'nFeatureRNA'}
          yaxis={'nCountRNA'}
          margins={{ top: 50, right: 50, bottom: 75, left: 75 }}
          xlab={'Number of RNA Features'}
          ylab={'Total RNA Counts'}
          xlim={[0, NaN]}
          ylim={[0, NaN]}
        />
      </CountContainer>
    </QualityControlContainer>
  )
}

export default QualityControl
