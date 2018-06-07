function loadScript(url, callback){
  let script = document.createElement('script')
  script.onload = callback
  script.src = url
  document.head.appendChild(script)
}

function loadCss(url, callback){
  let link = document.createElement('link')
  link.href =  url
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.onload = callback
  document.head.appendChild(link)
}

async function scriptreplay(typescriptFile, timingFile, element){
  let typescript
  let timings = []

  const term = new Terminal()
  term.open(element, false)

  await fetch(typescriptFile)
    .then(response => response.text())
    .then(text  => typescript = text)

  typescript = typescript.replace(/.*\n/, '')

  await fetch(timingFile)
    .then(response => response.text())
    .then(text  => timings = text.split('\n'))

  function print(line, lastPos, output){
    let [time, length] = timings[line].split(' ')

    if(!length || !time){
      term.clear()
      print(0, 0, '')
      return
    }

    term.write(output)
    output = typescript.slice(lastPos, lastPos + parseInt(length))
    lastPos += parseInt(length)

    setTimeout((ln, lp, o) => {
      print(ln, lp, o)
    }, parseFloat(time) * 1000, ++line, lastPos, output)
  }

  print(0, 0, '')
}

loadCss('https://cdnjs.cloudflare.com/ajax/libs/xterm/2.9.2/xterm.css')
loadScript('https://cdnjs.cloudflare.com/ajax/libs/xterm/2.9.2/xterm.js')
