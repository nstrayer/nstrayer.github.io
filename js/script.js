var width = parseInt(d3.select("body").style("width").slice(0, -2)),
    height = $(window).height() - 30,
    padding = 20,
    numOfLines = 20,
    xs = _.range(0.01, 5, .07),
    colors = ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)',
        'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)', 'rgb(49,54,149)'
    ];

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
        .remove()
}

// The Scales:
var thetaMap = d3.scale.linear() //name the values from 0 to 20 and make their values from .1-.7
    .domain([0, numOfLines])
    .range([0.8, 0.085])

var yPos = d3.scale.linear() //scalling for creating horizontal lines
    .domain([0, numOfLines])
    .range([0, 4])
    //.range([-4, 4])

var x = d3.scale.linear()
    .domain([0, 5])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 4])
    //.domain([-5, 5])
    .range([height, 0]);

// The line data:
var logistic = _.map(d3.range(numOfLines), function(i) {
    var odd = true
        // if (i % 2 !== 0) {
        //     odd = false
        //     i = i - 1
        // }
    var toReturn = _.map(xs, function(num) {
        var sign = -1
        if (odd) {
            sign = 1
        }
        return {
            "x": num,
            "y": sign * logistic(num, thetaMap(i), i)
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
    .x(function(d) {
        return x(d.x);
    })
    .y(function(d) {
        return y(d.y);
    });

var svg = d3.select("#intro").append("svg")
    .attr("width", width)
    .attr("height", height + 2 * padding)
    .append("g")

var title = svg.append("text")
    .text("hi")
    .attr("font-size", 40)
    .attr("font-family", "optima")
    .attr("text-anchor", "end")
    .attr("fill-opacity", 0.0)
    .attr("x", x(4.7))
    .attr("y", y(2.5))


function change(newData) {
    svg.selectAll(".line")
        .data(newData)
        .transition()
        .duration(1500)
        .delay(function(d, i) {
            return 70 * i
        })
        .attr("class", "line")
        .attr("d", line);

    title
        .transition()
        .duration(4000)
        .attr("fill-opacity", 1)

    intro
        .transition()
        .duration(800)
        .attr("fill-opacity", 0)
        .remove()

}


svg.selectAll(".line")
    .data(logistic)
    .enter().append("path")
    .attr("class", "line")
    .attr("id" , function(d, i){ return "line" + i;})
    .attr("d", line)
    .style("stroke-width", 2)
    .style("stroke", function(d, i) {
        return colors[i % 10]
    })
    .style("opacity", 0)

d3.select("svg")
    .on("click", function() {
        // change(logistic)
        animatelines(2)
    })

var introMessage = "Click"
if (isMobile) {
    introMessage = "Tap"
}

var intro = svg.append("text")
    .text(introMessage)
    .attr("font-size", 45)
    .attr("font-family", "optima")
    .attr("text-anchor", "middle")
    .attr("x", x(2.5))
    .attr("y", y(2.01))
