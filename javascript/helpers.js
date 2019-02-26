// Makes pretty nature inspired spiralish layout
function phyllotaxisLayout(points, pointWidth, xOffset = 0, yOffset = 0, iOffset = 0) {
  
  const colorScale = d3.scaleSequential(d3.interpolateInferno)
    .domain([0,points.length]);
 
  // theta determines the spiral of the layout
  const theta = Math.PI * (3 - Math.sqrt(5));

  const pointRadius = pointWidth / 2;

  points.forEach((point, i) => {
    const index = (i + iOffset) % points.length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);

    point.x = xOffset + phylloX - pointRadius;
    point.y = yOffset + phylloY - pointRadius;
    point.color = colorToVec3(colorScale(i));
  });

  return points;
}

// Takes passed data and builds a function for giving points correct locations and colors
function setupPassedDataLayout(data, width, height) {
  const hasClassInfo = data[0]['class'] ? true:false;
  let setColor;
  if(hasClassInfo){
    const unique_classes = unique(data, 'class');
    const color_index = unique_classes.reduce((class_obj, cur_class, i) => {
      class_obj[cur_class] = i;
      return class_obj;
    }, {});
    
    const colorScale = d3.scaleSequential(d3.interpolatePlasma)
      .domain([0,unique_classes.length]);
    
    setColor = d => colorToVec3(colorScale(color_index[d['class']]));
    
  } else {
    setColor = d => [0,0,0];
  }
 
  
  // Object for retrieving the position and color of the original passed data
  const mapToOriginal = data.reduce((id_to_vals, d, i) => {
    id_to_vals[i] = {
      x: d.x*width,
      y: d.y*height,
      color: setColor(d),
    };
    return id_to_vals;
  }, {});

  return points => {
    points.forEach(d => {
      const {x,y,color} = mapToOriginal[d.id];
      d.x = x;
      d.y = y;
      d.color = color;
    });
    return points;
  }
}

// A simple uncorrelated bivariate normal distribution
function randomLayout(points, pointWidth, width, height) {
  const colorScale = d3.scaleSequential(d3.interpolateSpectral)
    .domain([0,points.length]);
  
  const rnorm = d3.randomNormal(0,0.15);
    
  points.forEach((d,i) => {    
    d.x = rnorm() * width + width/2;
    d.y = rnorm() * height + height/2;
    d.color = colorToVec3(colorScale(i));
  });

  return points;
}

// Convert a color to a 3-dimensional vector which is how GLSL needs it 
function colorToVec3(color){
  const rgb = d3.rgb(color);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

// Simple function to get the unique values in an array
function unique(data, key){ 
  return d3.set(data.map(d => d[key])).values();
};

// Generate an object array of `numPoints` length with unique IDs
// and assigned colors
function createPoints(numPoints, pointWidth, width, height) {
  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([numPoints - 1, 0]);

  const points = d3.range(numPoints).map(id => ({
    id,
    color: colorToVec3(colorScale(id)),
    // points start in the middle of the screen
    x: width / 2,
    y: height / 2,
  }));
  return points
}


// Shuffles locations and colors around so GLSL can interpolate from the current state
// to the newly desired layout
function setupNewTransition(points, layout){
  
  // make previous end the new beginning
  points.forEach((d,i) => {
    d.sx = d.x;
    d.sy = d.y;
    d.colorStart = d.color;
  });
 
  // layout points
  layout(points);
}