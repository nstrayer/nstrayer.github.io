var canvas = d3
  .select("#randomWalkCanvas")
  .append("canvas")
  .style("width", "100vw")
  .style("height", "95vh")
  .node();

function getWw(){ return canvas.width = window.innerWidth;}
function getWh(){ return canvas.height = window.innerHeight;}
var ww = getWw();
var wh = getWh();
var padding = 20;
var ctx = canvas.getContext("2d");
var particles = [];
var amount = 0;
var mouse = { x: 0, y: 0 };
var radius = 1;
var colors = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'];

function Particle(x, y) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y
  };
  this.r = 3 + Math.random();
  this.vx = (Math.random() - 0.5) * 20;
  this.vy = (Math.random() - 0.5) * 20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.03 + 0.94;

  this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function() {
  this.accX = (this.dest.x - this.x) / 500;
  this.accY = (this.dest.y - this.y) / 500;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r * (ww / 1700), Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  ww = getWw();
  wh = getWh();
  fontSize = ww < wh ? ww / 6 : ww / 10;

  ctx.clearRect(0, 0, ww, wh);

  ctx.font = "bold " + fontSize + "px optima";
  ctx.textAlign = "center";
  ctx.fillText("Nick Strayer", ww / 2, wh / 2);

  var data = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, ww, wh);
  ctx.globalCompositeOperation = "screen";

  var numParticles = 250;

  particles = [];
  for (var i = 0; i < ww; i += Math.round(ww / numParticles)) {
    for (var j = 0; j < wh; j += Math.round(ww / numParticles)) {
      if (data[(i + j * ww) * 4 + 3] > 150) {
        particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
  setTimeout(writeGreeting, 1500);
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, ww, wh);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);

var svg = d3
  .select("#introSvg")
  .append("svg")
  .attr("width", ww)
  .attr("height", wh + 2 * padding)
  .append("g");

function writeGreeting() {
  svg.selectAll("text").remove();
  setTimeout(function() {
    var title = svg
      .append("text")
      .attr("font-size", 30)
      .attr("font-family", "optima")
      .attr("text-anchor", "end")
      .attr("fill-opacity", 0.65)
      .attr("y", wh/1.4);

    var hiSegment = title
      .append("tspan")
      .attr("dy", "1.2em")
      .attr("x", ww - 2*padding)
      .text("hi...")
      .attr("font-size", 40);

    var lessExciting = title
      .append("tspan")
      .attr("dy", "1.6em")
      .attr("x", ww - 2*padding)
      .html("");

    (function drawGreeting(i, start, greeting) {
      setTimeout(function() {
        //add next letter to the greeting in progress
        start += i == greeting.length ? " &#8681" : greeting[i];

        lessExciting.html(start); //append this to the html

        if (start.length < greeting.length + 1) {
          //if the in progress greeting is less than the full, keep going.
          drawGreeting(i + 1, start, greeting); //  increment i and call again.
        }
      }, 200);
    })(0, "", "less exciting stuff");
  });
}


//function to draw projects section.
function draw_projects(proj_data) {
  var entry = d3
    .select("#projectsDiv")
    .selectAll(".project")
    .data(proj_data)
    .enter()
    .append("div")
    .attr("class", function(d, i) {
      return i == 0 ? "row" : "row project";
    })
    .each(function(proj) {
      //draw picture
      var pic = d3
        .select(this)
        .append("div")
        .attr("class", "col-xs-12 col-sm-6 text-center");

      pic
        .append("a")
        .attr("href", proj.link)
        .append("img")
        .attr("class", "projectPic")
        .attr("src", proj.photo);

      //generate the title and descriptions
      var proj_descrip = d3
        .select(this) //make the holder.
        .append("div")
        .attr("class", "col-xs-12 col-sm-6");

      proj_descrip
        .append("strong") //append the title.
        .attr("class", "projectTitle")
        .append("a")
        .attr("href", proj.link)
        .attr("target", "_blank")
        .text(proj.title);

      proj_descrip
        .append("ul") //append the description bullet point list
        .selectAll("li")
        .data(proj.descriptions)
        .enter()
        .append("li")
        .html(function(d) {
          return d;
        });

      if (proj.github != null) {
        proj_descrip
          .select("ul") //append github repo to end of list
          .append("li")
          .append("a")
          .attr("href", proj.github)
          .text("Github repo.");
      }
    });
}

draw_projects(proj_data);
