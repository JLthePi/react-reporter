import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({
  data,
  chartWidth = 400,
  chartHeight = 400,
  margins = { top: 50, right: 50, bottom: 50, left: 100 },
  xaxis,
  yaxis,
  xlab = '',
  ylab = '',
  xlim = [NaN, NaN],
  ylim = [NaN, NaN],
}) => {
  const ref = useRef()

  useEffect(() => {
    if (!data || data.length === 0) return
    d3.select(ref.current).select('svg').remove()

    const margin = { top: margins.top, right: margins.right, bottom: margins.bottom, left: margins.left }
    const width = chartWidth - margin.left - margin.right
    const height = chartHeight - margin.top - margin.bottom
    if (Number.isNaN(xlim[0])) xlim[0] = d3.min(data, d => +d[xaxis])
    if (Number.isNaN(xlim[1])) xlim[1] = d3.max(data, d => +d[xaxis])
    if (Number.isNaN(ylim[0])) ylim[0] = d3.min(data, d => +d[yaxis])
    if (Number.isNaN(ylim[1])) ylim[1] = d3.max(data, d => +d[yaxis])

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const x = d3.scaleLinear().range([0, width]).domain([xlim[0], xlim[1]]).nice()
    const y = d3.scaleLinear().range([0, height]).domain([ylim[1], ylim[0]]).nice()

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d[xaxis]))
      .attr('cy', d => y(d[yaxis]))
      .attr('r', 1.5)
      .style('fill', '#111217')
      .call(circles => circles.filter(d => d['miQC'] > 0.75).style('fill', 'orange'))
      .call(circles => circles.filter(d => +d['df']).style('fill', 'steelblue'))
      .call(circles => circles.filter(d => +d['df'] && d['miQC'] > 0.75).style('fill', 'red'))

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

export default ScatterPlot
