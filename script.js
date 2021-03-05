const width = 500
const height = 500
const cx = width / 2
const cy = height / 2
const radius = 200
const nodeRadius = radius / 10
const PI2 = Math.PI * 2

d3.json('/data/lost_penny.json')
  .then(data => {

  const fifths = data
      .map(s => s.chord)
      .reduce((count, note) => {
        if (note in count) {
          count[note]++
        } else {
          count[note] = 1
        }
        return count
      }, {})
      // console.log(fifths)
      return data
  })

// header
d3.select('#fifths')
  .append('h4')
    .text(data[0].filename)

// svg wrapper
const svg = d3.select('#fifths')
  .append("svg")
    .attr('width', width)
    .attr('height', height)

// create groups within the svg
svg
  .append("g")
    .attr('id', 'ring')
  .append("circle")
    .attr('title', 'biggun')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', radius)
    .style('stroke', "#FFFFFF")
    // .attr('opacity', '85%')
    .style('stroke-width', 10)
    .style('fill', "transparent")
    // .attr('opacity', '65%')

function populateNotes(notes, nodes) {
  // use degrees not radians
  // const PI2 = Math.PI * 2
  // const slice = PI2 / notes.length
  const angle = (360 / notes.length)

  svg.selectAll(nodes)
    .data(notes)
    .attr("transform", (d) => {
            return `translate(${cx}, ${cy})`
        })
    .join((nodes) => {
      const node = nodes.append("g")
        .attr("id", "node")
        .attr('x', width)
        .attr('y', height)
          // .style('stroke', "white")
          .style('stroke-width', 2)
          .attr('fill', "white")
          // .attr('opacity', '75%')
          .attr('transform', (_,i) => {
            console.log(angle)
            return `rotate(${angle * i}, ${cx}, ${cy}) translate(${radius})` })

        node.append("circle")
          .attr('id', (d, i) => {return `${d}`})
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', nodeRadius)

        node.on('mouseover', function (d, i) {
          d3.select(this).transition()
             .duration('50')
            //  .attr('opacity', '85%')
             .attr('fill', 'yellow')})

        node.on('mouseout', function (d, i) {
          d3.select(this).transition()
               .duration('100')
               .attr('opacity', '100%')
               .attr('fill', 'white')})

        node.append("text")
          .attr('x', (_,i) => {return cx+i * Math.sin(angle)})
          .attr('y', (_,i) => {return cy+i * Math.cos(angle)})
          .attr('transform', (_,i) => {
            return `rotate(${-(angle * i)}, ${cx}, ${cy}) translate(${i-1})` })
          .text((d) => d)
            .attr('text-anchor', 'middle')
            .attr('fill', 'blue')
            .attr('letter-spacing', '-0.1em')
            .attr('dy', '0.3em')
            .attr('font-size', 1.05*nodeRadius)
        })
    }

// const triads = ["A", "B", "C", "D", "E", "F", "G"]
// populateNotes(triads, 'triads')

const fifths = ["A", "E", "B", "F♯", "C♯", "A♭", "E♭", "B♭", "F", "C", "G", "D" ]
populateNotes(fifths, 'fifths')
