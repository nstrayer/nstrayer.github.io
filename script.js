function whereToLoad(desiredLocation){
	var options = ["resume", "me", "contact", "projects"]
	if (options.indexOf(desiredLocation) > -1 ){
		d3.selectAll(".sectionDivs").classed("hidden", true)

		d3.select("#" + desiredLocation + "Div")
			.classed("hidden",false);
		}
	}

var desiredLocation;

try{
	desiredLocation = window.location.href.split("?")[1].replace("/","")
	whereToLoad(desiredLocation)
} catch (err){
	//dont run
}

var cRed     = "#E74327",
	cBrown   = "#E8940C",
	cBlue    = "#0CBDE8",
	cGreen   = "#98C000",
	cGrey    = "#3D4C53",
	menuData = [{"name": "me",       "color": cRed  },
				{"name": "resume",   "color": cBrown},
				{"name": "projects", "color": cBlue },
				{"name": "contact",  "color": cGreen}],
	selected,
	padding = 8,
	siteW = parseFloat(d3.select("body").style("width").slice(0,-2)),
	siteH = parseFloat(d3.select("#menuBar").style("height").slice(0,-2)),
	height = siteH,
	width,
	radius,
	colors           = [cRed, cBrown, cBlue, cGreen, cGrey],
	colorCounter     = 0,
	fauxVals         = ["projects","resume","contact","me"]
	clicked 		 = false;

if (siteW < siteH){ //if landscape device, ala mobile
	width = siteW,
	radius = 0.2 * w;
} else {
	width = 0.3 * (siteW),
	radius = 250;
}

var selectorWidth  = width * 0.8, //Width of open/close menu button
	selectorHeight = height * 0.055,
	selectorText   = selectorHeight * 0.8,
	menuOpen       = false,
	menuTextSize   = radius * 0.5, //Start with menu closed
	divSelection;


var menuSelectionBar =d3.select("#menuSelection")
						.append("svg")
						.attr("height", selectorHeight)
						.attr("width",  width)

var svg = d3.select("#menuBar")
			.append("svg")
			.attr("height", height)
			.attr("width",  width)
			.append("g")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var arc = d3.svg.arc()
	.outerRadius(radius - 100)
	.innerRadius(radius - 200);

var selectedArc = d3.svg.arc()
	.outerRadius(radius - 80)
	.innerRadius(radius - 200);

var shrunkArc =
	d3.svg.arc()
		.outerRadius(0)
		.innerRadius(0);

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) { return 10; });

var g = svg.selectAll(".arc")
	.data(pie(fauxVals))
	.enter().append("g")
	.attr("class", "arc")
	.attr("id", function(d){return d.data})

function spin(path, duration) {
path.transition("spin")
	.duration(duration)
	.attrTween("transform", function() { return d3.interpolateString("rotate(0)", "rotate(720)"); })
	.each("end", function(){
		//shrink()
		d3.selectAll(".sectionDivs").classed("blurred", false) //Unblur the sections
		divSwitcher(divSelection)
		d3.select("#menuBar").style("z-index", -999)})
}

function shrink(){
	d3.selectAll("path")
		.transition()
		.duration(1000)
		.attr("d", shrunkArc )
}

function menuAction(whatToDo){

	if (whatToDo == "draw"){
		d3.selectAll(".sectionDivs").classed("blurred", true)
		changeSelectorText("close menu")
		d3.select("#menuBar").style("z-index", 999)

		g.append("path")
			.attr("d", arc)
			.style("fill", function() { return colorChoose(); })
			.on("mouseover", function(){
				if(!clicked){d3.select(this).transition().attr("d",selectedArc)}
			})
			.on("mouseout",function(){
				if(!clicked){d3.select(this).transition().attr("d",arc)
				}else{d3.select(this).transition().attr("d",shrunkArc)}
			})
			.on("click", function(d){
				clicked = true
				console.log("#" + d.data + "Div")
				g.call(spin,1000)
				g.call(shrink)
				divSelection = "#" + d.data + "Div"
				menuAction("close")
				menuOpen = false
			})

		g.append("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.attr("fill", "white")
			.attr("font-family", "optima")
			.style("text-anchor", "middle")
			.text(function(d) { return d.data; });


	} else { //Close menu

		changeSelectorText("menu")	 //Change menu text to open menu
		 //send menubar to back of page so text can be selected
	}
}


menuSelectionBar.append("rect")
	.attr("id", "selector")
	.attr("x", width/2 - selectorWidth/2)
	.attr("y", 0)
	.attr("rx", 15)
	.attr("ry", 15)
	.attr("width", selectorWidth)
	.attr("height", selectorHeight)
	.attr("fill", cGrey)
	.attr("fill-opacity", 0.5)
	.on("click", function(){
		menuOpen = clickedSelector()
		clicked = false
	})
	.on("mouseover", function(){
		hoveredSelector("in")
	})
	.on("mouseout", function(){
		hoveredSelector("out")
	})

menuSelectionBar.append("text")
	.attr("id", "selectorText")
	.attr("x", width/2)
	.attr("y", selectorHeight/2 + selectorText/3.5)
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


function colorChoose(){
	colorCounter++
	if (colorCounter > 4){
		colorCounter = 0
	}
	return colors[colorCounter];
}
