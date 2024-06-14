import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const StackedBarPlot = ({
  data,
  chartWidth = 400,
  chartHeight = 400,
  margins = { top: 50, right: 50, bottom: 50, left: 100 },
  xaxis,
  yaxis,
  xlab = '',
  ylab = '',
  xlim = [NaN, NaN],
}) => {
  const ref = useRef()

  useEffect(() => {
    if (!data || data.length === 0) return
    d3.select(ref.current).select('svg').remove()
    console.log(data)

    const margin = { top: margins.top, right: margins.right, bottom: margins.bottom, left: margins.left }
    const width = chartWidth - margin.left - margin.right
    const height = chartHeight - margin.top - margin.bottom
    const groups = d3.map(data, d => d.geninusId)
    const subgroups = ['totalCells', 'qcPassed', 'qcFailed', 'qcMiQC', 'qcDoublet']

    if (Number.isNaN(xlim[0])) xlim[0] = d3.min(data, d => +d[xaxis])
    if (Number.isNaN(xlim[1])) xlim[1] = d3.max(data, d => +d[xaxis])

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const x = d3.scaleLinear().range([0, width]).domain([xlim[0], xlim[1]]).nice()
    const y = d3.scaleBand().range([0, height]).domain(groups)

    const widenData = data.map

    // const stackedData = d3.stack().keys(subgroups)(data)

    // svg
    //   .append('g')
    //   .selectAll('g')
    //   .data(stackedData)
    //   .enter()
    //   .append('g')
    //   .attr('fill', ['red', 'blue'])
    //   .selectAll('rect')
    //   .data(d => d)
    //   .enter()
    //   .append('rect')
    //   .attr('x', d => x(d[1]))
    //   .attr('y', d => y(d.data.geninusId))
    //   .attr('width', d => x(d[0]) - x(d[1]))
    //   .attr('height', y.bandwidth())

    svg // xaxis
      .append('g')
      .attr('transform', `translate(0, ${chartHeight - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')

    svg // yaxis
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(y))

    svg // xlab
      .append('text')
      .text(xlab)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 15)

    svg // ylab
      .append('text')
      .text(ylab)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 25)
  }, [data])

  if (!data)
    return (
      <div>
        <h1>NO DATA</h1>
      </div>
    )

  return <svg width={chartWidth} height={chartHeight} ref={ref} />
}

export default StackedBarPlot
