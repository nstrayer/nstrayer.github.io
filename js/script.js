var width   = parseInt(d3.select("body").style("width").slice(0, -2)),
    height  = $(window).height() - 70,
    padding = 20,
    line_drawer;

////////// Random Walk draw code //////////
var canvas = d3.select("#randomWalkCanvas")
    .append("canvas")
    .attr("width", width*2)
    .attr("height", height*2)
    .style("width", width + "px")
    .style("height", height + "px   ");

var svg = d3.select("#introSvg").append("svg")
    .attr("width", width)
    .attr("height", height + 2 * padding)
    .append("g");

var context = canvas.node().getContext("2d");

// ====================== Function for generating a random walk and drawing it to canvas ======================
var lets_go_walking = function(canvas, context, height, width){
    //Random walks!
    var number_of_steps = 5000,
        number_of_directions = 5,
        step_length = 5,
        current_point = 0; //step counter for walk animation.

    function nextStep(current) {
    	var pi = 3.1415926;
    	var theta = Math.random() * (2 * pi);

    	var x_direction = Math.cos(theta) * step_length;
    	var y_direction = Math.sin(theta) * step_length;

    	return {x: current.x + x_direction, y: current.y + y_direction}
    }

    //a recursive randome walk function.
    function go_walking(i, num_steps, walk){
    	if(i < num_steps){
    		walk.push(nextStep(walk[i]));
    		go_walking(i+1, num_steps, walk);
    	}
    	return(walk);
    }

    // Simulate the random walk real quick...
    var ourWalk = go_walking(0, number_of_steps, [{x: 0, y: 0}]);

    //draw
    var x_range = d3.extent(ourWalk, (v) => v.x);
    var y_range = d3.extent(ourWalk, (v) => v.y);

    var x = d3.scaleLinear()
        .domain(x_range)
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain(y_range)
        .range([height, 0]);

    var color = d3.scaleLinear()
        .domain([0,number_of_steps])
        .range(["#e41a1c","#377eb8", "#4daf4a", "#984ea3"]);

    //We animate through drawing the curve by adding a point at a time and drawing from there.
    function draw(){

        //take a slice of the whole walk up till whichever step we are currently at in the animation.
        var drawing_points = ourWalk.slice(0, current_point)

        // clear the canvas
        context.clearRect(0, 0, width, height);
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, 0);
        context.globalAlpha = 0.55;
        drawing_points.forEach((d, i) => {
            context.beginPath();
            //if it's the first step start in middle, otherwise start where last line ended.
            var move_to = i > 1 ? drawing_points[i-1]: {x: 0, y: 0};
            context.strokeStyle = color(i); //set our color here.
            context.moveTo(x(move_to.x),y(move_to.y));
            context.lineTo(x(d.x), y(d.y));
            context.stroke();
            context.closePath();
        })
        context.stroke();
        context.closePath();

        //increment point forward
        current_point++;

        //kill the interval repetition if we've drawn all the lines.
        if(current_point > number_of_steps){
            clearInterval(line_drawer);
        }
    }

    //run it.
    line_drawer = setInterval(draw, 2);

}

// ====================== Svg intro overlay for click events/ greeting ======================
var intro_text = isMobile ? "tap" : "click";

var intro = svg.append("text")
    .text("Let's Go Walking (" + intro_text + ")")
    .attr("font-size", 35)
    .attr("font-family", "optima")
    .attr("text-anchor", "middle")
    .attr("x", width/2)
    .attr("y", height/2)


// ====================== start visualization when user clicks ======================
d3.select("#introSvg")
    .on("click", () => {

        clearInterval(line_drawer);

        lets_go_walking(canvas, context, height, width);

        intro
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove()

        writeGreeting()

        //disable click to load again on mobile. May add back later but currently causes too much hasle on mobile.
        if(isMobile){
            d3.select("#introSvg").on("click",false);
        }
    });

// ====================== On resize do another random walk! ======================

var resizeTimer; //for debouncing, see inside function
d3.select(window).on('resize', ()=>{
    //debounce the resize to elimate overactive events.
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      //kill any currently animating walks.
      clearInterval(line_drawer);

      //grab new width and height
      width  = parseInt(d3.select("body").style("width").slice(0, -2))
      height = $(window).height() - 70,

      //update canvas.
      canvas
          .attr("width", width*2)
          .attr("height", height*2)
          .style("width", width)
          .style("height", height);

      svg
          .attr("width", width)
          .attr("height", height + 2 * padding)

      //new walk.
      lets_go_walking(canvas, context, height, width);

      //redraw intro text.
      writeGreeting();

    }, 250);
});

function writeGreeting(){

    svg.selectAll("text").remove();

    var title = svg.append("text")
        .attr("font-size", 30)
        .attr("font-family", "optima")
        .attr("text-anchor", "end")
        .attr("fill-opacity", 0.65)
        .attr("y", height - 6*padding);

    var hiSegment = title.append("tspan")
        .attr("dy", "1.2em")
        .attr("x", width - padding)
        .text("hi...")
        .attr("font-size", 40);

    var lessExciting = title.append("tspan")
        .attr("dy", "1.6em")
        .attr("x", width - padding)
        .html("");

    (function drawGreeting (i, start, greeting) {
        setTimeout(function () {

            //add next letter to the greeting in progress
            start += i == greeting.length ? " &#8681" : greeting[i];

            lessExciting.html(start) //append this to the html

            if (start.length < greeting.length + 1) { //if the in progress greeting is less than the full, keep going.
                drawGreeting(i+1,start,greeting);      //  increment i and call again.
            };
        }, 200)

    })(0, "", "less exciting stuff");
}

////////// end random walk draw code //////////


//function to draw projects section.
function draw_projects(proj_data){

    var entry = d3.select("#projectsDiv")
        .selectAll(".project")
        .data(proj_data).enter()
        .append("div")
        .attr("class", function(d,i){return i == 0? "row":"row project" })
        .each(function(proj){
            //draw picture
            var pic = d3.select(this)
                .append("div")
                .attr("class", "col-xs-12 col-sm-6 text-center")

            pic.append("a")
                .attr("href", proj.link)
                .append("img")
                .attr("class", "projectPic")
                .attr("src", proj.photo)

            //generate the title and descriptions
            var proj_descrip = d3.select(this) //make the holder.
                .append("div")
                .attr("class", "col-xs-12 col-sm-6")

            proj_descrip.append("strong") //append the title.
                .attr("class", "projectTitle")
                    .append("a")
                    .attr("href", proj.link)
                    .attr("target", "_blank")
                    .text(proj.title)

            proj_descrip.append("ul") //append the description bullet point list
                .selectAll("li")
                .data(proj.descriptions).enter()
                .append("li")
                .html(function(d){return d})

            if(proj.github != null){
                proj_descrip.select("ul") //append github repo to end of list
                    .append("li")
                    .append("a")
                    .attr("href", proj.github)
                    .text("Github repo.")
            }

        })
}

draw_projects(proj_data)
