var padding = 8,
	siteW = parseFloat(d3.select("body").style("width").slice(0,-2)),
	siteH = parseFloat(d3.select("#menuBar").style("height").slice(0,-2)),
	h = siteH,
	w,
	radius
	menuTextSize;

if (siteW < siteH){ //if landscape device, ala mobile
	w = siteW,
	radius = 0.2 * w;
} else {
	w = 0.3 * (siteW),
	radius = 45;
}

var	selectorWidth = w * 0.8, //Width of open/close menu button
	selectorHeight = h * 0.055,
	selectorText = selectorHeight * 0.8,
	menuOpen = false,
	menuTextSize = radius * 0.5, //Start with menu closed
	divSelection;


var cRed   = "#E74327",
	cBrown = "#E8940C",
	cBlue  = "#0CBDE8",
	cGreen = "#98C000",
	cGrey  = "#3D4C53";

var menuData = [{"name": "me",       "color": cRed  },
				{"name": "resume",   "color": cBrown},
				{"name": "projects", "color": cBlue },
				{"name": "contact",  "color": cGreen}
		 	   ]

var menuYScale = d3.scale.ordinal()
					.domain(d3.range(menuData.length))
					.rangeRoundBands([radius*1.5, h - radius*0.5]);

var menuSelectionBar = d3.select("#menuSelection")
						.append("svg")
						.attr("height", selectorHeight)
						.attr("width",  w)

var svg = d3.select("#menuBar")
				.append("svg")
				.attr("height", h)
				.attr("width",  w)

var menuAction = function(whatToDo){
	if (whatToDo == "draw"){
		d3.selectAll(".sectionDivs").classed("blurred", true)
		changeSelectorText("close menu")
		d3.select("#menuBar").style("z-index", 999)
		svg.selectAll("circle")
			.data(menuData)
			.enter()
			.append("circle")
			.attr("class","menuBubbles")
			.attr("cx", w/2)
			.attr("cy", -radius) //Start outside of window to slide down.
			.attr("fill", function(d) {return d.color})
			.transition()
			.duration(400)
			// .ease("quad")
			.attr("cy", function(d,i){ return menuYScale(i) }) //draw the circles descending the div
			.attr("cx", function(d,i) { return menuXPos(i) })
			.attr("r" , radius)
			.attr("id", function(d) {return (d.name + "Circ")})
			.each("end", function(){ //avoids transition getting messed up by interactions.
				svg.selectAll("circle").on("click", function(){
					divSelection = "#" + d3.select(this).attr("id").slice(0,-4) + "Div"
					divSwitcher(divSelection)
					menuAction("close")
					menuOpen = false
				})
			})

		svg.selectAll(".menuText")
			.data(menuData)
			.enter()
			.append("text")
			.attr("class", "menuText")
			.attr("id", function(d){return d.name + "Div"})
			.attr("x", w/2)
			.attr("y", -radius)
			.attr("text-anchor", "middle")
			.attr("font-family", "optima")
			.attr("fill", "white")
			.attr("font-size", menuTextSize)
			.text(function(d){return d.name})
			.transition()
			.duration(400)
			// .ease("quad")
			// .attr("y", function(d,i){ return ( radius*2 + ((h*i)/5)) + 6.5 })
			.attr("y", function(d,i){ return menuYScale(i) })
			.attr("x", function(d,i){ return menuXPos(i) })
			.each("end", function(){ //avoids transition getting messed up by interactions.
				svg.selectAll(".menuText").on("click", function(){
					divSelection = "#" + d3.select(this).attr("id")
					divSwitcher(divSelection)
					menuAction("close")
					menuOpen = false
				})
			})


	} else { //Close menu
		d3.selectAll(".sectionDivs").classed("blurred", false) //Unblur the sections
		changeSelectorText("menu")	 //Change menu text to open menu
		d3.select("#menuBar").style("z-index", -999) //send menubar to back of page so text can be selected
		svg.selectAll(".menuBubbles")
			.transition()
			.attr("cy", -radius) //Shoot menu bubbles off screen.
			.attr("cx", w/2)
			.remove()
		svg.selectAll(".menuText")
			.transition()
			.attr("y", -radius)
			.attr("x", w/2)
			.remove()
	}
}

menuSelectionBar.append("rect")
	.attr("id", "selector")
	.attr("x", w/2 - selectorWidth/2)
	.attr("y", 0)
	.attr("rx", 15)
	.attr("ry", 15)
	.attr("width", selectorWidth)
	.attr("height", selectorHeight)
	.attr("fill", cGrey)
	.attr("fill-opacity", 0.5)
	.on("click", function(){
		menuOpen = clickedSelector()
	})
	.on("mouseover", function(){
		hoveredSelector("in")
	})
	.on("mouseout", function(){
		hoveredSelector("out")
	})

menuSelectionBar.append("text")
	.attr("id", "selectorText")
	.attr("x", w/2)
	.attr("y", selectorHeight/2 + 7)
	.attr("text-anchor", "middle")
	.text("navigate")
	.attr("fill", "white")
	.attr("font-family", "optima")
	.attr("font-size", selectorText)
	.on("click", function(){
		menuOpen = clickedSelector()
	})
	.on("mouseover", function(){
		hoveredSelector("in")
	})
	.on("mouseout", function(){
		hoveredSelector("out")
	})

function hoveredSelector(how){
	if (how == "in"){
		var opacity = 1
	} else {
		var opacity = 0.5
	}
	d3.select("#selector")
		.transition()
		.duration(600)
		.attr("fill-opacity", opacity)
}

function menuXPos(index){
	if (index%2 == 0) { //if even draw on left side
		return radius
	} else {
		return (w - radius)
	}
}

function changeSelectorText(whatToSay){
	menuSelectionBar.select("#selectorText")
					.text(whatToSay)
}

function clickedSelector(){
		if (menuOpen){
			menuAction("close")
			return false
		} else {
			menuAction("draw")
			return true
		}
}

function divSwitcher(switchTo){
	d3.selectAll(".sectionDivs").classed("hidden", true)
	d3.selectAll(switchTo).classed("hidden", false)
}
