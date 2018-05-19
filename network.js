// !preview r2d3 data=jsonlite::toJSON(data), container = 'canvas'
//
// r2d3: https://rstudio.github.io/r2d3
//

const padding = 20;
const edge_opacity = 0.2;
const point_radius = 2;

const container = d3.select(canvas.node().offsetParent);
const context = canvas.node().getContext('2d');
const mouse = {x:1000, y:1000, currently_selecting:false};

const small_edge = width < height ? width: height,
      OUTER_RING_RADIUS = (small_edge/2)*0.35;

const vertices = data.vertices;
const links = data.edges.map(d => ({source: +d.source, target: +d.target}));

const x = d3.scaleLinear()
  .range([padding, width-padding]);
  
const y = d3.scaleLinear()
  .range([padding, height-padding]);

const simulation = d3.forceSimulation(vertices)
    .force("link", 
      d3.forceLink(links)
        .id(d => d.id)
        .distance(20)
        .strength(0.8)
    )
    .force("charge", 
      d3.forceManyBody()
        .strength(-10)
    )
    .force("r", 
      d3.forceRadial(OUTER_RING_RADIUS)
        .strength( 0.1 )
    )
    .on("tick", ticked);
   

canvas.on('mousemove', function(){
  mouse.x = x.invert(d3.event.offsetX);
  mouse.y = y.invert(d3.event.offsetY);
  
  const nearest_node = simulation.find(
    mouse.x,
    mouse.y
  );
  
  vertices.forEach(d => d.moused_over = false);
 
  mouse.currently_selecting = nearest_node.moused_over = true;
  
  nearest_node.x = mouse.x;
  nearest_node.y = mouse.y;
  
  simulation.alphaTarget(0.1).restart();
  
  ticked();
});

canvas.on('mouseout', function() {
  simulation.alphaTarget(0).restart();
  vertices.forEach(d => d.moused_over = false);
});

function ticked() {
  x.domain(d3.extent(vertices, d => d.x));
  y.domain(d3.extent(vertices, d => d.y));
  
  context.clearRect(0, 0, width, height);
  context.save();
  context.globalAlpha = edge_opacity;
  
  context.beginPath();
  links.forEach(d => {
    context.moveTo(x(d.source.x), y(d.source.y));
    context.lineTo(x(d.target.x), y(d.target.y));
  });
  context.strokeStyle = '#aaa';
  context.stroke();
  
  context.globalAlpha = 0.9;
  
  vertices.forEach( d => {
    context.strokeStyle = `rgba(0, 0, 0, 0)`;
    context.fillStyle = d.moused_over? 'blue': d.color;
    
    context.beginPath();
    context.arc(x(d.x), y(d.y), point_radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  });
  
  context.restore();
}