const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poemData) => {
  let htmlString = makeTag('h2')(poemData[0].title)
  //this uses pipe to apply both functins to the author text
  htmlString += pipe(makeTag('em'), makeTag('h3')) (`by ${poemData[0].author}`)
  //gets lines of the first poem
  const poetryArray = poemData[0].lines
  //joining poem lines with the br tags to make line breaks
  const lines = poetryArray.join('<br>')
  //splits poem into stanzas when 2 br tags are found together
  const stanzas = lines.split('<br><br>')
  //wraps each stanza in paragraph element
  const makeStanzas = stanzas.map(stanza => makeTag(`p`)(stanza))
  //combing stanza paragraphs without , seperator for html string
  const stringStanzas = makeStanzas.join('')
  console.log("stanza: "+ stringStanzas)
  htmlString += stringStanzas
  return htmlString
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
