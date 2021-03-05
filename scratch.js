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
