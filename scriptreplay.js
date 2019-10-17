async function scriptreplay(typescriptFile, timingFile, element){
  let typescript
  let timings = []
  let timer
  let pauseBtn

  Terminal.applyAddon(fit)
  let term = new Terminal()
  element.innerHTML = ''
  term.open(element, false)
  term.fit()

  addOverlayPause(element)

  element.addEventListener('mouseenter', toggleOverlayPause)
  element.addEventListener('mouseleave', toggleOverlayPause)

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
      term.reset()
      print(0, 0, '')
      return
    }

    term.write(output)
    output = typescript.slice(lastPos, lastPos + parseInt(length))
    lastPos += parseInt(length)

    timer = new Timer((ln, lp, o) => {
      print(ln, lp, o)
    }, parseFloat(time) * 1000, ++line, lastPos, output)
  }

  function Timer(callback, delay, ...args) {
    let timerId, start, remaining = delay
    
    this.running = true

    this.pause = () => {
      this.running = false
      clearTimeout(timerId)
      remaining -= new Date() - start
      pauseBtn.innerHTML = '&#x23f4;'
    }

    this.resume = () => {
      this.running = true
      start = new Date()
      clearTimeout(timerId)
      timerId = setTimeout(callback, remaining, ...args)
      pauseBtn.innerHTML = '&#x23f8;'
    }

    this.resume()
  }

  function toggleReplay(){
    if(timer && timer.running){
      timer.pause()
    }else if(timer && !timer.running){
      timer.resume()
    }
  }

  function addOverlayPause(toElement){
    toElement.style.position = 'relative'

    pauseBtn = document.createElement('button')

    let style = `
    position: absolute;
    bottom: calc(50% - 55px);
    left: calc(50% - 55px);
    height: 110px;
    width: 110px;
    display: none;
    border-radius: 50%; 
    border: none; 
    outline: none; 
    text-align: center; 
    font-size: 100px; 
    font-weight: bold; 
    line-height: 120px; 
    color: #ecf0f1; 
    background-color: #2f3640;
    z-index: 99999999;
    `

    pauseBtn.style.cssText = style 

    pauseBtn.innerHTML = '&#x23f8;'
    pauseBtn.onclick = toggleReplay

    toElement.appendChild(pauseBtn)
  }

  function toggleOverlayPause(){
    if(pauseBtn.style.display == 'none'){
      pauseBtn.style.display = 'block'
    }else{
      pauseBtn.style.display = 'none'
    }
  }

  print(0, 0, '')
}

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

loadCss('https://cdn.jsdelivr.net/npm/xterm@3.4.1/dist/xterm.min.css')
loadScript('https://cdn.jsdelivr.net/npm/xterm@3.4.1/dist/xterm.min.js')
loadScript('https://cdn.jsdelivr.net/npm/xterm@3.4.1/dist/addons/fit/fit.min.js')
