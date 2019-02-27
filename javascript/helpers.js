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

const frag_shader = `
// set the precision of floating point numbers
precision highp float;

// this value is populated by the vertex shader
varying vec3 fragColor;

void main() {
  // gl_FragColor is a special variable that holds the color of a pixel
  gl_FragColor = vec4(fragColor, 1);
}`;

const vert_shader = `
// per vertex attributes
attribute vec2 positionStart;
attribute vec2 positionEnd;
attribute float index;
attribute vec3 colorStart;
attribute vec3 color;

// variables to send to the fragment shader
varying vec3 fragColor;

// values that are the same for all vertices
uniform float pointWidth;
uniform float stageWidth;
uniform float stageHeight;
uniform float elapsed;
uniform float duration;
uniform float delayByIndex;

// helper function to transform from pixel space to normalized device coordinates (NDC)
// in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
vec2 normalizeCoords(vec2 position) {
  // read in the positions into x and y vars
  float x = position[0];
  float y = position[1];

  return vec2(
    2.0 * ((x / stageWidth) - 0.5),
    // invert y since we think [0,0] is bottom left in pixel space
    -(2.0 * ((y / stageHeight) - 0.5)));
}

// helper function to handle cubic easing (copied from d3 for consistency)
// note there are pre-made easing functions available via glslify.
float easeCubicInOut(float t) {
  t *= 2.0;
  t = (t <= 1.0 ? t * t * t : (t -= 2.0) * t * t + 2.0) / 2.0;
  
  if (t > 1.0) {
    t = 1.0;
  }
  
  return t;
}

void main() {
  // update the size of a point based on the prop pointWidth
  gl_PointSize = pointWidth;
  
  float delay = delayByIndex * index;
  
  // number between 0 and 1 indicating how far through the animation this
  // vertex is.
  float t;
  
  // drawing without animation, so show end state immediately
  if (duration == 0.0) {
    t = 1.0;
  
  // still delaying before animating
  } else if (elapsed < delay) {
    t = 0.0;
  
  // otherwise we are animating, so use cubic easing
  } else {
    t = easeCubicInOut((elapsed - delay) / duration);
  }

  // interpolate position
  vec2 position = mix(positionStart, positionEnd, t);
  
  // interpolate and send color to the fragment shader
  fragColor = mix(colorStart, color, t);
  
  // scale to normalized device coordinates
  // gl_Position is a special variable that holds the position of a vertex
  gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
}`;

function setupPointDrawer(regl){
  // function to compile a draw points regl func
  return function(points) {
    const drawPoints = regl({
      frag: frag_shader,
      vert: vert_shader,
      attributes: {
        positionStart: points.map(d => [d.sx, d.sy]),
        positionEnd: points.map(d => [d.x, d.y]),
        colorStart: points.map(d => d.colorStart),
        color: points.map(d => d.color),
        index: d3.range(points.length),
      },
      uniforms: {
        pointWidth: regl.prop('pointWidth'),
        stageWidth: regl.prop('stageWidth'),
        stageHeight: regl.prop('stageHeight'),
        delayByIndex: regl.prop('delayByIndex'),
        duration: regl.prop('duration'),

        // time in milliseconds since the prop startTime (i.e. time elapsed)
        elapsed: ({ time }, { startTime = 0 }) => (time - startTime) * 1000,
      },
      count: points.length,
      primitive: 'points',
    });

    return drawPoints;
  }
}