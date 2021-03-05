// https://www.audiolabs-erlangen.de/resources/MIR/cross-comp
console.log('boop')

const file = 'data/chroma-nnls_01_bach.csv'


// initialize variables
async function wrangleData(file) {
  const data = await d3.text(file)

  // csvParseRows doesn't require headers T_T
  const rows = d3.csvParseRows(data)
    .map((row) => {
      // lop off the first two columns
      return row.slice(2,-1)
    })

  // i've been humbled ok
  return rows.slice(4, 16)
}

let chords = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E" , "F", "F♯", "G", "G♯"]

// gotta do this so we can get the array and not promise as return
async function getMatrix() {
  const chordData = await wrangleData(file)
  console.table({chordData})
  return chordData
}

// const matrix = getMatrix()
const matrix = [[0.0, 22.0, 24.0, 32.0, 6.0, 57.0, 24.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 0.0, 24.0, 32.0, 6.0, 57.0, 24.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 0.0, 32.0, 6.0, 57.0, 24.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 0.0, 6.0, 57.0, 24.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 0.0, 57.0, 24.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 0.0, 24.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 57.0, 0.0, 40.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 57.0, 24.0, 0.0, 20.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 57.0, 24.0, 40.0, 0.0, 4.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 57.0, 24.0, 40.0, 20.0, 0.0, 69.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 57.0, 24.0, 40.0, 20.0, 4.0, 0.0, 14.0], [36.0, 22.0, 24.0, 32.0, 6.0, 57.0, 24.0, 40.0, 20.0, 4.0, 69.0, 0.0]];

const chromas = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E" , "F", "F♯", "G", "G♯"]

const color = ["#43c9b0","#6c8232","#bc813e","#ba4758","#6d80d8","#b2457c", "#56b772","#5b378a", "#b84f36", "#c873c6", "#c7a63b","#82b74e"]

const chroma = d3.scaleOrdinal()
  .domain(color)
  .range(chromas)


const colors = d3.scaleOrdinal()
  .domain(chromas)
  .range(color)

// header
d3.select('#chroma')
  .append('h4')
    .attr('id', 'chromaHead')
    .text('chord diagram..or a quarter of it')
    // .text('loading data..')

const margin = {top: 10, right: 10, bottom: 10, left: 10}
const width2 = 600 - margin.left - margin.right
const height2 = 600 - margin.top  - margin.bottom
const innerRadius = Math.min(width, height)  * .35 //35% of smallest measurement
const outerRadius = innerRadius * 1.1; //110% of inner radius

const chord = d3.chord()
  // uses radians not degrees .. T_T
  // .padAngle(1/12)
const matrch = chord(matrix)

const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)
  // .startAngle(startAngle)
  // .endAngle(endAngle)

const ribbon = d3.ribbon()
  .radius(innerRadius)
  //  .startAngle(startAngle)
  //   .endAngle(endAngle)

function drawChord() {
  const svg = d3.select('#chroma')
    .append("svg")
      .attr('width', width2)
      .attr('height', height2)
      .classed('view', true)
      .attr("viewBox", [0, 0, width2, height2])
      .attr("transform", `translate(${width2 / 2}, ${height2 / 2})`)


  // the arc
  const group = svg
    .selectAll("g")
    .data(matrch.groups)
    .join("g")
    .classed("group", true)

    group.append("path")
      .data(matrch.groups)
      .attr("fill", (d, i) => colors(i))
      .attr("stroke",(d, i) => `#FFFFFF`)
      .attr("stroke-width", 1)
      .attr("d", arc)

    group.append("title")
      .text((i) => chroma(i))
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

  // the ribbons
  const links = svg
    .selectAll("g")
    .data(matrch)
    .join("g")
    .classed("chord", true)

  links
    .append("path")
    .attr("d", ribbon)
    .attr("fill", (d, i) => colors(i))
    .attr("opacity", 0.7)
}
drawChord();
