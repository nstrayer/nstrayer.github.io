import * as d3 from 'd3';
import Particle from './Particle';
import makeCurve from './makeCurve';

// Constants.
const numParticles = 800;
const pointRadius = 5;
const margin = {top: 50, right: 50, bottom: 50, left: 50};
const pixelRatio = window.devicePixelRatio;
const curveData = makeCurve({
  n: numParticles,
  min: 0,
  max: 6 * Math.PI,
  yFun: Math.cos,
});

// Set up the canvas and grab the context.
const canvasSel = d3.select('#randomWalkCanvas').append('canvas');
const canvas = canvasSel.node();
const context = canvas.getContext('2d');

// Small helper functions
// We multiply by the pixel ratio because otherwise retina screens look blurry.
const getWw = () => (canvas.width = window.innerWidth * pixelRatio);
const getWh = () => (canvas.height = 0.9 * window.innerHeight * pixelRatio);
let width = getWw();
let height = getWh();

// Declare some variables we mutate later (I know I Know)
let particles;
const mouse = {
  x: -9999,
  y: -9999,
};

// setup scales.
const xScale = d3.scaleLinear().domain(d3.extent(curveData, (d) => d.x));
const yScale = d3.scaleLinear().domain(d3.extent(curveData, (d) => d.y));

function setScalesRanges(xScale, yScale) {
  xScale.range([margin.left, width - margin.right]);
  yScale.range([height - margin.top, margin.bottom]);
}

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

window.addEventListener('resize', pageResize);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', onTouchEnd);

function pageResize() {
  // grab new dimensions
  width = getWw();
  height = getWh();

  // redo the canvas for new size.
  canvasSel
    .style('width', width / pixelRatio + 'px')
    .style('height', height / devicePixelRatio + 'px');

  // redo scale ranges
  setScalesRanges(xScale, yScale);

  // assign the new destinations based upon the updated scales.
  particles.forEach((particle) => particle.resize({xScale, yScale}));
}

function startScene() {
  width = getWw();
  height = getWh();

  // Set up the canvas for retina.
  canvasSel
    .style('width', width / pixelRatio + 'px')
    .style('height', height / devicePixelRatio + 'px');
  
  setScalesRanges(xScale, yScale);

  particles = curveData.map((d) => {
    return new Particle({
      x: d.x,
      y: d.y,
      xScale,
      yScale,
      pointRadius,
    });
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
