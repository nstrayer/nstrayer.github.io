var width   = parseInt(d3.select("body").style("width").slice(0, -2)),
    height  = $(window).height() - 30,
    padding = 20,
    numOfLines = 20,
    xs = _.range(0.01, 5, .07),
    colors = ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)',
        'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)', 'rgb(49,54,149)'
    ];

//define the svg.
var svg = d3.select("#intro").append("svg")
    .attr("width", width)
    .attr("height", height + 2 * padding)
    .append("g")

//define the pdf of the distribution.
var logistic = function(x, theta, i) {
    var mu = 0.1;
    sign = 1
    var y = sign * (1 / (Math.sqrt(2 * Math.PI) * theta)) * (1 / x) *
        Math.exp(-Math.pow((Math.log(x) - mu), 2) / (2 * Math.pow(theta, 2)))
    return y;
}

var animatelines = function(whichline) {
    d3.selectAll(".line").style("opacity","0.5");

    //Select All of the lines and process them one by one
    d3.selectAll(".line").each(function(d,i){
        // Get the length of each line in turn
        var totalLength = d3.select("#line" + i).node().getTotalLength();

        d3.selectAll("#line" + i).attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(5000)
          .delay(100*i)
          .ease("quad") //Try linear, quad, bounce... see other examples here - http://bl.ocks.org/hunzy/9929724
          .attr("stroke-dashoffset", 0)
          .style("stroke-width",2)
    })

    intro
        .transition()
        .duration(800)
        .attr("fill-opacity", 0)
        .each("end", function(){
            writeGreeting()
            // title
            //     .transition()
            //     .duration(1800)
            //     .delay(800)
            //     .attr("fill-opacity", 0.65)
        })
        .remove()

}

// The Scales:
var thetaMap = d3.scale.linear() //name the values from 0 to 20 and make their values from .1-.7
    .domain([0, numOfLines])
    .range([0.8, 0.085])

var yPos = d3.scale.linear() //scalling for creating horizontal lines
    .domain([0, numOfLines])
    .range([0, 4])

var x = d3.scale.linear()
    .domain([0, 5])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 4])
    .range([height, 0]);

// The line functions:
var logistic = _.map(d3.range(numOfLines), function(i) {
    var odd = true
    var toReturn = _.map(xs, function(num) {
        return {
            "x": num,
            "y": logistic(num, thetaMap(i), i)
        }
    })

    return toReturn;
})

var horizontal = _.map(d3.range(numOfLines), function(i) {
    toReturn = _.map(xs, function(num) {
        return {
            "x": num,
            "y": yPos(i)
        }
    })

    return toReturn;
})

// The d3 stuff
var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

//make a greeting message for after the line animation.

function writeGreeting(){

    var title = svg.append("text")
        .attr("font-size", 30)
        .attr("font-family", "optima")
        .attr("text-anchor", "end")
        // .attr("fill-opacity", 0.0)
        .attr("fill-opacity", 0.65)
        .attr("x", x(4.7))
        .attr("y", y(1.5));

    var hiSegment = title.append("tspan")
        .attr("dy", "1.2em")
        .attr("x", x(4.7))
        .text("hi...")
        .attr("font-size", 40);

    var lessExciting = title.append("tspan")
        .attr("dy", "1.6em")
        .attr("x", x(4.7))
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

svg.selectAll(".line")
    .data(logistic)
    .enter().append("path")
    .attr("class", "line")
    .attr("id" , function(d, i){ return "line" + i;})
    .attr("d", line)
    .style("stroke-width", 2)
    .style("stroke", function(d, i) { return colors[i % 10] })
    .style("opacity", 0)

var introMessage = isMobile ? "tap" : "click"

var intro = svg.append("text")
    .text(introMessage)
    .attr("font-size", 45)
    .attr("font-family", "optima")
    .attr("text-anchor", "middle")
    .attr("x", x(2.5))
    .attr("y", y(2.01))

//kick it off on a click. (or tap)
d3.select("svg").on("click", function() { animatelines(2) })


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
