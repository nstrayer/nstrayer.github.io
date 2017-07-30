import * as d3 from 'd3';
import Particle from './Particle';

// Constants.
const numParticles = 800;
const margin = {top: 50, right: 50, bottom: 50, left: 50};
const pixelRatio = window.devicePixelRatio;

// Set up the canvas and grab the context.
const canvasSel = d3
  .select('#randomWalkCanvas')
  .append('canvas');
 
const canvas = canvasSel.node();
const context = canvas.getContext('2d');

// Declare some variables we mutate later (I know I Know)
let particles;
let width;
let height;
const mouse = {
  x: -9999,
  y: -9999,
};

// Small helper functions
// We multiply by the pixel ratio because otherwise retina screens look blurry.
const getWw = () => (canvas.width = window.innerWidth * pixelRatio);
const getWh = () => (canvas.height = 0.9 * window.innerHeight * pixelRatio);
width = getWw();
height = getWh();

// const pointRadius = Math.round(Math.min(width, height) / numParticles);
const pointRadius = 5;
// Takes our math function and returns an array of objects with x,y for it.
function makeCurve({n, min, max, yFun}) {
  const stepSize = (max - min) / n;
  let x;

  return d3.range(n).map((d, i) => {
    x = min + (i + 1) * stepSize;
    return {
      x: x,
      y: yFun(x),
    };
  });
}

// converts the x y positions to screen coordinates and initializes a particle with that screen point as its destination.
function dataToParticles({curveData, width, height, margin, pointRadius}) {
  // set up the scales.
  const x = d3
    .scaleLinear()
    .domain(d3.extent(curveData, (d) => d.x))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(curveData, (d) => d.y))
    .range([height - margin.top, margin.bottom]);

  return curveData.map((d) => {
    return new Particle({
      x: x(d.x),
      y: y(d.y),
      width,
      height,
      pointRadius,
    });
  });
}

const curveData = makeCurve({
  n: numParticles,
  min: 0,
  max: 6 * Math.PI,
  yFun: Math.cos,
});

function render() {
  requestAnimationFrame(render);
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < numParticles; i++) {
    particles[i].render({context, width, height, mouse});
  }
}

function onMouseMove(e) {
  mouse.x = e.clientX * pixelRatio;
  mouse.y = e.clientY * pixelRatio;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX * pixelRatio;
    mouse.y = e.touches[0].clientY * pixelRatio;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

window.addEventListener('resize', startScene);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', onTouchEnd);

canvas.addEventListener("click", function(event) {
var x = event.pageX - (this.offsetLeft + this.parentElement.offsetLeft);
var y = event.pageY - (this.offsetTop + this.parentElement.offsetTop);
console.log("relative x=" + x, "relative y" + y);
})

function startScene() {
  width = getWw();
  height = getWh();
  // Set up the canvas for retina.
  canvasSel
    .style('width', width / pixelRatio + 'px')
    .style('height', height / devicePixelRatio + 'px');
  particles = dataToParticles({
    curveData,
    width,
    height,
    margin,
    pointRadius,
  });
  render();
}

startScene();

// function to draw projects section.
function draw_projects(proj_data) {
  let entry = d3
    .select('#projectsDiv')
    .selectAll('.project')
    .data(proj_data)
    .enter()
    .append('div')
    .attr('class', function(d, i) {
      return i == 0 ? 'row' : 'row project';
    })
    .each(function(proj) {
      // draw picture
      let pic = d3
        .select(this)
        .append('div')
        .attr('class', 'col-xs-12 col-sm-6 text-center');

      pic
        .append('a')
        .attr('href', proj.link)
        .append('img')
        .attr('class', 'projectPic')
        .attr('src', proj.photo);

      // generate the title and descriptions
      let proj_descrip = d3
        .select(this) // make the holder.
        .append('div')
        .attr('class', 'col-xs-12 col-sm-6');

      proj_descrip
        .append('strong') // append the title.
        .attr('class', 'projectTitle')
        .append('a')
        .attr('href', proj.link)
        .attr('target', '_blank')
        .text(proj.title);

      proj_descrip
        .append('ul') // append the description bullet point list
        .selectAll('li')
        .data(proj.descriptions)
        .enter()
        .append('li')
        .html(function(d) {
          return d;
        });

      if (proj.github != null) {
        proj_descrip
          .select('ul') // append github repo to end of list
          .append('li')
          .append('a')
          .attr('href', proj.github)
          .text('Github repo.');
      }
    });
}

draw_projects(proj_data);
