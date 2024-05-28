// ./pages/Information.js

import React from 'react'
import styled from 'styled-components'
import { PieChart, Table } from '../components'
import { pieChart, sampleInfo, projectInfo } from '../meta/example.json'

const InformationContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: center;
  grid-template-areas:
    'project pie'
    'sample pie';
`

const ProjectContainer = styled.div`
  grid-area: project;
`

const ProjectWrapper = styled.div`
  width: calc(100% - 32px);
  margin: 16px;
`

const SampleContainer = styled.div`
  grid-area: sample;
`

const PieChartContainer = styled.div`
  grid-area: pie;
`

const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
`

const SampleWrapper = styled.div`
  width: calc(100% - 32px);
  margin: 16px;
`

const Information = () => {
  return (
    <InformationContainer>
      <ProjectContainer>
        <ProjectWrapper>
          <h1>Project Information</h1>
          <Table tableData={projectInfo} columns={['name', 'value']} colnames={Array(2).fill('')} />
        </ProjectWrapper>
      </ProjectContainer>
      <SampleContainer>
        <SampleWrapper>
          <h1>Sample Information</h1>
          <Table
            tableData={sampleInfo}
            columns={['geninusId', 'customerId', 'patient', 'case']}
            colnames={['Geninus ID', 'Customer ID', 'Patient', 'Case']}
          />
        </SampleWrapper>
      </SampleContainer>
      <PieChartContainer>
        <PieChartWrapper>
          <div>Number of patient</div>
          <PieChart data={pieChart.patient} chartWidth={300} chartHeight={300} />
        </PieChartWrapper>
        <PieChartWrapper>
          <div>Number of case</div>
          <PieChart data={pieChart.case} chartWidth={300} chartHeight={300} />
        </PieChartWrapper>
      </PieChartContainer>
    </InformationContainer>
  )
}

export default Information
