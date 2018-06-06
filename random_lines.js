// !preview r2d3 data=NULL, container = 'canvas'
//
// r2d3: https://rstudio.github.io/r2d3
//
const accelMagnitude = d => Math.sqrt(Math.pow(d.vx,2) + Math.pow(d.vy, 2));

const container = d3.select(canvas.node().offsetParent);
const context = canvas.node().getContext('2d');

const padding = 20;
const w = width - (2*padding);
const h = height - (2*padding);
const numHorizontal = 15;
const numVertical   = 15;
const randomSpread = 30;

const nodes = [];
const links = [];

const accelerationColor = d3.scaleLinear()
  .domain([0,3])
  .range(['steelblue', 'orangered']);

for(let i=0; i<numHorizontal; i++){
  for(let j=0; j<numVertical; j++){
    const xAnchor = padding + w*(i/numHorizontal)+ Math.random()*randomSpread;
    const yAnchor = padding + h*(j/numVertical)+ Math.random()*randomSpread;
    const fixedId = `${i}_${j}`;
    const freeId = `${fixedId}_free`;
    
    nodes.push({
      x: xAnchor,
      y: yAnchor,
      fx: xAnchor,
      fy: yAnchor,
      id: fixedId,
    });
    
    nodes.push({
      x: xAnchor + Math.random()*randomSpread,
      y: yAnchor + Math.random()*randomSpread,
      id: freeId,
    });
    
    links.push({
      source: fixedId,
      target: freeId,
    });
  }
}

const simulation = d3.forceSimulation(nodes)
  .force("link", 
    d3.forceLink(links)
    .id(d => d.id)
    .distance(25)
    .strength(0.9)  
  )
  .force("charge", 
    d3.forceManyBody().strength(1)
  )
  .on("tick", ticked);

function ticked(){

  context.clearRect(0, 0, width, height);
  
  links.forEach(d => {
    context.beginPath();
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
    context.strokeStyle = accelerationColor(accelMagnitude(d.target));
    context.stroke();
  });
}

canvas.on('mousemove', function(){
  simulation
    .force('x', d3.forceX().x(d3.event.offsetX).strength(0.05))
    .force('y', d3.forceY().y(d3.event.offsetY).strength(0.05))
    .alphaTarget(0.1)
    .restart();
});

canvas.on('mouseout', function(){
  simulation
    .force('x', null)
    .force('y', null)
    .alphaTarget(0.9)
    .restart();
});
