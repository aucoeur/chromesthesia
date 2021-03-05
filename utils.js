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
  return rows.slice(4, 14)
}

let chords = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E" , "F", "F♯", "G", "G♯"]

// gotta do this so we can get the array and not promise as return
async function getMatrix() {
  const matrix = await wrangleData(file)
  // console.table(matrix)

  const chordData = Object.assign(matrix,
    {
      chroma: ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E" , "F", "F♯", "G", "G♯"],
      colors: ["#43c9b0","#6c8232","#bc813e","#ba4758","#6d80d8","#b2457c", "#56b772","#5b378a", "#b84f36", "#c873c6", "#c7a63b","#82b74e"]
    })

  console.table(chordData)
}

getMatrix()
