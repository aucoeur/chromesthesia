const width = 500
const height = 500
const cx = width / 2
const cy = height / 2
const radius = 200
const nodeRadius = radius / 10

const data = d3.json('./data/lost_penny.json')
  .then(data => {

    const head = d3.select('#song')
      .append('h4')
      .text(data[0].filename)

    const chords = data
      .map(s => s.chord)
      .reduce((count, chord) => {
        if (chord in count) {
          count[chord]++
        } else {
          count[chord] = 1
        }
        return count
      }, {})
      console.log(chords)
      return data
  })

// svg wrapper
const svg = d3
  .select('#chord')
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
    .style('stroke-width', 4)
    .style('fill', "transparent")


function populateNotes(notes) {
  // use degrees not radians
  // const PI2 = Math.PI * 2
  // const slice = PI2 / notes.length
  const angle = (360 / notes.length)

  svg.selectAll('#nodes')
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
          .style('fill', "white")
          .attr('transform', (_,i) => {
            console.log(angle)
            return `rotate(${angle * i}, ${cx}, ${cy}) translate(${radius})` })

        node.append("circle")
          .attr('id', (d, i) => {return `${d}`})
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', nodeRadius)


        node.append("text")
          .attr('x', (_,i) => {return cx+i * Math.sin(angle)})
          .attr('y', (_,i) => {return cy+i * Math.cos(angle)})
          .attr('transform', (_,i) => {
            return `rotate(${90*angle*i}, ${cx}, ${cy}) translate(-${i})` })
          .text((d) => d)
            .attr('text-anchor', 'middle')
            .attr('fill', 'blue')
            .attr('dy', '0.3em')
            .attr('font-size', 1.5*nodeRadius)

          // return node
        })
    }

  // .attr('transform', (_, i) => {
  //   return `rotate(${Math.sin(angle*i)}, ${cx}, ${cy})`
  //   })

  // const nodes = svg.select('#nodes')
  //   .selectAll("circle")
  //   .enter()
  //   .append("circle")
      // .attr('id', (d, i) => {return `${d}`})
      // .attr('cx', 250)
      // .attr('cy', 250)
      // .attr('r', 20)
      // .attr('transform', (_,i) => {
      //     // use degrees not radians
      //     // const PI2 = Math.PI * 2
      //     // const slice = PI2 / notes.length
      //     const slice = (360 / notes.length)
      //     return `rotate(${-90 + slice * i}, 250, 250) translate(200)`
      //   })

//   const labels = svg.select('#nodes')
//     .append("text")
//     // .attr('x', 0)
//     .attr('transform', (d) => {
//       return `translate(200)`
//       })
//     .attr('text-anchor', 'middle')
//     .text((d, i) => d)
//       .style('font-size', '10px')
//       .style('fill', 'black')
// }

const triads = ["A", "B", "C", "D", "E", "F", "G"]
populateNotes(triads)
