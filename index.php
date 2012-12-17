<html>
  <head>
    <title>cellular automaton</title>
    <link type='text/css' rel='stylesheet' href='style.css'>
    <script type='text/javascript' src='jquery-core.js'></script>
    <script type='text/javascript' src='1d.js'></script>
    <script type='text/javascript' src='2d.js'></script>
  </head>
  <body>
    <div id='2d-container'>
      <canvas width='750px' height='750px' id='2d-automaton'></canvas>
      <div id='controls'>
        <h1>2D</h1>
        <span class='label'>Generation <span id='generation'>0</span></span>
        <br>
        <span class='label'>2500 cells</span>
        <br><br>
        <span id='start-automaton' class='control'>Start automaton</span>
        <span id='stop-automaton' class='control'>Stop automaton</span>
      </div>
    </div>
    <div id='1d-container'>
      <canvas width='750px' height='750px' id='1d-automaton'></canvas>
      <div id='controls'>
        <h1>1D</h1>
        <br>
        <span class='label'>100 Generations</label><br>
        <span class='label'>100 Cells</label>
        <br><br>
        <span id='regenerate-automaton' class='control'>Regenerate automaton</span>
      </div>
    </div>
  </body>
</html>
