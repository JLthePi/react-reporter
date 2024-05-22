import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const Barchart = ({
  chartWidth = 800,
  chartHeight = 400,
  chartMargin = { top: 30, right: 30, bottom: 70, left: 60 },
}) => {
  const ref = useRef()

  useEffect(() => {
    const margin = chartMargin
    const width = chartWidth - margin.left - margin.right
    const height = chartHeight - margin.top - margin.bottom

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv')
      .then(function (data) {
        const x = d3
          .scaleBand()
          .range([0, width])
          .domain(data.map(d => d.Country))
          .padding(0.2)
        svg
          .append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .selectAll('text')
          .attr('transform', 'translate(-10,0)rotate(-45)')
          .style('text-anchor', 'end')

        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, d => +d.Value)])
          .nice()
          .range([height, 0])
        svg.append('g').call(d3.axisLeft(y))

        svg
          .selectAll('mybar')
          .data(data)
          .join('rect')
          .attr('x', d => x(d.Country))
          .attr('y', d => y(+d.Value))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(+d.Value))
          .attr('fill', '#5f0f40')
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [chartWidth, chartHeight, chartMargin])

  return <svg width={chartWidth} height={chartHeight} ref={ref} />
}

export default Barchart
