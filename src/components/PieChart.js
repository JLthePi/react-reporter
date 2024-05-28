import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PieChart = ({ data, chartWidth = 400, chartHeight = 400 }) => {
  if (!data)
    return (
      <div>
        <h1>NO DATA</h1>
      </div>
    )

  const ref = useRef()

  useEffect(() => {
    const width = chartWidth
    const height = chartHeight

    // Create the color scale.
    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

    // Create the pie layout and arc generator.
    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value)

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1)

    const labelRadius = arc.outerRadius()() * 0.8

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius)

    const arcs = pie(data)

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    // Add a sector path for each value.
    svg
      .append('g')
      .attr('stroke', 'white')
      .selectAll()
      .data(arcs)
      .join('path')
      .attr('fill', d => color(d.data.name))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString('en-US')}`)

    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    svg
      .append('g')
      .attr('text-anchor', 'middle')
      .selectAll()
      .data(arcs)
      .join('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .call(text =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text(d => d.data.name),
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .text(d => d.data.value),
      )
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString('en-US')}`)
  }, [chartWidth, chartHeight])

  return <svg width={chartWidth} height={chartHeight} ref={ref} />
}

export default PieChart
