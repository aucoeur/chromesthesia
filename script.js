// const d3 = require('d3');
// const d3Transform = require('d3-transform');
// json looks like this:
// {
//   "song": "rondo a capriccio g major op.129 rage over a lost penny",
//   "chords": [{
//       "timestamp": 0.5,
//       "chord": "G_maj"
//     },
//      {
//       "timestamp": 2.0,
//       "chord": "D_maj_min7"
//     },
//   ]
// }
// function (i, chords) {
//         console.log(Object.entries(chords))
//         return chords[i]
//       }

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
    .attr('width', 500)
    .attr('height', 500)

// create groups within the svg
svg
  .append("g")
    .attr('id', 'outer')
  .append("circle")
    .attr('title', 'biggun')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r',200)
    .style('stroke', "#FFFFFF")
    .style('stroke-width', 4)
    .style('fill', "transparent")
svg
  .append("g")
    .attr("id", "nodes")
      .style('stroke', "white")
      .style('stroke-width', 2)
      .style('fill', "white")

function populateNotes() {
  const notes = ["A", "B", "C", "D", "E", "F", "G"]
  svg.select('#nodes')
    .selectAll("circle")
    .data(notes)
    .enter()
    .append("circle")
      .attr('id', (d, i) => {return `${d}`})
      .attr('cx', 250)
      .attr('cy', 250)
      .attr('r', 20)
      .attr('transform', (_,i) => {
          // use degrees not radians
          // const PI2 = Math.PI * 2
          // const slice = PI2 / notes.length
          const slice = (360 / notes.length)
          return `rotate(${-90 + slice * i}, 250, 250) translate(200)`
        })
}

populateNotes()
