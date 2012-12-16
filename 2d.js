$(document).ready(function(){
    
    var canvas = document.getElementById('canvas')
    c = canvas.getContext('2d');

    var rows = 50;
    var columns = 50;

    var cellWidth = canvas.width / rows;
    var cellHeight = canvas.height / columns;

    function cell(x, y, h, l) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.l = l;

        this.radius = this.l / 2;
        this.x += this.l / 2;
        this.y += this.h / 2;
//        c.beginPath();
//        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//        c.fill();

        this.state = 0;

        this.kill = function() {
            c.fillStyle = "rgb(255,255,255)";
            //c.fillRect(this.x, this.y, this.h, this.l);
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            c.fill();
            this.state = 0;
        }

        this.revive = function() {
            c.fillStyle = "rgb(0,0,0)";
            //c.fillRect(this.x, this.y, this.h, this.l);
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            c.fill();
            this.state = 1;
        }

//        this.redraw = function() {
//            c.fillStyle = this.state == 1 ? "rgb(0,0,0)" : "rgb(255,255,255)";
//            c.fillRect(this.x, this.y, this.h, this.l);
//        }
//
        this.highlight = function() {
            c.fillStyle = "rgba(0,0,100,.5)";
            c.fillRect(this.x, this.y, this.h, this.l);
        }
    }

    function universe() {
        this.population = [];
        this.generation = 0;

        for (var i = 0; i < rows; i++) {
            var world = [];
            var x = 0;
            var y = i * cellHeight;
            for (var ii = 0; ii < columns; ii++) {
                world.push(new cell(x, y, cellWidth, cellHeight));
                x += cellWidth;
                Math.random() > .5 ? world[ii].revive() : world[ii].kill();
                //world[ii].state ? world[ii].highlight() : '';
            }
            this.population.push(world);
        }

        this.print = function() {
            for (var i = 0; i < rows; i++) {
                var s = '';
                for (var ii = 0; ii < columns; ii++) {
                    s += this.population[i][ii].state;
                }
                console.log(s);
            }
        }

        this.highlight = function() {
            for (var i = 0; i < rows; i++) {
                for (var ii = 0; ii < columns; ii++) {
                    if (this.population[i][ii].state == 1) {
                        this.population[i][ii].highlight();
                    }
                }
            }
        }

        this.redraw = function() {
            for (var i = 0; i < rows; i++) {
                for (var ii = 0; ii < columns; ii++) {
                    if (this.population[i][ii].state == 1) {
                        this.population[i][ii].redraw();
                    }
                }
            }
        }
    }

    function tick(automaton) {
        automaton.generation += 1;
        var universe = automaton.population;
        var newUniverse = [];
        for (var i = 0; i < universe.length; i++) {
            newUniverse[i] = [];
            for (var ii = 0; ii < universe[i].length; ii++) {
                var neighbors = (universe[i][ii+1] ? universe[i][ii+1].state : 0) +
                                (universe[i][ii-1] ? universe[i][ii-1].state : 0) +
                                (universe[i+1] ? 
                                    (universe[i+1][ii] ? universe[i+1][ii].state : 0) +
                                    (universe[i+1][ii+1] ? universe[i+1][ii+1].state : 0) +
                                    (universe[i+1][ii-1] ? universe[i+1][ii-1].state : 0)
                                    : 0) +
                                (universe[i-1] ? 
                                    (universe[i-1][ii] ? universe[i-1][ii].state : 0) +
                                    (universe[i-1][ii-1] ? universe[i-1][ii-1].state : 0) +
                                    (universe[i-1][ii+1] ? universe[i-1][ii+1].state : 0)
                                    : 0);
                universe[i][ii].neighbors = neighbors;
                if (universe[i][ii].state == 1) {
                    if (neighbors < 2 || neighbors > 3) {
                        newUniverse[i][ii] = 0;
                    } else { 
                        newUniverse[i][ii] = 1;
                    }
                } else {
                    newUniverse[i][ii] = (neighbors == 3 ? 1 : 0);
                }
            }
        }
        for (var i in newUniverse) {
            for (var ii in newUniverse[i]) {
                newUniverse[i][ii] ? universe[i][ii].revive() : universe[i][ii].kill();
            }
        }
        $('#generation')[0].innerHTML = automaton.generation;
    }

    var automaton = new universe();
    var tickID = 0;

    $('#controls #start-automaton').click(function(e){
        tickID = setInterval(function(){tick(automaton)}, 100);
        $('#controls #start-automaton').hide();
        $('#controls #stop-automaton').show();
//        $('#controls #highlight-seed').show();
    });

    $('#controls #stop-automaton').click(function(e){
        clearInterval(tickID);
        $('#controls #stop-automaton').hide();
        $('#controls #start-automaton').show();
    });

//    $('#controls #reset-automaton').click(function(e){
//        clearInterval(tickID);
//        $('#controls #stop-automaton').hide();
//        $('#controls #start-automaton').show();
//        automaton.generation = 0;
//        automaton.population = JSON.parse(seed);
//        $('#generation')[0].innerHTML = automaton.generation;
//        automaton.redraw();
//    });

//    $('#controls #highlight-seed').click(function(e){
//        seed.highlight();
//    });

});
