async function scriptreplay(typescriptFile, timingFile){

  let typescript
  let timings = []

  const term = new Terminal()
  term.open(document.getElementById('terminal'))

  await fetch(typescriptFile)
    .then(response => response.text())
    .then(text  => typescript = text)

  //remove first line
  typescript = typescript.replace(/.*\n/, '')

  await fetch(timingFile)
    .then(response => response.text())
    .then(text  => {
      timings = text.split('\n') 
    })


  function print(line, lastPos, output){
    let [time, length] = timings[line].split(' ')

    console.log(line, time, length)

    if(!length || !time){
      return
    }

    term.write(output)

    output = typescript.slice(lastPos, lastPos + parseInt(length))
    lastPos += parseInt(length)

    setTimeout((ln, lp, o) => {
      print(ln, lp, o)
    }, time*1000, ++line, lastPos, output)
  }


  print(0, 0, '')
}

