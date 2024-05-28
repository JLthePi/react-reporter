import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BarChart = ({
  data,
  chartWidth = 400,
  chartHeight = 400,
  margins = { top: 50, right: 50, bottom: 50, left: 100 },
  xaxis,
  yaxis,
  thresholdMax = Infinity,
  thresholdMin = 0,
}) => {
  const ref = useRef()

  useEffect(() => {
    if (!data || data.length === 0) return
    d3.select(ref.current).select('svg').remove()

    const margin = { top: 50, right: 50, bottom: 50, left: 100 }
    const width = chartWidth - margin.left - margin.right
    const height = chartHeight - margin.top - margin.bottom

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map(d => d[yaxis]))
      .padding(0.2)

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => +d[xaxis])])
      .range([0, width])
      .nice()

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svg // bars
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('mybar')
      .data(data)
      .join('rect')
      .attr('x', x(0))
      .attr('y', d => y(d[yaxis]))
      .attr('height', y.bandwidth())
      .attr('width', d => 0)
      .call(rects =>
        rects
          .filter(d => +d[xaxis] < thresholdMin) // below threshold
          .attr('fill', 'red'),
      )
      .call(rects =>
        rects
          .filter(d => +d[xaxis] > thresholdMax) // above threshold
          .attr('fill', 'red'),
      )
      .append('title')
      .text(d => `${d[yaxis]}: ${d[xaxis]}`)

    svg // labels
      .append('g')
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .selectAll()
      .data(data)
      .join('text')
      .attr('font-size', '0.66em')
      .attr('x', d => 0)
      .attr('y', d => y(d[yaxis]) + y.bandwidth() / 2)
      .attr('dx', -4)
      .attr('dy', '0.33em')
      .attr('opacity', 0)
      .text(d => d[xaxis])
      .call(text =>
        text
          .filter(d => x(d[xaxis]) - x(0) < 30) // short bars
          .attr('dx', +4)
          .attr('fill', 'black')
          .attr('text-anchor', 'start'),
      )
      .append('title')
      .text(d => `${d[yaxis]}: ${d[xaxis]}`)

    svg // bars animation
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('width', d => x(+d[xaxis]))
      .delay((d, i) => i * 25)

    svg // labels animation
      .selectAll('text')
      .transition()
      .duration(800)
      .attr('x', d => x(+d[xaxis]))
      .attr('opacity', 1)
      .delay((d, i) => i * 25)

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
      .append('text')
      .text(yaxis)
      .attr('transform', 'rotate(-90)')
  }, [chartWidth, chartHeight, xaxis])

  if (!data)
    return (
      <div>
        <h1>NO DATA</h1>
      </div>
    )

  return <svg width={chartWidth} height={chartHeight} ref={ref} />
}

export default BarChart
