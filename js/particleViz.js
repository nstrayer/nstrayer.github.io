import * as d3 from 'd3';
import Particle from './Particle';
import makeCurve from './makeCurve';
import {gammaPdf} from './distributions';

const alphaSteps = 10; // how many of both alpha and beta  we get.
const gammaSteps = 1;
const [alphaStart, alphaEnd] = [3, 8];
const [betaStart, betaEnd] = [1.5,1.5];
const alphaStep = (alphaEnd - alphaStart) / alphaSteps;
const betaStep = (betaEnd - betaStart) / gammaSteps;

const params = [];
for (let i = 0; i < alphaSteps; i++) {
  for (let j = 0; j < gammaSteps; j++) {
    params.push({
      alpha: alphaStart + (i + 1) * alphaStep,
      beta: betaStart + (j + 1) * betaStep,
    });
  }
}

function particleViz(divId) {
  // Constants.
  const numParticles = 1200;
  const pointRadius = 5;
  const margin = {top: 50, right: 50, bottom: 50, left: 50};
  const pixelRatio = window.devicePixelRatio;

  let curveData = [];
  params.forEach((d) => {
    const gammaResults = makeCurve({
      n: numParticles / params.length,
      min: 0,
      max: 30,
      yFun: gammaPdf(d.alpha, d.beta),
    });
    curveData = [...curveData, ...gammaResults];
  });

  // Set up the canvas and grab the context.
  const canvasSel = d3.select(divId).append('canvas').attr('id', 'particles');
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

  const canvasDom = document.getElementById('particles');

  function onMouseMove(e) {
    const boundingBox = canvasDom.getBoundingClientRect();
    mouse.x = (event.clientX - boundingBox.left) * pixelRatio;
    mouse.y = (event.clientY - boundingBox.top) * pixelRatio;
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

  return {startScene};
}
module.exports = particleViz;
