# scriptreplay.js

Embed and replay with [script](https://linux.die.net/man/1/script) recorded terminal sessions in HTML pages.

```bash
script -t=timing mysession
```

```html
<html>
  <head>
    <script src='./scriptreplay.js'></script>
    <script>
      window.addEventListener('load', () => {
        scriptreplay("mysession", "timing", document.querySelector('#terminal'))
      })
    </script>
  </head>
  <body>
    <div id="terminal"></div>
  </body>
</html>
```

Embed as many terminals as you want into your page. Each one can be paused and played.

<img src="https://raw.githubusercontent.com/h43z/scriptreplayjs/master/demo.gif" width="600"/>

For testing in chrome make sure index.html is served by a webserver.
