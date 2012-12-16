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
        <span id='start-automaton' class='control'>Start automaton</span>
        <span id='stop-automaton' class='control'>Stop automaton</span>
        <span id='reset-automaton' class='control'>Reset automaton</span>
        <span id='highlight-seed' class='control'>Highlight seed</span>
        <br><br>
        <span class='label'>2500 cells</span><br>
        <span class='label'>Generation: <span id='generation'>0</span></span>
      </div>
    </div>
  </body>
</html>
