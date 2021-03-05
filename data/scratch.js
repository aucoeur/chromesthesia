// const chords = data.map((d) => d.chord)
// console.log(chords)

function getIndexRangeOfSongs(data, property) {
  const byIndex = []
  data.map((d, i) => {
    d[property] !== "" ? byIndex[d[property]] = i : null
  })
  return byIndex
}

async function wrangleData(file) {
  // const headers = `filename,timestamp,A,A♯,B,C,C♯,D,D♯,E,F,F♯,G,G♯,
  // ${data}` // chroma A-G#
  // const withHeaders = d3.csvParse(headers)

  // csvParseRows doesn't require headers T_T
  const data = await d3.text(file)
  const rows = d3.csvParseRows(data)

  return rows.slice(0,10)
    .map((row) => {return row.slice(2,-1)})

}

// gotta do this so we can get the array and not promise as return
async function getMatrix() {
  const chordData = await wrangleData(file)
//   // console.table(matrix)

//   const chordData = Object.assign(matrx,
//     {
//       chromas: ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E" , "F", "F♯", "G", "G♯"],
//       colors: ["#43c9b0","#6c8232","#bc813e","#ba4758","#6d80d8","#b2457c", "#56b772","#5b378a", "#b84f36", "#c873c6", "#c7a63b","#82b74e"]
//     })

//   console.log({chordData})
  return chordData
}
// const m = getMatrix()
