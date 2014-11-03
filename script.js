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
	width = siteW
	console.log("mobile!")
} else {
	width = 0.3 * (siteW);
}

var radius         = 0.5 * width,
 	selectorWidth  = width * 0.8, //Width of open/close menu button
	selectorHeight = height * 0.055,
	selectorText   = selectorHeight * 0.8,
	menuOpen       = false,
	menuTextSize   = radius * 0.12, //Start with menu closed
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
	.outerRadius(radius*.7)
	.innerRadius(radius*.3);

var selectedArc = d3.svg.arc()
	.outerRadius(radius*.85)
	.innerRadius(radius*.3);

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
	.each("end", function(d,i){

		if (i == 3){ //only want to run it once now 4 sections, probably shouldent hardcode.
		d3.selectAll(".sectionDivs").classed("blurred", false) //Unblur the sections
		if(!menuBar){
			divSwitcher(divSelection)
			console.log("triggered")}
		menuBar = false
		d3.select("#menuBar").style("z-index", -999)}})

}

function shrink(){
	d3.selectAll("path")
		.transition()
		.duration(1000)
		.attr("d", shrunkArc )
	d3.selectAll(".arc").selectAll("text").remove() //remove the text for the menu exit
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
				g.call(spin,1000)
				g.call(shrink)
				divSelection = "#" + d.data + "Div"
				menuAction("close")
				menuOpen = false
			})

		g.append("text")
			.attr("id", function(d){return "#" + d.data})
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.attr("fill", "white")
			.attr("font-family", "optima")
			.attr("font-size", menuTextSize)
			.on("mouseover", function(d){
				if(!clicked){ d3.select("#" + d.data).select("path").transition().attr("d",selectedArc)}
			})
			.on("mouseout",function(){
				if(!clicked){d3.select("#" + d.data).select("path").transition().attr("d",arc)
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

function hoveredSelector(how){ //hover behavior for menu open bar
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

var menuBar = false

function clickedSelector(){
		if (menuOpen){
			clicked = true
			menuBar = true
			g.call(spin,1000)
			g.call(shrink)
			menuAction("close")
			menuOpen = false
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
