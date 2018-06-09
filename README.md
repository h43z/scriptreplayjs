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

For testing in chrome make sure index.html is served by a webserver.
