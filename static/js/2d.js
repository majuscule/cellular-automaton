$(document).ready(function(){
    
    var canvas = $('#2d-automaton')[0];
    var c = canvas.getContext('2d');


    function cell(x, y, h, l) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.l = l;
        this.state = 0;
        this.kill = function() {
            c.fillStyle = "rgb(255,255,255)";
            c.fillRect(this.x, this.y, this.h, this.l);
            this.state = 0;
        }
        this.revive = function() {
            c.fillStyle = "rgb(0,0,0)";
            c.fillRect(this.x, this.y, this.h, this.l);
            this.state = 1;
        }
        this.toggle = function() {
            this.state ? this.kill() : this.revive();
        }
    }

    function universe(blank) {
        this.population = [];
        this.generation = 0;
        this.running = 0;
        this.tickID = 0;

        this.blank = blank || 0;
        
        this.rows = 50;
        this.columns = 50;

        this.cellWidth = canvas.width / this.rows;
        this.cellHeight = canvas.height / this.columns;

        for (var i = 0; i < this.rows; i++) {
            var world = [];
            var x = 0;
            var y = i * this.cellHeight;
            for (var ii = 0; ii < this.columns; ii++) {
                world.push(new cell(x, y, this.cellWidth, this.cellHeight));
                x += this.cellWidth;
                if (this.blank) { world[ii].kill(); }
                else { Math.random() > .5 ? world[ii].revive() : world[ii].kill(); }
            }
            this.population.push(world);
        }

        this.start = function() {
            this.tickID = setInterval(function(){tick(automaton)}, 100);
            this.running = 1;
        }

        this.stop = function() {
            clearInterval(this.tickID);
            this.running = 0;
        }

        this.toggle = function() {
            this.running ? this.stop() : this.start();
        }

        this.redraw = function() {
            for (var i = 0; i < this.rows; i++) {
                for (var ii = 0; ii < this.columns; ii++) {
                    if (this.population[i][ii].state == 1) {
                        this.population[i][ii].redraw();
                    }
                }
            }
        }

        this.serialize = function() {
            var serial = '';
            for (var i = 0; i < this.rows; i++) {
                for (var ii = 0; ii < this.columns; ii++) {
                    serial += this.population[i][ii].state;
                }
            }
            return serial;
        }

        this.populate = function(seed) {
            for (var i = 0; i < this.rows; i++) {
                for (var ii = 0; ii < this.columns; ii++) {
                    seed[i][ii] ? this.population[i][ii].revive()
                                : this.population[i][ii].kill();
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

    var automaton = new universe;
    if (SEED != 0) automaton.populate(SEED);

    $('#controls #start-automaton').click(function(e){
        automaton.start();
        $('#controls #start-automaton').hide();
        $('#controls #stop-automaton').show();
    });

    $('#controls #stop-automaton').click(function(e){
        automaton.stop();
        $('#controls #stop-automaton').hide();
        $('#controls #start-automaton').show();
    });

    $('#controls #reseed-automaton').click(function(e){
        automaton.stop();
        $('#controls #stop-automaton').hide();
        $('#controls #start-automaton').show();
        automaton = new universe();
    });

    $('#controls #custom-seed-automaton').click(function(e){
        automaton.stop();
        $('#controls #stop-automaton').hide();
        $('#controls #start-automaton').show();
        automaton = new universe(1);
    });

    $('#save-automaton-seed').click(function(e) {
        $.ajax({
            type : 'POST',
            url : POST_URL,
            dataType : 'json',
            data: {
                seed : automaton.serialize()
            },
            success : function(data){
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });

    $('#2d-automaton').click(function(e) {
        if (!automaton.running) {
            var x = e.pageX - $('#2d-automaton').offset().left;
            var y = e.pageY - $('#2d-automaton').offset().top;
            var row = Math.floor(y / automaton.cellHeight);
            var column = Math.floor(x / automaton.cellWidth);
            automaton.population[row][column].toggle();
        }
    });

});
