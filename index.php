<html>
  <head>
    <title>cellular automaton</title>
    <link type='text/css' rel='stylesheet' href='style.css'>
    <script type='text/javascript' src='jquery-core.js'></script>
    <script type='text/javascript' src='2d.js'></script>
  </head>
  <body>
    <div id='container'>
      <canvas width='750px' height='750px' id='canvas'></canvas>
      <div id='controls'>
        <h1>2D</h1>
        <div id='start-automaton' class='control'>Start automaton</div>
        <div id='stop-automaton' class='control'>Stop automaton</div>
        <div id='reset-automaton' class='control'>Reset automaton</div>
        <div id='highlight-seed' class='control'>Highlight seed</div>
        <br>
        Generation: <span id='generation'>0</span>
      </div>
    </div>
  </body>
</html>
