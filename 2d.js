$(document).ready(function(){
    
    var cells = 20;
    var generations = 10;

    var state = {
        '000' : '0',
        '001' : '0',
        '010' : '0',
        '011' : '1',
        '100' : '0',
        '101' : '1',
        '110' : '1',
        '111' : '0',
    }

    var canvas = document.getElementById('canvas')
    var c = canvas.getContext('2d');

    var cellWidth = Math.floor(canvas.width / cells);
    var cellHeight = Math.floor(canvas.height / generations);
    var generation = 0;

    function cell(x, y, h, l) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.l = l;
        this.state = 0;
        this.kill = function() {
            c.fillStyle = "rgb(200,0,0)";
            c.fillRect(this.x, this.y, this.h, this.l);
            this.state = 0;
        }
        this.revive = function() {
            c.fillStyle = "rgb(0,0,0)";
            c.fillRect(this.x, this.y, this.h, this.l);
            this.state = 1;
        }
    }

    function populate_world() {
        var world = [];
        var x = 0;
        var y = 0;
        for (var i = 0; i < cells; i++) {
            world.push(new cell(x, y, cellHeight, cellWidth));
            x += cellWidth;
            Math.random() > .5 ? world[i].revive() : world[i].kill();
        }
        return world;
    }

    function generate() {
        generation += 1;
        var x = 0;
        var y = generation * cellHeight;
        var s = '0' + world.map(function(c) { return c.state }).join('') + '0';
        world = [];
        for (var i = 0; i < cells; i++) {
            world.push(new cell(x, y, cellHeight, cellWidth));
            x += cellWidth;
            state[s.substr(i, 3)] == 1 ? world[i].revive() : world[i].kill();
        }
        //if (generation == generations) { clearInterval(tick_id) }
    }

    var world = populate_world();
    while (generations) { generate(); generations-- }
    //var tick_id = setInterval(generate, 100);

});
